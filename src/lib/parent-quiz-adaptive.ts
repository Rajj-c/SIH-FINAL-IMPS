import { ParentQuizQuestion } from './types';

/**
 * Adaptive Parent Quiz System
 * Questions adapt based on previous answers, starting with child's class level
 */

export type AdaptiveParentQuestion = ParentQuizQuestion & {
    dependsOn?: {
        questionId: number;
        requiredAnswer?: string; // If specified, show only if this answer was given
        excludeAnswer?: string; // If specified, hide if this answer was given
    };
    priority?: number; // Lower numbers = asked first
};

// Question IDs
export const QUESTION_IDS = {
    CLASS_COMPLETED: 1,

    // Common questions (asked to all)
    CHILD_STRENGTH: 10,
    CAREER_PRIORITY: 11,
    FAMILY_BUDGET_COMFORT: 12,
    INSTITUTION_TYPE: 13,

    // After 10th specific
    STREAM_PREFERENCE_10TH: 20,
    SUBJECT_INTEREST_10TH: 21,
    DISTANCE_PREFERENCE_10TH: 22,
    BUDGET_2YEARS: 23,

    // After 12th specific  
    CAREER_GOAL_12TH: 30,
    ENTRANCE_EXAM_PREP: 31,
    BUDGET_DEGREE: 32,
    LOCATION_PREFERENCE_12TH: 33,

    // Conditional follow-ups
    GOVT_ENTRANCE_PREP: 40,
    PRIVATE_BUDGET_CONFIRM: 41,
    NEET_PREPARATION: 42,
    JEE_PREPARATION: 43,
} as const;

