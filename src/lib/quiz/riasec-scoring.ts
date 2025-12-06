// RIASEC Model Types and Scoring System

export interface RIASECScores {
    R: number; // Realistic - Doers (hands-on, technical)
    I: number; // Investigative - Thinkers (research, problem-solving)
    A: number; // Artistic - Creators (creative expression)
    S: number; // Social - Helpers (people-oriented)
    E: number; // Enterprising - Persuaders (leadership, business)
    C: number; // Conventional - Organizers (data, systems)
}

export interface RIASECWeights {
    R?: number;
    I?: number;
    A?: number;
    S?: number;
    E?: number;
    C?: number;
}

export interface QuestionBase {
    id: string;
    text: string;
    category: 'baseline' | 'deepdive';
    riasecWeights: RIASECWeights;
}

export interface ScenarioQuestionData extends QuestionBase {
    type: 'scenario';
    scenarios: Array<{
        id: string;
        icon: string;
        title: string;
        description: string;
        riasecWeights: RIASECWeights;
    }>;
}

export interface SliderQuestionData extends QuestionBase {
    type: 'slider';
    minLabel: string;
    maxLabel: string;
    primaryRIASEC: keyof RIASECScores;
}

export interface MultipleChoiceQuestionData extends QuestionBase {
    type: 'multiple-choice';
    options: Array<{
        text: string;
        riasecWeights: RIASECWeights;
        academic?: string;
        learningStyle?: string;
    }>;
}

export interface RankingQuestionData extends QuestionBase {
    type: 'ranking';
    options: string[];
}

export interface CheckboxMultiQuestionData extends QuestionBase {
    type: 'checkbox-multi';
    options: Array<{
        text: string;
        riasecWeights?: RIASECWeights; // Optional, some might just be for data collection
        academic?: string; // For academic performance questions
        learningStyle?: string; // For learning style questions
    }>;
}

export interface SliderGridQuestionData extends QuestionBase {
    type: 'slider-grid';
    skills: Array<{
        name: string;
        riasec: keyof RIASECScores;
    }>;
}

export type EnhancedQuizQuestion =
    | ScenarioQuestionData
    | SliderQuestionData
    | MultipleChoiceQuestionData
    | RankingQuestionData
    | CheckboxMultiQuestionData
    | SliderGridQuestionData;

export interface QuestionBank {
    baseline: EnhancedQuizQuestion[];
    deepdive: {
        realistic: EnhancedQuizQuestion[];
        investigative: EnhancedQuizQuestion[];
        artistic: EnhancedQuizQuestion[];
        social: EnhancedQuizQuestion[];
        enterprising: EnhancedQuizQuestion[];
        conventional: EnhancedQuizQuestion[];
    };
    // New modules
    academic?: EnhancedQuizQuestion[];
    values?: EnhancedQuizQuestion[];
    skills?: EnhancedQuizQuestion[];
    learningStyle?: EnhancedQuizQuestion[];
    preferences?: EnhancedQuizQuestion[];
}

export interface QuizResponse {
    questionId: string;
    answer: string | number | string[] | Record<string, number>;
}

export interface RIASECResult {
    scores: RIASECScores;
    topTypes: Array<keyof RIASECScores>;
    suggestedStream: 'Science' | 'Commerce' | 'Arts' | 'Vocational';
    confidence: 'High' | 'Medium' | 'Low';
    careerMatches: string[];
}

/**
 * Calculate RIASEC scores from quiz responses
 */
export function calculateRIASECScores(
    responses: QuizResponse[],
    questionBank: EnhancedQuizQuestion[]
): RIASECScores {
    const scores: RIASECScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

    responses.forEach((response) => {
        const question = questionBank.find((q) => q.id === response.questionId);
        if (!question) return;

        if (question.type === 'scenario') {
            const selectedScenario = question.scenarios.find((s) => s.id === response.answer);
            if (selectedScenario) {
                Object.entries(selectedScenario.riasecWeights).forEach(([key, value]) => {
                    scores[key as keyof RIASECScores] += value || 0;
                });
            }
        } else if (question.type === 'slider') {
            const value = Number(response.answer);
            const weight = (value / 10) * 15; // Scale to max 15 points
            scores[question.primaryRIASEC] += weight;
        } else if (question.type === 'multiple-choice') {
            const selectedOption = question.options.find((o) => o.text === response.answer);
            if (selectedOption && selectedOption.riasecWeights) {
                Object.entries(selectedOption.riasecWeights).forEach(([key, value]) => {
                    scores[key as keyof RIASECScores] += value || 0;
                });
            }
        } else if (question.type === 'checkbox-multi' && Array.isArray(response.answer)) {
            response.answer.forEach((ans) => {
                const selectedOption = question.options.find((o) => o.text === ans);
                if (selectedOption && selectedOption.riasecWeights) {
                    Object.entries(selectedOption.riasecWeights).forEach(([key, value]) => {
                        scores[key as keyof RIASECScores] += value || 0;
                    });
                }
            });
        } else if (question.type === 'slider-grid' && typeof response.answer === 'object') {
            const answers = response.answer as Record<string, number>;
            question.skills.forEach((skill) => {
                const value = answers[skill.name] || 0;
                const weight = (value / 10) * 10; // Scale to max 10 points per skill
                scores[skill.riasec] += weight;
            });
        }
        // Ranking questions typically don't directly add to RIASEC scores in this simple model,
        // but could be used for tie-breaking or values assessment.
    });

    // Normalize scores to 0-100 range
    const maxScore = Math.max(...Object.values(scores));
    if (maxScore > 0) {
        Object.keys(scores).forEach((key) => {
            scores[key as keyof RIASECScores] = Math.round(
                (scores[key as keyof RIASECScores] / maxScore) * 100
            );
        });
    }

    return scores;
}

