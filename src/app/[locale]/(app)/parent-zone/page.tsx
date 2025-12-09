'use client';

import { ParentQuizForm } from '@/components/quiz/ParentQuizForm';
import { ParentDashboard } from '@/components/dashboard/ParentDashboard';
import { ParentOnboarding } from '@/components/onboarding/ParentOnboarding';
import { Suspense, useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/use-auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, FileQuestion } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ParentOnboardingData } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Users, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChildDataView } from '@/components/dashboard/ChildDataView';

function QuizLoading() {
  return <Skeleton className="w-full max-w-3xl h-[600px]" />;
}

export default function ParentZonePage() {
  const { userProfile, parentQuizAnswers, updateUserProfile, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [aiRecommendation, setAIRecommendation] = useState<any>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Check if quiz is completed
  const quizCompleted = parentQuizAnswers && Object.keys(parentQuizAnswers).length > 0;

  // Check if onboarding is completed
  const onboardingCompleted = !!userProfile?.parentOnboarding?.completedAt;
  const [onboardingLoading, setOnboardingLoading] = useState(false);

  // SECURITY: Validate user type - only parents can access this page
  useEffect(() => {
    if (!loading && userProfile) {
      if (userProfile.userType === 'student') {
        // Redirect students to dashboard
        router.push('/dashboard');
      }
    }
  }, [userProfile, loading, router]);

  // Show loading or access denied for students
  if (loading) {
    return <QuizLoading />;
  }

  if (userProfile?.userType === 'student') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            This is the Parent Zone. Students should use the Student Dashboard. Redirecting...
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Handle onboarding completion
  const handleOnboardingComplete = async (data: ParentOnboardingData) => {
    setOnboardingLoading(true);
    try {
      await updateUserProfile({ parentOnboarding: data });
      setShowOnboarding(false);
    } catch (error) {
      console.error('Failed to save onboarding data:', error);
      // Still proceed even if save fails - don't block the user
      alert('There was an issue saving your data. Please try again later or contact support. You can still proceed to the dashboard.');
      setShowOnboarding(false);
    } finally {
      setOnboardingLoading(false);
    }
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
  };

  // Show onboarding on first visit
  useEffect(() => {
    if (!onboardingCompleted && userProfile?.userType === 'parent') {
      setShowOnboarding(true);
    }
  }, [onboardingCompleted, userProfile]);

  // Set initial tab based on quiz completion and URL param
  // Set initial tab based on URL param
  useEffect(() => {
    if (tabParam === 'quiz') {
      setActiveTab('quiz');
    }
  }, [tabParam]);

  // Mock AI recommendation from parent quiz
  // In a real implementation, this would come from the ParentQuizForm results
  useEffect(() => {
    if (parentQuizAnswers && Object.keys(parentQuizAnswers).length > 0) {
      // This is a simplified version - in reality, you'd fetch this from the AI results
      setAIRecommendation({
        suggestedPath: 'Engineering (Computer Science)',
        reasoning: 'Based on your child\'s interests and your expectations, engineering offers excellent career prospects with strong ROI.',
        nextSteps: [
          'Research top engineering colleges within your budget',
          'Prepare for JEE Main entrance examination',
          'Explore scholarship opportunities for engineering students',
          'Consider coaching classes for entrance exam preparation',
        ],
      });
    }
  }, [parentQuizAnswers]);

  // Child Sync State
  const [childCode, setChildCode] = useState('');
  const [syncedChild, setSyncedChild] = useState<any>(null);
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncError, setSyncError] = useState('');

  const handleSyncChild = async () => {
    if (!childCode || childCode.length !== 6) {
      setSyncError('Please enter a valid 6-digit code.');
      return;
    }
    setSyncLoading(true);
    setSyncError('');
    try {
      const { getStudentByShareCode } = await import('@/lib/firebase/database');
      const child = await getStudentByShareCode(childCode);
      if (child) {
        setSyncedChild(child);
        // Optional: Save to local storage or profile for persistence
      } else {
        setSyncError('Invalid code. Please check and try again.');
      }
    } catch (error) {
      console.error("Sync error", error);
      setSyncError('Failed to sync. Please try again.');
    } finally {
      setSyncLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Show onboarding if not completed */}
      {showOnboarding ? (
        <div className="w-full py-8">
          <ParentOnboarding
            onComplete={handleOnboardingComplete}
            onSkip={handleOnboardingSkip}
            loading={onboardingLoading}
          />
        </div>
      ) : (
        <>
          <div className="mb-8 text-center w-full">
            <h1 className="text-4xl font-bold font-headline">Parent Guidance Zone</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              {quizCompleted
                ? `Welcome back, ${userProfile?.name}! Your personalized guidance dashboard.`
                : "Answer a few questions to receive AI-powered guidance on how to best support your child's educational and career journey."}
            </p>
          </div>

          {/* Sync with Child Section */}
          <div className="w-full max-w-4xl mb-8">
            {!syncedChild ? (
              <div className="bg-white dark:bg-slate-950 border rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Sync with your Child
                </h2>
                <div className="flex flex-col md:flex-row gap-4 items-end">
                  <div className="flex-1 w-full space-y-2">
                    <label htmlFor="child-code" className="text-sm font-medium">
                      Enter Share Code from Student Dashboard
                    </label>
                    <Input
                      id="child-code"
                      placeholder="Enter 6-digit code (e.g. 123456)"
                      value={childCode}
                      onChange={(e) => setChildCode(e.target.value)}
                      maxLength={6}
                    />
                  </div>
                  <Button onClick={handleSyncChild} disabled={syncLoading}>
                    {syncLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Syncing...
                      </>
                    ) : 'View Child Data'}
                  </Button>
                </div>
                {syncError && <p className="text-sm text-red-500 mt-2">{syncError}</p>}
              </div>
            ) : (
              <div className="mb-8 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 z-10 text-muted-foreground"
                  onClick={() => setSyncedChild(null)}
                >
                  Close View
                </Button>
                <ChildDataView childProfile={syncedChild} />
              </div>
            )}
          </div>


          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="quiz" className="flex items-center gap-2">
                <FileQuestion className="h-4 w-4" />
                Guidance Quiz
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <ParentDashboard aiRecommendation={aiRecommendation} />
            </TabsContent>

            <TabsContent value="quiz">
              <Suspense fallback={<QuizLoading />}>
                <ParentQuizForm />
              </Suspense>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