export const adaptiveParentQuestions: AdaptiveParentQuestion[] = [
    // ========================================
    // INITIAL QUESTION (ALWAYS ASKED FIRST)
    // ========================================
    {
        id: QUESTION_IDS.CLASS_COMPLETED,
        question: "Which standard/class has your child completed?",
        category: 'background',
        options: ["Class 10th", "Class 12th"],
        priority: 1,
    },

    // ========================================
    // COMMON QUESTIONS (ASKED TO ALL)
    // ========================================
    {
        id: QUESTION_IDS.CHILD_STRENGTH,
        question: "What do you observe as your child's greatest strength?",
        category: 'child_strength',
        options: [
            "Logical & Analytical Thinking",
            "Creativity & Artistic Skills",
            "Communication & Leadership",
            "Hands-on / Practical Skills",
            "Empathy & Helping Others"
        ],
        priority: 2,
    },
    {
        id: QUESTION_IDS.CAREER_PRIORITY,
        question: "What is your primary expectation for your child's career?",
        category: 'expectation',
        options: [
            "High Earning Potential",
            "Job Security & Stability",
            "Work-Life Balance",
            "Following Their Passion",
            "Social Impact / Service"
        ],
        priority: 3,
    },
    {
        id: QUESTION_IDS.FAMILY_BUDGET_COMFORT,
        question: "What is your comfort level for investment in your child's education?",
        category: 'investment',
        options: [
            "Below Rs 50,000 per year",
            "Rs 50,000 - Rs 2,00,000 per year",
            "Rs 2,00,000 - Rs 5,00,000 per year",
            "Above Rs 5,00,000 per year",
            "No budget constraints"
        ],
        priority: 4,
    },
    {
        id: QUESTION_IDS.INSTITUTION_TYPE,
        question: "What type of institution do you prefer for your child?",
        category: 'inclination',
        options: [
            "Government colleges (subsidized fees)",
            "Private colleges (better facilities)",
            "No preference - best fit matters",
        ],
        priority: 5,
    },

    // ========================================
    // AFTER 10TH BRANCH
    // ========================================
    {
        id: QUESTION_IDS.STREAM_PREFERENCE_10TH,
        question: "Which stream do you prefer for your child in 11th-12th?",
        category: 'inclination',
        options: [
            "Science (PCM - Engineering)",
            "Science (PCB - Medical)",
            "Commerce (CA/Business)",
            "Arts / Humanities",
            "Vocational / Skill-based",
            "Whatever they choose"
        ],
        dependsOn: {
            questionId: QUESTION_IDS.CLASS_COMPLETED,
            requiredAnswer: "Class 10th",
        },
        priority: 10,
    },
    {
        id: QUESTION_IDS.SUBJECT_INTEREST_10TH,
        question: "Which subjects does your child show the most interest in?",
        category: 'child_strength',
        options: [
            "Mathematics & Physics",
            "Biology & Chemistry",
            "Economics & Accounts",
            "Languages & Social Studies",
            "Computer Science & Technology",
            "Arts, Design & Creativity"
        ],
        dependsOn: {
            questionId: QUESTION_IDS.CLASS_COMPLETED,
            requiredAnswer: "Class 10th",
        },
        priority: 11,
    },
    {
        id: QUESTION_IDS.DISTANCE_PREFERENCE_10TH,
        question: "How far are you willing to send your child for 11th-12th?",
        category: 'location_preference',
        options: [
            "Within the same city",
            "Within the same district",
            "Anywhere in the state",
            "Open to other states"
        ],
        dependsOn: {
            questionId: QUESTION_IDS.CLASS_COMPLETED,
            requiredAnswer: "Class 10th",
        },
        priority: 12,
    },
    {
        id: QUESTION_IDS.BUDGET_2YEARS,
        question: "What is your budget for your child's 11th-12th education (2 years)?",
        category: 'investment',
        options: [
            "Below Rs 50,000 (total)",
            "Rs 50,000 - Rs 1,00,000",
            "Rs 1,00,000 - Rs 3,00,000",
            "Above Rs 3,00,000",
        ],
        dependsOn: {
            questionId: QUESTION_IDS.CLASS_COMPLETED,
            requiredAnswer: "Class 10th",
        },
        priority: 13,
    },

    // ========================================
    // AFTER 12TH BRANCH
    // ========================================
    {
        id: QUESTION_IDS.CAREER_GOAL_12TH,
        question: "What career direction interests you most for your child?",
        category: 'expectation',
        options: [
            "Engineering / Technology",
            "Medical / Healthcare",
            "Commerce / Business / CA",
            "Arts / Design / Creative Fields",
            "Law / Civil Services",
            "Vocational / Skill-based Training",
            "Not yet decided"
        ],
        dependsOn: {
            questionId: QUESTION_IDS.CLASS_COMPLETED,
            requiredAnswer: "Class 12th",
        },
        priority: 20,
    },
    {
        id: QUESTION_IDS.ENTRANCE_EXAM_PREP,
        question: "Has your child prepared for any entrance exams?",
        category: 'background',
        options: [
            "Yes, JEE (Engineering)",
            "Yes, NEET (Medical)",
            "Yes, Other entrance exams",
            "No, but willing to prepare",
            "No, prefer direct admission"
        ],
        dependsOn: {
            questionId: QUESTION_IDS.CLASS_COMPLETED,
            requiredAnswer: "Class 12th",
        },
        priority: 21,
    },
    {
        id: QUESTION_IDS.LOCATION_PREFERENCE_12TH,
        question: "How far are you willing to send your child for higher education?",
        category: 'location_preference',
        options: [
            "Within the same city",
            "Within the same state",
            "Anywhere in India",
            "Open to studying abroad"
        ],
        dependsOn: {
            questionId: QUESTION_IDS.CLASS_COMPLETED,
            requiredAnswer: "Class 12th",
        },
        priority: 22,
    },
    {
        id: QUESTION_IDS.BUDGET_DEGREE,
        question: "What is your budget for your child's degree (3-5 years)?",
        category: 'investment',
        options: [
            "Below Rs 2,00,000 (total)",
            "Rs 2,00,000 - Rs 5,00,000",
            "Rs 5,00,000 - Rs 15,00,000",
            "Rs 15,00,000 - Rs 30,00,000",
            "Above Rs 30,00,000"
        ],
        dependsOn: {
            questionId: QUESTION_IDS.CLASS_COMPLETED,
            requiredAnswer: "Class 12th",
        },
        priority: 23,
    },

    // ========================================
    // CONDITIONAL FOLLOW-UP QUESTIONS
    // ========================================
    {
        id: QUESTION_IDS.GOVT_ENTRANCE_PREP,
        question: "Is your child prepared to dedicate time for entrance exam preparation?",
        category: 'guidance_style',
        options: [
            "Yes, already preparing",
            "Yes, willing to join coaching",
            "Can prepare with online resources",
            "Prefer colleges without entrance exams"
        ],
        dependsOn: {
            questionId: QUESTION_IDS.INSTITUTION_TYPE,
            requiredAnswer: "Government colleges (subsidized fees)",
        },
        priority: 30,
    },
    {
        id: QUESTION_IDS.PRIVATE_BUDGET_CONFIRM,
        question: "Private colleges often have higher fees. Can you confirm your budget range?",
        category: 'investment',
        options: [
            "Yes, budget is flexible for quality education",
            "Yes, but looking for scholarships",
            "Prefer affordable private colleges",
            "Will consider loans if needed"
        ],
        dependsOn: {
            questionId: QUESTION_IDS.INSTITUTION_TYPE,
            requiredAnswer: "Private colleges (better facilities)",
        },
        priority: 31,
    },
    {
        id: QUESTION_IDS.NEET_PREPARATION,
        question: "What is your child's NEET preparation status?",
        category: 'background',
        options: [
            "Already appeared/appearing for NEET",
            "Preparing with coaching",
            "Self-studying",
            "Planning to prepare",
            "Considering alternative medical paths (BPT, Nursing, etc.)"
        ],
        dependsOn: {
            questionId: QUESTION_IDS.CAREER_GOAL_12TH,
            requiredAnswer: "Medical / Healthcare",
        },
        priority: 32,
    },
    {
        id: QUESTION_IDS.JEE_PREPARATION,
        question: "What is your child's JEE preparation status?",
        category: 'background',
        options: [
            "Already appeared/appearing for JEE Main",
            "Preparing with coaching",
            "Self-studying",
            "Planning to prepare",
            "Considering state-level engineering entrances"
        ],
        dependsOn: {
            questionId: QUESTION_IDS.CAREER_GOAL_12TH,
            requiredAnswer: "Engineering / Technology",
        },
        priority: 33,
    },
];