/**
 * Determine suggested stream based on RIASEC scores
 */
export function determineStreamFromRIASEC(scores: RIASECScores): RIASECResult {
    const sortedTypes = (Object.entries(scores) as [keyof RIASECScores, number][])
        .sort(([, a], [, b]) => {
            if (b !== a) return b - a;
            return 0; // We'll handle the key sorting in the map or just rely on stable sort if available, but JS sort isn't guaranteed stable for all engines/versions in all contexts.
            // Actually, let's do the tie-breaker right here:
        })
        // Better implementation with explicit key access
        .sort(([typeA, scoreA], [typeB, scoreB]) => {
            if (scoreB !== scoreA) return scoreB - scoreA;
            return typeA.localeCompare(typeB);
        })
        .map(([type]) => type);

    const topTypes = sortedTypes.slice(0, 3);
    const topScore = scores[topTypes[0]];
    const secondScore = scores[topTypes[1]];

    // Determine confidence based on score distribution
    let confidence: 'High' | 'Medium' | 'Low' = 'Low';
    if (topScore - secondScore > 20) confidence = 'High';
    else if (topScore - secondScore > 10) confidence = 'Medium';

    // Map RIASEC to streams
    let suggestedStream: 'Science' | 'Commerce' | 'Arts' | 'Vocational' = 'Science';
    const primary = topTypes[0];
    const secondary = topTypes[1];

    if (primary === 'R' || primary === 'I') {
        suggestedStream = 'Science';
    } else if (primary === 'E' || primary === 'C') {
        suggestedStream = 'Commerce';
    } else if (primary === 'A' || primary === 'S') {
        suggestedStream = 'Arts';
    }

    // Vocational if Realistic is very high
    if (scores.R > 80 && scores.I < 50) {
        suggestedStream = 'Vocational';
    }

    // Career matches based on top RIASEC codes
    const careerMatches = getCareerMatches(topTypes[0], topTypes[1]);

    return {
        scores,
        topTypes,
        suggestedStream,
        confidence,
        careerMatches,
    };
}

/**
 * Get career matches based on RIASEC code
 */
function getCareerMatches(primary: keyof RIASECScores, secondary: keyof RIASECScores): string[] {
    const careerMap: Record<string, string[]> = {
        'R-I': ['Engineer', 'Software Developer', 'Architect', 'Lab Technician'],
        'R-C': ['Electrician', 'Mechanic', 'Surveyor', 'Quality Control Inspector'],
        'R-E': ['Construction Manager', 'Production Manager', 'Operations Manager'],
        'I-R': ['Medical Researcher', 'Biotechnologist', 'Environmental Scientist'],
        'I-A': ['Scientist', 'Researcher', 'Psychologist', 'Data Analyst'],
        'I-C': ['Pharmacist', 'Chemist', 'Medical Lab Technician'],
        'A-S': ['Teacher', 'Counselor', 'Designer', 'Artist'],
        'A-E': ['Marketing Manager', 'Creative Director', 'Entrepreneur'],
        'A-I': ['UX Designer', 'Content Strategist', 'Technical Writer'],
        'S-A': ['Social Worker', 'Therapist', 'HR Manager', 'Event Planner'],
        'S-E': ['Sales Manager', 'Public Relations', 'Customer Success Manager'],
        'S-C': ['Healthcare Administrator', 'Office Manager', 'Coordinator'],
        'E-C': ['Business Analyst', 'Chartered Accountant', 'Financial Manager'],
        'E-S': ['Business Development Manager', 'Entrepreneur', 'Consultant'],
        'E-I': ['Management Consultant', 'Strategic Planner', 'Business Owner'],
        'C-E': ['Accountant', 'Auditor', 'Financial Analyst', 'Tax Consultant'],
        'C-I': ['Database Administrator', 'Systems Analyst', 'Statistician'],
        'C-S': ['Administrator', 'HR Specialist', 'Legal Assistant'],
    };

    const code = `${primary}-${secondary}`;
    return careerMap[code] || careerMap[`${secondary}-${primary}`] || ['Career Counselor Recommended'];
}
