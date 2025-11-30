// AI-powered Career Recommendation Engine
// Analyzes quiz answers to recommend the best course for students

import { allCourses, getCourseById, getCoursesByStream, type Course } from './courses-database';
import type { RIASECScores } from './quiz/riasec-scoring';

export interface CareerRecommendation {
    courseId: string;
    courseName: string;
    stream: string;
    matchScore: number; // 0-100
    whyRecommended: string[];
    alternativeCourses: string[]; // IDs of similar courses
    confidence: 'high' | 'medium' | 'low';
}

interface QuizAnswers {
    [key: string]: string;
}

interface UserProfile {
    classLevel?: string;
    userType?: string;
}

/**
 * Main function to get course recommendation based on quiz answers
 */
export function getCareerRecommendation(
    quizAnswers: QuizAnswers,
    userProfile: UserProfile,
    riasecScores?: RIASECScores
): CareerRecommendation | null {
    if (!quizAnswers || Object.keys(quizAnswers).length === 0) {
        return null;
    }

    // Determine user's stream - use RIASEC if available, else fallback to keyword matching
    const stream = riasecScores
        ? determineStreamFromRIASEC(riasecScores)
        : determineStream(quizAnswers);

    // Get courses for that stream and class level
    const classLevel = userProfile?.classLevel === '10' ? '10' : '12';
    const relevantCourses = allCourses.filter(
        course => course.stream === stream && course.classLevel === classLevel
    );

    if (relevantCourses.length === 0) {
        return null;
    }

    // Score each course - use RIASEC if available
    const scoredCourses = relevantCourses.map(course => ({
        course,
        score: riasecScores
            ? calculateCourseScoreFromRIASEC(course, riasecScores)
            : calculateCourseScore(course, quizAnswers, stream),
    }));

    // Sort by score
    scoredCourses.sort((a, b) => b.score - a.score);

    const topCourse = scoredCourses[0];
    const alternativesIds = scoredCourses
        .slice(1, 4)
        .map(sc => sc.course.id);

    // Generate reasons - use RIASEC if available
    const reasons = riasecScores
        ? generateReasonsFromRIASEC(topCourse.course, riasecScores, stream)
        : generateReasons(topCourse.course, quizAnswers, stream);

    // Determine confidence
    const confidence = topCourse.score >= 80 ? 'high'
        : topCourse.score >= 60 ? 'medium'
            : 'low';

    return {
        courseId: topCourse.course.id,
        courseName: topCourse.course.fullName,
        stream: topCourse.course.stream,
        matchScore: Math.round(topCourse.score),
        whyRecommended: reasons,
        alternativeCourses: alternativesIds,
        confidence,
    };
}

/**
 * Determine stream from RIASEC scores
 */
function determineStreamFromRIASEC(riasecScores: RIASECScores): string {
    // Get top 2 RIASEC types
    const sorted = (Object.entries(riasecScores) as [keyof RIASECScores, number][])
        .sort(([, a], [, b]) => b - a);

    const topType = sorted[0][0];
    const topScore = sorted[0][1];

    // Vocational if Realistic is extremely high
    if (topType === 'R' && topScore > 80 && riasecScores.I < 50) {
        return 'vocational';
    }

    // Map RIASEC to streams
    if (topType === 'R' || topType === 'I') return 'science';
    if (topType === 'E' || topType === 'C') return 'commerce';
    if (topType === 'A' || topType === 'S') return 'arts';

    return 'science'; // Default
}

/**
 * Calculate course score based on RIASEC personality profile
 */
