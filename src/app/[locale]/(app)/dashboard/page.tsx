'use client';

import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { CareerReadinessScore } from '@/components/dashboard/CareerReadinessScore';
import { RecommendedStream } from '@/components/dashboard/RecommendedStream';
import { TopCareerPaths } from '@/components/dashboard/TopCareerPaths';
import { NearbyColleges } from '@/components/dashboard/NearbyColleges';
import { OneStopAdvisorHero } from '@/components/dashboard/OneStopAdvisorHero';
import { JourneyMap } from '@/components/dashboard/JourneyMap';
import { QuickActionsGrid } from '@/components/dashboard/QuickActionsGrid';
import { MentorLockCard } from '@/components/dashboard/MentorLockCard';
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
import { AlertCircle, Users, Copy, Check, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from 'react';

import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const { userProfile, savedColleges, savedCareerPaths, quizAnswers, loading } = useAuth();
  const router = useRouter();
  const t = useTranslations('Dashboard');

  // SECURITY: Validate user type - only students can access this page
  useEffect(() => {
    if (!loading && userProfile) {
      if (userProfile.userType === 'parent') {
        // Redirect parents to parent zone
        router.push('/parent-zone');
      }
    }
  }, [userProfile, loading, router]);

  const [shareCode, setShareCode] = useState<string | null>(userProfile?.parentShareCode || null);
  const [generatingCode, setGeneratingCode] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateShareCode = async () => {
    if (!userProfile) return;
    setGeneratingCode(true);
    try {
      const { generateParentShareCode } = await import('@/lib/firebase/database');
      const code = await generateParentShareCode(userProfile.uid);
      setShareCode(code);
    } catch (error) {
      console.error("Failed to generate code", error);
    } finally {
      setGeneratingCode(false);
    }
  };

  const copyToClipboard = () => {
    if (shareCode) {
      navigator.clipboard.writeText(shareCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Calculate Career Readiness Score
  const readinessScore = useMemo(() => {
    if (!userProfile) return 0;

    let score = 0;

    // Quiz completed (30 points)
    if (quizAnswers && Object.keys(quizAnswers).length > 0) {
      score += 30;
    }

    // Saved items (Max 30 points)
    const savedCount = savedColleges.length + savedCareerPaths.length;
    score += Math.min(savedCount * 5, 30); // 5 points per item, max 30

    // Profile completeness (20 points)
    if (userProfile.name) score += 5;
    if (userProfile.classLevel) score += 5;
    if (userProfile.gender) score += 5;
    if (userProfile.email) score += 5;

    // Engagement / Exploration (20 points)
    if (quizAnswers && Object.keys(quizAnswers).length >= 10) {
      score += 10; // Detailed quiz bonus
    }

    // Milestones: "Explorer" bonus
    // If they have explored enough (saved > 3 items), give bonus
    if (savedCount >= 3) {
      score += 10;
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
    const recs = getCareerRecommendation(quizAnswers, userProfile, riasecScores);
    if (!recs || recs.length === 0) return null;

    const rec = recs[0];
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
          <AlertTitle>{t('accessDenied')}</AlertTitle>
          <AlertDescription>
            {t('accessDeniedDesc')}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const quizTaken = !!quizAnswers && Object.values(quizAnswers).filter(a => a && String(a).trim() !== '').length >= 8;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {t('welcome', { name: userProfile?.name || 'Student' })}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg flex items-center gap-2">
          <span>{t('subtitle')}</span>
          {quizTaken && (
            <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
              🔥 {t('activeLearner')}
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



      {/* Career Readiness Score */}
      {/* Career Readiness & Mentor Score Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <CareerReadinessScore
            score={readinessScore}
            breakdown={{
              quizCompleted: quizTaken,
              savedItemsCount: savedColleges.length + savedCareerPaths.length,
              profileComplete: !!(userProfile.name && userProfile.classLevel && userProfile.gender),
            }}
          />
        </div>
        <div className="md:col-span-1">
          <MentorLockCard currentScore={readinessScore} />
        </div>
      </div>

      {/* Personalized Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendedPaths.length > 0 && <TopCareerPaths paths={recommendedPaths} />}
        {/* NearbyColleges removed as per Phase 2 plan */}
      </div>

      {/* Quick Actions with Featured One-Stop Advisor and Parent Share */}
      <QuickActionsGrid
        savedItemsCount={savedColleges.length + savedCareerPaths.length}
        hasCompletedQuiz={quizTaken}
        onShareWithParent={() => setIsShareDialogOpen(true)}
      />

      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share with Parent</DialogTitle>
            <DialogDescription>
              Share your progress, saved colleges, and roadmap with your parents.
              Ask them to enter this code in their Parent Zone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            {shareCode ? (
              <div className="flex items-center space-x-2">
                <div className="text-4xl font-bold tracking-widest text-primary border-2 border-primary/20 rounded-lg px-6 py-3 bg-primary/5">
                  {shareCode}
                </div>
                <Button size="icon" variant="outline" onClick={copyToClipboard}>
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            ) : (
              <Button onClick={generateShareCode} disabled={generatingCode} className="w-full">
                {generatingCode ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Code...
                  </>
                ) : (
                  <>
                    <Users className="mr-2 h-4 w-4" />
                    Generate Share Code
                  </>
                )}
              </Button>
            )}
            <p className="text-xs text-muted-foreground text-center">
              This code allows your parents to view your dashboard data. They cannot make changes.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Journey Map */}
      <JourneyMap
        currentStage={
          quizTaken
            ? (savedColleges.length > 0 || savedCareerPaths.length > 0 ? 'decision' : 'advisor')
            : 'quiz'
        }
        hasCompletedQuiz={quizTaken}
      />
    </div>
  );
}
