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
): CareerRecommendation[] | null {
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

    // Analyze profiles
    const academicProfile = analyzeAcademicProfile(quizAnswers);
    const preferenceProfile = analyzePreferences(quizAnswers);

    // Score each course - use RIASEC if available
    const scoredCourses = relevantCourses.map(course => ({
        course,
        score: riasecScores
            ? calculateCourseScoreFromRIASEC(course, riasecScores, academicProfile, preferenceProfile)
            : calculateCourseScore(course, quizAnswers, stream),
    }));

    // Sort by score
    scoredCourses.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        // Deterministic tie-breaker
        return a.course.id.localeCompare(b.course.id);
    });

    // Get top 3 courses
    const topCourses = scoredCourses.slice(0, 3);

    return topCourses.map((courseData) => {
        const reasons = riasecScores
            ? generateReasonsFromRIASEC(courseData.course, riasecScores, stream, academicProfile, preferenceProfile)
            : generateReasons(courseData.course, quizAnswers, stream);

        const confidence = courseData.score >= 80 ? 'high'
            : courseData.score >= 60 ? 'medium'
                : 'low';

        // Get alternatives (excluding the other top courses)
        const otherTopIds = topCourses.map(tc => tc.course.id);
        const alternativesIds = scoredCourses
            .filter(sc => !otherTopIds.includes(sc.course.id))
            .slice(0, 3)
            .map(sc => sc.course.id);

        return {
            courseId: courseData.course.id,
            courseName: courseData.course.fullName,
            stream: courseData.course.stream,
            matchScore: Math.round(courseData.score),
            whyRecommended: reasons,
            alternativeCourses: alternativesIds,
            confidence,
        };
    });
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
 * Academic Profile Interface
 */
interface AcademicProfile {
    mathStrength: number; // 0-10
    scienceStrength: number; // 0-10
    biologyStrength: number; // 0-10
    englishStrength: number; // 0-10
    socialStrength: number; // 0-10
    computerStrength: number; // 0-10
}

/**
 * Analyze quiz answers to determine academic strengths
 */
function analyzeAcademicProfile(quizAnswers: QuizAnswers): AcademicProfile {
    const profile: AcademicProfile = {
        mathStrength: 5,
        scienceStrength: 5,
        biologyStrength: 5,
        englishStrength: 5,
        socialStrength: 5,
        computerStrength: 5
    };

    // 10th Grade Logic
    if (quizAnswers['10-acad-1']) {
        const topSubjects = JSON.parse(quizAnswers['10-acad-1'] as string) as string[];
        if (topSubjects.includes('Mathematics')) profile.mathStrength += 3;
        if (topSubjects.includes('Science')) { profile.scienceStrength += 3; profile.biologyStrength += 3; }
        if (topSubjects.includes('English / Languages')) profile.englishStrength += 3;
        if (topSubjects.includes('Social Studies')) profile.socialStrength += 3;
        if (topSubjects.includes('Computer Science')) profile.computerStrength += 3;
    }
    if (quizAnswers['10-acad-2']) {
        // "Effort needed for Math" (1=Hard, 10=Easy)
        profile.mathStrength = Number(quizAnswers['10-acad-2']);
    }

    // 12th Grade Logic
    if (quizAnswers['12-skill-1']) {
        const skills = JSON.parse(quizAnswers['12-skill-1'] as string) as Record<string, number>;
        if (skills['Mathematics']) profile.mathStrength = skills['Mathematics'];
        if (skills['Physics']) profile.scienceStrength = skills['Physics'];
        if (skills['Chemistry']) profile.scienceStrength = (profile.scienceStrength + skills['Chemistry']) / 2;
        if (skills['Biology']) profile.biologyStrength = skills['Biology'];
        if (skills['Computer Science']) profile.computerStrength = skills['Computer Science'];
        if (skills['English']) profile.englishStrength = skills['English'];
    }

    return profile;
}

/**
 * Preference Profile Interface
 */
interface PreferenceProfile {
    workEnvironment: 'office' | 'outdoor' | 'lab' | 'studio' | 'hospital' | 'any';
    studyDuration: number; // 1-10 scale (1=short, 10=long)
    teamPreference: 'solo' | 'team' | 'any';
}

/**
 * Analyze quiz answers to determine preferences
 */