function calculateCourseScoreFromRIASEC(
    course: Course,
    riasecScores: RIASECScores
): number {
    let score = 50; // Base score

    // Engineering courses
    if (course.branch === 'engineering') {
        score += riasecScores.R * 0.3; // Realistic (hands-on)
        score += riasecScores.I * 0.4; // Investigative (problem-solving)
    }

    // Medical courses
    if (course.branch === 'medical') {
        score += riasecScores.I * 0.4; // Investigative (science)
        score += riasecScores.S * 0.3; // Social (helping people)
    }

    // Business/Commerce
    if (course.branch === 'business' || course.branch === 'finance') {
        score += riasecScores.E * 0.4; // Enterprising (leadership/business)
        score += riasecScores.C * 0.3; // Conventional (organized)
    }

    // Law
    if (course.branch === 'law') {
        score += riasecScores.A * 0.3; // Artistic (communication/expression)
        score += riasecScores.E * 0.2; // Enterprising (persuasion)
        score += riasecScores.S * 0.2; // Social (justice/helping)
    }

    // Humanities
    if (course.branch === 'humanities') {
        score += riasecScores.A * 0.3; // Artistic (creative thinking)
        score += riasecScores.S * 0.3; // Social (understanding people)
    }

    // Vocational/Skilled
    if (course.branch === 'skilled') {
        score += riasecScores.R * 0.5; // Realistic (very hands-on)
    }

    // Normalize to 0-100
    return Math.min(100, Math.max(0, score));
}

/**
 * Generate reasons based on RIASEC profile
 */
function generateReasonsFromRIASEC(
    course: Course,
    riasecScores: RIASECScores,
    stream: string
): string[] {
    const reasons: string[] = [];

    // Get top RIASEC types
    const sorted = (Object.entries(riasecScores) as [keyof RIASECScores, number][])
        .sort(([, a], [, b]) => b - a);
    const topTypes = sorted.slice(0, 3).map(([type]) => type);

    // Map RIASEC traits to reasons
    if (topTypes.includes('I')) {
        reasons.push('Strong analytical and problem-solving abilities');
    }
    if (topTypes.includes('R')) {
        reasons.push('Practical, hands-on learning approach');
    }
    if (topTypes.includes('A')) {
        reasons.push('Creative thinking and communication skills');
    }
    if (topTypes.includes('S')) {
        reasons.push('People-oriented and collaborative nature');
    }
    if (topTypes.includes('E')) {
        reasons.push('Leadership potential and business acumen');
    }
    if (topTypes.includes('C')) {
        reasons.push('Organized and detail-oriented mindset');
    }

    // Add course-specific reason
    if (course.demand === 'Very High') {
        reasons.push(`${course.demand.toLowerCase()} job market demand`);
    }

    return reasons.slice(0, 4);
}

/**
 * Determine which stream (Science/Commerce/Arts/Vocational) based on quiz
 * Fallback method for old quiz format
 */
function determineStream(quizAnswers: QuizAnswers): string {
    const scores = {
        science: 0,
        commerce: 0,
        arts: 0,
        vocational: 0,
    };

    // Analyze answers to determine stream preference
    Object.entries(quizAnswers).forEach(([questionId, answer]) => {
        const lowerAnswer = answer.toLowerCase();

        // Science indicators
        if (
            lowerAnswer.includes('math') ||
            lowerAnswer.includes('science') ||
            lowerAnswer.includes('technology') ||
            lowerAnswer.includes('engineering') ||
            lowerAnswer.includes('doctor') ||
            lowerAnswer.includes('research')
        ) {
            scores.science += 10;
        }

        // Commerce indicators
        if (
            lowerAnswer.includes('business') ||
            lowerAnswer.includes('finance') ||
            lowerAnswer.includes('accounting') ||
            lowerAnswer.includes('management') ||
            lowerAnswer.includes('entrepreneur')
        ) {
            scores.commerce += 10;
        }

        // Arts indicators
        if (
            lowerAnswer.includes('law') ||
            lowerAnswer.includes('writing') ||
            lowerAnswer.includes('history') ||
            lowerAnswer.includes('politics') ||
            lowerAnswer.includes('creative') ||
            lowerAnswer.includes('social')
        ) {
            scores.arts += 10;
        }

        // Vocational indicators
        if (
            lowerAnswer.includes('practical') ||
            lowerAnswer.includes('hands-on') ||
            lowerAnswer.includes('skill') ||
            lowerAnswer.includes('trade')
        ) {
            scores.vocational += 10;
        }
    });

    // Return stream with highest score
    const maxStream = Object.entries(scores).reduce((max, [stream, score]) =>
        score > max[1] ? [stream, score] : max
        , ['science', 0]);

    return maxStream[0];
}

