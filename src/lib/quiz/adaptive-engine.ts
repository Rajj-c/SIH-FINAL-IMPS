import type { EnhancedQuizQuestion, RIASECScores, QuizResponse, QuestionBank } from './riasec-scoring';
import { calculateRIASECScores } from './riasec-scoring';

/**
 * Adaptive Quiz Engine
 * Intelligently selects next questions based on current RIASEC scores
 */

export interface QuizState {
    answeredQuestions: QuizResponse[];
    currentScores: RIASECScores;
    askedQuestionIds: Set<string>;
    questionCount: number;
}

/**
 * Initialize quiz state with baseline questions
 */
export function initializeQuizState(): QuizState {
    return {
        answeredQuestions: [],
        currentScores: { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 },
        askedQuestionIds: new Set(),
        questionCount: 0,
    };
}

/**
 * Select the next question based on current state
 * Logic:
 * 1. Start with baseline questions (3)
 * 2. After baseline, identify top 2 RIASEC types
 * 3. Ask deep-dive questions for those types
 * 4. Continue until confident (8-12 questions total)
 */
export function selectNextQuestion(
    state: QuizState,
    questionBank: QuestionBank
): EnhancedQuizQuestion | null {
    const MAX_QUESTIONS = 15; // Increased to accommodate more baseline
    const BASELINE_COUNT = questionBank.baseline.length;

    // Finish if we've asked enough questions
    if (state.questionCount >= MAX_QUESTIONS) {
        return null;
    }

    // Phase 1: Ask all baseline questions first
    if (state.questionCount < BASELINE_COUNT) {
        const baselineQuestion = questionBank.baseline[state.questionCount];
        if (baselineQuestion && !state.askedQuestionIds.has(baselineQuestion.id)) {
            return baselineQuestion;
        }
    }

    // Phase 2: Adaptive deep-dive questions
    // Calculate current RIASEC scores
    const scores = state.currentScores;

    // Find top 3 RIASEC types
    const sortedTypes = (Object.entries(scores) as [keyof RIASECScores, number][])
        .sort(([, a], [, b]) => b - a)
        .map(([type]) => type);

    const topTypes = sortedTypes.slice(0, 3);

    // Determine which category needs more exploration
    const categoryScores = topTypes.map((type) => ({
        type,
        score: scores[type],
        questionsAsked: countQuestionsInCategory(state.askedQuestionIds, type),
    }));

    // Sort by: lowest question count first, then highest score
    categoryScores.sort((a, b) => {
        if (a.questionsAsked === b.questionsAsked) {
            return b.score - a.score;
        }
        return a.questionsAsked - b.questionsAsked;
    });

    // Select from top category
    for (const category of categoryScores) {
        const categoryKey = getDeepDiveKey(category.type);
        const categoryQuestions = questionBank.deepdive[categoryKey];

        // Find unanswered question in this category
        for (const question of categoryQuestions) {
            if (!state.askedQuestionIds.has(question.id)) {
                return question;
            }
        }
    }

    // If no specific questions left, pick from any remaining
    for (const categoryKey of Object.keys(questionBank.deepdive)) {
        const questions = questionBank.deepdive[categoryKey as keyof typeof questionBank.deepdive];
        for (const question of questions) {
            if (!state.askedQuestionIds.has(question.id)) {
                return question;
            }
        }
    }

    return null; // No more questions
}

/**
 * Update quiz state with new answer
 */
export function updateQuizState(
    state: QuizState,
    questionId: string,
    answer: string | number | string[] | Record<string, number>,
    allQuestions: EnhancedQuizQuestion[]
): QuizState {
    const newResponse: QuizResponse = {
        questionId,
        answer,
    };

    const newAnswers = [...state.answeredQuestions, newResponse];
    const newAskedIds = new Set(state.askedQuestionIds);
    newAskedIds.add(questionId);

    // Recalculate scores
    const newScores = calculateRIASECScores(newAnswers, allQuestions);

    return {
        answeredQuestions: newAnswers,
        currentScores: newScores,
        askedQuestionIds: newAskedIds,
        questionCount: state.questionCount + 1,
    };
}

/**
 * Revert quiz state (Undo last answer)
 */
export function revertQuizState(
    state: QuizState,
    allQuestions: EnhancedQuizQuestion[]
): { newState: QuizState; lastAnswer: QuizResponse | null } {
    if (state.answeredQuestions.length === 0) {
        return { newState: state, lastAnswer: null };
    }

    const newAnswers = [...state.answeredQuestions];
    const lastAnswer = newAnswers.pop()!;

    const newAskedIds = new Set(state.askedQuestionIds);
    newAskedIds.delete(lastAnswer.questionId);

    // Recalculate scores
    const newScores = calculateRIASECScores(newAnswers, allQuestions);

    const newState = {
        answeredQuestions: newAnswers,
        currentScores: newScores,
        askedQuestionIds: newAskedIds,
        questionCount: Math.max(0, state.questionCount - 1),
    };

    return { newState, lastAnswer };
}