/**
 * Get questions to display based on previously answered questions
 */
export function getNextQuestions(
    answers: Record<string, string>
): AdaptiveParentQuestion[] {
    const answeredIds = new Set(Object.keys(answers).map(id => parseInt(id)));

    // Filter questions based on dependencies
    const applicableQuestions = adaptiveParentQuestions.filter(question => {
        // Already answered
        if (answeredIds.has(question.id)) {
            return false;
        }

        // No dependency - always show
        if (!question.dependsOn) {
            return true;
        }

        // Check if dependency is satisfied
        const { questionId, requiredAnswer, excludeAnswer } = question.dependsOn;
        const dependencyAnswer = answers[questionId.toString()];

        // Dependency question not yet answered
        if (!dependencyAnswer) {
            return false;
        }

        // Check required answer
        if (requiredAnswer && dependencyAnswer !== requiredAnswer) {
            return false;
        }

        // Check excluded answer
        if (excludeAnswer && dependencyAnswer === excludeAnswer) {
            return false;
        }

        return true;
    });

    // Sort by priority
    return applicableQuestions.sort((a, b) => {
        const priorityA = a.priority ?? 999;
        const priorityB = b.priority ?? 999;
        return priorityA - priorityB;
    });
}

/**
 * Get total number of questions for the quiz based on initial answer
 */
export function getExpectedQuestionCount(classCompleted?: string): number {
    if (!classCompleted) {
        return 0;
    }

    // Initial + Common questions
    let count = 5; // Class + 4 common

    if (classCompleted === "Class 10th") {
        count += 4; // 10th specific questions
    } else if (classCompleted === "Class 12th") {
        count += 4; // 12th specific questions
    }

    // Conditional questions are optional, so we don't count them in expected total

    return count;
}