/**
 * Calculate match score for a specific course
 * Fallback method for old quiz format
 */
function calculateCourseScore(
    course: Course,
    quizAnswers: QuizAnswers,
    stream: string
): number {
    let score = 50; // Base score

    const answerString = Object.values(quizAnswers).join(' ').toLowerCase();

    // Engineering courses
    if (course.branch === 'engineering') {
        if (course.id === 'btech-cs') {
            if (answerString.includes('technology') || answerString.includes('coding')) score += 20;
            if (answerString.includes('problem solving')) score += 15;
            if (answerString.includes('logical')) score += 10;
        } else if (course.id === 'btech-mechanical') {
            if (answerString.includes('machines') || answerString.includes('automobile')) score += 20;
            if (answerString.includes('design')) score += 10;
        }
    }

    // Medical courses
    if (course.branch === 'medical') {
        if (answerString.includes('helping') || answerString.includes('care')) score += 20;
        if (answerString.includes('biology') || answerString.includes('health')) score += 15;
        if (answerString.includes('patient')) score += 10;
    }

    // Commerce courses
    if (course.branch === 'business' || course.branch === 'finance') {
        if (answerString.includes('business') || answerString.includes('money')) score += 20;
        if (answerString.includes('leadership') || answerString.includes('management')) score += 15;
        if (course.id === 'ca' && answerString.includes('numbers')) score += 10;
    }

    // Law courses
    if (course.branch === 'law') {
        if (answerString.includes('justice') || answerString.includes('debate')) score += 20;
        if (answerString.includes('reading') || answerString.includes('arguing')) score += 15;
    }

    // Vocational
    if (course.branch === 'skilled') {
        if (answerString.includes('practical') || answerString.includes('hands')) score += 20;
        if (answerString.includes('quick job') || answerString.includes('skill')) score += 15;
    }

    // Normalize to 0-100
    return Math.min(100, Math.max(0, score));
}

/**
 * Generate personalized reasons for recommendation
 * Fallback method for old quiz format
 */
function generateReasons(
    course: Course,
    quizAnswers: QuizAnswers,
    stream: string
): string[] {
    const reasons: string[] = [];

    // Based on course type
    if (course.branch === 'engineering') {
        reasons.push('Strong technical and logical thinking ability');
        if (course.id === 'btech-cs') {
            reasons.push('Interest in technology and programming');
            reasons.push('Excellent problem-solving skills');
        }
    }

    if (course.branch === 'medical') {
        reasons.push('Compassionate and caring personality');
        reasons.push('Interest in biological sciences and healthcare');
    }

    if (course.branch === 'business' || course.branch === 'finance') {
        reasons.push('Business acumen and leadership potential');
        if (course.id === 'ca') {
            reasons.push('Strong analytical and numerical skills');
        }
    }

    if (course.branch === 'law') {
        reasons.push('Excellent communication and argumentation skills');
        reasons.push('Interest in justice and social issues');
    }

    if (course.branch === 'skilled') {
        reasons.push('Practical hands-on learning preference');
        reasons.push('Quick pathway to employment');
    }

    // Add demand-based reason
    if (course.demand === 'Very High') {
        reasons.push(`${course.demand.toLowerCase()} job market demand`);
    }

    return reasons.slice(0, 4); // Return top 4 reasons
}

/**
 * Get alternative courses (for comparison)
 */
export function getAlternativeCourses(
    primaryCourseId: string,
    stream: string,
    limit: number = 3
): Course[] {
    const primaryCourse = getCourseById(primaryCourseId);
    if (!primaryCourse) return [];

    const streamCourses = getCoursesByStream(stream);

    return streamCourses
        .filter(course => course.id !== primaryCourseId)
        .slice(0, limit);
}