/**
 * Check if quiz is complete (enough confidence in recommendation)
 */
export function isQuizComplete(state: QuizState): boolean {
    const MIN_QUESTIONS = 8;
    const MAX_QUESTIONS = 15;

    // Must answer at least MIN_QUESTIONS
    if (state.questionCount < MIN_QUESTIONS) {
        return false;
    }

    // Stop at MAX_QUESTIONS regardless
    if (state.questionCount >= MAX_QUESTIONS) {
        return true;
    }

    // Check if we have high confidence
    const scores = state.currentScores;
    const sortedScores = Object.values(scores).sort((a, b) => b - a);
    const topScore = sortedScores[0];
    const secondScore = sortedScores[1];

    // High confidence if top score is significantly higher
    const scoreDifference = topScore - secondScore;
    if (scoreDifference > 25 && state.questionCount >= MIN_QUESTIONS) {
        return true;
    }

    return false;
}

/**
 * Get progress percentage
 */
export function getQuizProgress(state: QuizState): number {
    const TARGET_QUESTIONS = 10; // Target midpoint
    return Math.min((state.questionCount / TARGET_QUESTIONS) * 100, 100);
}

/**
 * Resume quiz state from saved answers
 */
export function resumeQuizState(
    savedAnswers: Record<string, any>,
    allQuestions: EnhancedQuizQuestion[]
): QuizState {
    const answeredQuestions: QuizResponse[] = [];
    const askedQuestionIds = new Set<string>();

    Object.entries(savedAnswers).forEach(([questionId, answer]) => {
        let parsedAnswer = answer;
        // Parse JSON strings if needed (for arrays/objects stored as strings)
        if (typeof answer === 'string') {
            try {
                // check if it looks like JSON array or object
                if (answer.startsWith('[') || answer.startsWith('{')) {
                    parsedAnswer = JSON.parse(answer);
                } else if (!isNaN(Number(answer))) {
                    // Keep as string or number? Original logic used String() for simple values.
                    // But types say: string | number | ...
                    // If it was stored as string "5", we keep it as string "5" ?
                    // The quiz state expects strict types potentially?
                    // In QuizForm: setCurrentAnswer(Number(val)) for slider.
                    // So we should try to cast to number if it looks like one?
                    // Let's be careful. The question type defines what it expects.
                    // But here we don't look up question type easily for every answer.
                    // Let's assume JSON.parse handles "5" -> 5 correctly if it's a valid JSON number.
                    // But "5" is valid JSON.
                    parsedAnswer = JSON.parse(answer);
                }
            } catch (e) {
                // Keep as original string
            }
        }

        answeredQuestions.push({ questionId, answer: parsedAnswer });
        askedQuestionIds.add(questionId);
    });

    const currentScores = calculateRIASECScores(answeredQuestions, allQuestions);

    return {
        answeredQuestions,
        currentScores,
        askedQuestionIds,
        questionCount: answeredQuestions.length,
    };
}


// Helper functions

function countQuestionsInCategory(askedIds: Set<string>, type: keyof RIASECScores): number {
    const prefix = type.toLowerCase();
    return Array.from(askedIds).filter((id) => {
        // Count questions that target this RIASEC type
        // Format: "10-r1", "12-i2", etc.
        const parts = id.split('-');
        if (parts.length >= 2) {
            return parts[1].startsWith(prefix);
        }
        return false;
    }).length;
}

function getDeepDiveKey(type: keyof RIASECScores): 'realistic' | 'investigative' | 'artistic' | 'social' | 'enterprising' | 'conventional' {
    const map: Record<keyof RIASECScores, 'realistic' | 'investigative' | 'artistic' | 'social' | 'enterprising' | 'conventional'> = {
        R: 'realistic',
        I: 'investigative',
        A: 'artistic',
        S: 'social',
        E: 'enterprising',
        C: 'conventional',
    };
    return map[type];
}

/**
 * Get all questions that were used in the quiz (for scoring)
 */
export function getAllQuestionsUsed(
    state: QuizState,
    questionBank: QuestionBank
): EnhancedQuizQuestion[] {
    const allQuestions = [
        ...questionBank.baseline,
        ...Object.values(questionBank.deepdive).flat(),
    ];

    return allQuestions.filter((q) => state.askedQuestionIds.has(q.id));
}