function analyzePreferences(quizAnswers: QuizAnswers): PreferenceProfile {
    const profile: PreferenceProfile = {
        workEnvironment: 'any',
        studyDuration: 5,
        teamPreference: 'any'
    };

    // 10th Grade Preferences
    if (quizAnswers['10-pref-1']) {
        const ans = quizAnswers['10-pref-1'] as string;
        if (ans.includes('office')) profile.workEnvironment = 'office';
        if (ans.includes('Outdoors')) profile.workEnvironment = 'outdoor';
        if (ans.includes('laboratory')) profile.workEnvironment = 'lab';
        if (ans.includes('creative')) profile.workEnvironment = 'studio';
        if (ans.includes('hospital')) profile.workEnvironment = 'hospital';
    }
    if (quizAnswers['10-pref-2']) profile.studyDuration = Number(quizAnswers['10-pref-2']);
    if (quizAnswers['10-pref-3']) {
        const ans = quizAnswers['10-pref-3'] as string;
        if (ans === 'solo') profile.teamPreference = 'solo';
        if (ans === 'team') profile.teamPreference = 'team';
    }

    // 12th Grade Preferences
    if (quizAnswers['12-pref-1']) {
        const ans = quizAnswers['12-pref-1'] as string;
        if (ans.includes('office')) profile.workEnvironment = 'office';
        if (ans.includes('Outdoors')) profile.workEnvironment = 'outdoor';
        if (ans.includes('laboratory')) profile.workEnvironment = 'lab';
        if (ans.includes('creative')) profile.workEnvironment = 'studio';
        if (ans.includes('hospital')) profile.workEnvironment = 'hospital';
    }
    if (quizAnswers['12-pref-2']) profile.studyDuration = Number(quizAnswers['12-pref-2']);
    if (quizAnswers['12-pref-3']) {
        const ans = quizAnswers['12-pref-3'] as string;
        if (ans === 'solo') profile.teamPreference = 'solo';
        if (ans === 'team') profile.teamPreference = 'team';
    }

    return profile;
}

/**
 * Calculate course score based on RIASEC personality profile AND Academic Profile AND Preferences
 */
