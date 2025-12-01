'use client';

import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { CareerReadinessScore } from '@/components/dashboard/CareerReadinessScore';
import { RecommendedStream } from '@/components/dashboard/RecommendedStream';
import { TopCareerPaths } from '@/components/dashboard/TopCareerPaths';
import { NearbyColleges } from '@/components/dashboard/NearbyColleges';
import { OneStopAdvisorHero } from '@/components/dashboard/OneStopAdvisorHero';
import { JourneyTimeline } from '@/components/dashboard/JourneyTimeline';
import { QuickActionsGrid } from '@/components/dashboard/QuickActionsGrid';
import { useAuth } from '@/hooks/use-auth';
import { getCareerRecommendation } from '@/lib/career-recommendations';
import { getCourseById } from '@/lib/courses-database';
import { questionBankFor10th, questionBankFor12th } from '@/lib/quiz/question-bank';
import { calculateRIASECScores } from '@/lib/quiz/riasec-scoring';
import {
  Lightbulb,
  Compass,
  GraduationCap,
  Calendar,
  Sparkles,
  Bookmark,
  Library,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { colleges, careerPaths } from '@/lib/data';
import { useMemo, useEffect } from 'react';
import { CareerPathNode } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  const { userProfile, savedColleges, savedCareerPaths, quizAnswers, loading } = useAuth();
  const router = useRouter();

  // SECURITY: Validate user type - only students can access this page
  useEffect(() => {
    if (!loading && userProfile) {
      if (userProfile.userType === 'parent') {
        // Redirect parents to parent zone
        router.push('/parent-zone');
      }
    }
  }, [userProfile, loading, router]);

  // Calculate Career Readiness Score
  const readinessScore = useMemo(() => {
    if (!userProfile) return 0;

    let score = 0;

    // Quiz completed (30 points)
    if (quizAnswers && Object.keys(quizAnswers).length > 0) {
      score += 30;
    }

    // Saved items (20 points)
    const savedCount = savedColleges.length + savedCareerPaths.length;
    score += Math.min(savedCount * 4, 20);

    // Profile completeness (20 points)
    if (userProfile.name) score += 5;
    if (userProfile.classLevel) score += 5;
    if (userProfile.gender) score += 5;
    if (userProfile.email) score += 5;

    // Engagement (30 points - based on quiz answers depth)
    if (quizAnswers && Object.keys(quizAnswers).length >= 10) {
      score += 30;
    } else if (quizAnswers && Object.keys(quizAnswers).length > 0) {
      score += 15;
    }

    return Math.min(score, 100);
  }, [userProfile, quizAnswers, savedColleges, savedCareerPaths]);

  // Get actual course recommendation using same logic as One-Stop Advisor
  const topRecommendation = useMemo(() => {
    if (!quizAnswers || !userProfile || Object.keys(quizAnswers).length === 0) {
      return null;
    }

    // Calculate RIASEC scores (same as One-Stop Advisor page)
    const questionBank = userProfile.classLevel === '10' ? questionBankFor10th : questionBankFor12th;
    const allQuestions = [
      ...questionBank.baseline,
      ...Object.values(questionBank.deepdive).flat(),
    ];

    const responses = Object.entries(quizAnswers).map(([questionId, answer]) => ({
      questionId,
      answer: answer,
    }));

    const riasecScores = responses.length > 0
      ? calculateRIASECScores(responses, allQuestions)
      : undefined;

    // Get career recommendation
    const rec = getCareerRecommendation(quizAnswers, userProfile, riasecScores);
    if (!rec) return null;

    const course = getCourseById(rec.courseId);
    if (!course) return null;

    return {
      name: course.name,
      matchScore: rec.matchScore,
      stream: rec.stream,
    };
  }, [quizAnswers, userProfile]);

  // Get recommended career paths based on stream
  const recommendedPaths = useMemo<CareerPathNode[]>(() => {
    if (!topRecommendation) return [];

    // Simply return empty for now since we show the recommendation in OneStopAdvisorHero
    return [];
  }, [topRecommendation]);

  // Get colleges for user's state
  const relevantColleges = useMemo(() => {
    const level = userProfile?.classLevel === '10' ? 'after_10th' : 'after_12th';
    return colleges.filter((c) => c.level === level);
  }, [userProfile]);

  if (loading || !userProfile) {
    return (
      <div className="space-y-8">
        <div className="mb-8">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-4 w-3/4 mt-2" />
        </div>
        <Skeleton className="h-64 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  // Show access denied for parents
  if (userProfile.userType === 'parent') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            This is the Student Dashboard. Parents should use the Parent Zone. Redirecting...
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const quizTaken = !!quizAnswers && Object.keys(quizAnswers).length > 0;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Welcome back, {userProfile?.name || 'Student'}!
        </h1>
        <p className="text-muted-foreground mt-2 text-lg flex items-center gap-2">
          <span>Your personalized career guidance dashboard</span>
          {quizTaken && (
            <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
              🔥 Active learner
            </span>
          )}
        </p>
      </div>

      {/* ONE-STOP ADVISOR HERO - Featured Section */}
      <OneStopAdvisorHero
        hasCompletedQuiz={quizTaken}
        topRecommendation={topRecommendation || undefined}
        lastAccessed={quizTaken ? '2 hours ago' : undefined}
      />

      {/* Journey Timeline */}
      <JourneyTimeline
        currentStage={quizTaken ? 'advisor' : 'quiz'}
        hasCompletedQuiz={quizTaken}
      />

      {/* Career Readiness Score */}
      <CareerReadinessScore
        score={readinessScore}
        breakdown={{
          quizCompleted: quizTaken,
          savedItemsCount: savedColleges.length + savedCareerPaths.length,
          profileComplete: !!(userProfile.name && userProfile.classLevel && userProfile.gender),
        }}
      />

      {/* Personalized Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendedPaths.length > 0 && <TopCareerPaths paths={recommendedPaths} />}
        {relevantColleges.length > 0 && (
          <NearbyColleges colleges={relevantColleges} userState={userProfile.state} />
        )}
      </div>

      {/* Quick Actions with Featured One-Stop Advisor */}
      <QuickActionsGrid
        savedItemsCount={savedColleges.length + savedCareerPaths.length}
        hasCompletedQuiz={quizTaken}
      />
    </div>
  );
}
