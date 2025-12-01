'use client';

import { QuizForm } from '@/components/quiz/QuizForm';
import { Suspense, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FileText, RefreshCw, ArrowRight } from 'lucide-react';

function QuizLoading() {
  return <Skeleton className="w-full max-w-2xl h-[500px]" />;
}

function QuizContent() {
  const { quizAnswers, loading, resetQuizAnswers } = useAuth();
  const router = useRouter();
  const [showQuiz, setShowQuiz] = useState(false);

  if (loading) {
    return <QuizLoading />;
  }

  const hasTakenQuiz = quizAnswers && Object.keys(quizAnswers).length > 0;

  // If user hasn't taken quiz or explicitly chose to start new, show form
  if (!hasTakenQuiz || showQuiz) {
    return <QuizForm />;
  }

  // Otherwise, show options
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-headline">Career Assessment Center</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          You have already completed the assessment. What would you like to do next?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* View Results Card */}
        <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50" onClick={() => router.push('/quiz/results')}>
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">View Previous Results</CardTitle>
            <CardDescription>
              Review your detailed career analysis, personality insights, and recommended paths.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              View Results <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* New Quiz Card */}
        <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50" onClick={async () => {
          await resetQuizAnswers();
          setShowQuiz(true);
        }}>
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <RefreshCw className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Start New Assessment</CardTitle>
            <CardDescription>
              Retake the quiz from the beginning. This will replace your previous results.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              Start New Quiz <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <div className="flex flex-col items-center justify-center py-8 min-h-[80vh]">
      <Suspense fallback={<QuizLoading />}>
        <QuizContent />
      </Suspense>
    </div>
  );
}