function calculateCourseScoreFromRIASEC(
    course: Course,
    riasecScores: RIASECScores,
    academicProfile?: AcademicProfile,
    preferenceProfile?: PreferenceProfile
): number {
    let score = 50; // Base score

    // Engineering courses
    if (course.branch === 'engineering') {
        score += riasecScores.R * 0.3; // Realistic (hands-on)
        score += riasecScores.I * 0.4; // Investigative (problem-solving)

        if (academicProfile) {
            // Critical Penalty: Low Math/Science
            if (academicProfile.mathStrength < 4) score -= 25;
            if (academicProfile.scienceStrength < 4) score -= 20;
            // Bonus
            if (academicProfile.mathStrength > 7) score += 10;
        }

        if (preferenceProfile) {
            if (preferenceProfile.workEnvironment === 'outdoor' && (course.id === 'civil-eng' || course.id === 'mining-eng')) score += 15;
            if (preferenceProfile.workEnvironment === 'office' && course.id === 'cs-eng') score += 10;
            if (preferenceProfile.studyDuration < 4) score -= 10; // Engineering is 4 years
        }
    }

    // Medical courses
    if (course.branch === 'medical') {
        score += riasecScores.I * 0.4; // Investigative (science)
        score += riasecScores.S * 0.3; // Social (helping people)

        if (academicProfile) {
            // Critical Penalty: Low Biology/Science
            if (academicProfile.biologyStrength < 4) score -= 30; // Very critical for medical
            if (academicProfile.scienceStrength < 4) score -= 15;
            // Bonus
            if (academicProfile.biologyStrength > 7) score += 15;
        }

        if (preferenceProfile) {
            if (preferenceProfile.workEnvironment === 'hospital') score += 20;
            if (preferenceProfile.workEnvironment === 'lab' && course.id !== 'mbbs') score += 10; // Lab tech, pharmacy
            if (preferenceProfile.studyDuration < 8 && course.id === 'mbbs') score -= 20; // MBBS is long
            if (preferenceProfile.studyDuration < 3) score -= 30; // Medical is generally long
        }
    }

    // Business/Commerce
    if (course.branch === 'business' || course.branch === 'finance') {
        score += riasecScores.E * 0.4; // Enterprising (leadership/business)
        score += riasecScores.C * 0.3; // Conventional (organized)

        if (academicProfile) {
            if (course.id === 'ca' && academicProfile.mathStrength < 5) score -= 15; // CA needs some math
        }

        if (preferenceProfile) {
            if (preferenceProfile.workEnvironment === 'office') score += 10;
            if (preferenceProfile.teamPreference === 'team') score += 5;
        }
    }

    // Law
    if (course.branch === 'law') {
        score += riasecScores.A * 0.3; // Artistic (communication/expression)
        score += riasecScores.E * 0.2; // Enterprising (persuasion)
        score += riasecScores.S * 0.2; // Social (justice/helping)

        if (academicProfile) {
            if (academicProfile.englishStrength > 7) score += 10;
            if (academicProfile.socialStrength > 7) score += 5;
        }

        if (preferenceProfile) {
            if (preferenceProfile.studyDuration > 6) score += 5; // Law is often 5 years
        }
    }

    // Humanities
    if (course.branch === 'humanities') {
        score += riasecScores.A * 0.3; // Artistic (creative thinking)
        score += riasecScores.S * 0.3; // Social (understanding people)

        if (academicProfile) {
            if (academicProfile.socialStrength > 7) score += 10;
            if (academicProfile.englishStrength > 7) score += 5;
        }

        if (preferenceProfile) {
            if (preferenceProfile.workEnvironment === 'studio' && (course.id === 'design' || course.id === 'animation')) score += 15;
            if (preferenceProfile.workEnvironment === 'outdoor' && (course.id === 'journalism' || course.id === 'archaeology')) score += 10;
        }
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
    stream: string,
    academicProfile?: AcademicProfile,
    preferenceProfile?: PreferenceProfile
): string[] {
    const reasons: string[] = [];

    // Get top RIASEC types
    const sorted = (Object.entries(riasecScores) as [keyof RIASECScores, number][])
        .sort(([, a], [, b]) => b - a);
    const topTypes = sorted.slice(0, 3).map(([type]) => type);

    // Map RIASEC traits to reasons
    if (topTypes.includes('I')) reasons.push('Strong analytical and problem-solving abilities');
    if (topTypes.includes('R')) reasons.push('Practical, hands-on learning approach');
    if (topTypes.includes('A')) reasons.push('Creative thinking and communication skills');
    if (topTypes.includes('S')) reasons.push('People-oriented and collaborative nature');
    if (topTypes.includes('E')) reasons.push('Leadership potential and business acumen');
    if (topTypes.includes('C')) reasons.push('Organized and detail-oriented mindset');

    // Add Academic Reasons
    if (academicProfile) {
        if (course.branch === 'engineering' && academicProfile.mathStrength > 7) reasons.push('Strong aptitude for Mathematics');
        if (course.branch === 'medical' && academicProfile.biologyStrength > 7) reasons.push('Excellent grasp of Biology');
        if (course.branch === 'law' && academicProfile.englishStrength > 7) reasons.push('Strong command over language');
    }

    // Preference Reasons
    if (preferenceProfile) {
        if (preferenceProfile.workEnvironment === 'outdoor' && (course.id === 'civil-eng' || course.id === 'mining-eng')) {
            reasons.push("Fits your preference for outdoor work");
        }
        if (preferenceProfile.workEnvironment === 'hospital' && course.branch === 'medical') {
            reasons.push("Aligns with your goal to work in healthcare");
        }
        if (preferenceProfile.studyDuration > 7 && (course.id === 'mbbs' || course.id === 'law')) {
            reasons.push("You are willing to commit to the required long-term study");
        }
        if (preferenceProfile.teamPreference === 'solo' && (course.id === 'research' || course.id === 'writer')) {
            reasons.push("Suits your independent working style");
        }
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

    // Return stream with highest score, with deterministic tie-breaking
    const maxStream = Object.entries(scores).reduce((max, [stream, score]) => {
        if (score > max[1]) return [stream, score];
        if (score === max[1]) {
            // Tie-breaker: alphabetical
            return stream.localeCompare(max[0]) < 0 ? [stream, score] : max;
        }
        return max;
    }, ['science', 0]);

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
