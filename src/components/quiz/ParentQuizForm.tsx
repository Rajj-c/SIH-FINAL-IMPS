'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { adaptiveParentQuestions, getNextQuestions, getExpectedQuestionCount, QUESTION_IDS } from '@/lib/parent-quiz-adaptive';
import { suggestStreamForParent, type ParentStreamSuggestionOutput } from '@/ai/flows/stream-suggestion-for-parent';
import { Loader2, Sparkles, Lightbulb, Check, StepForward, Edit, DollarSign, Award, GraduationCap, TrendingUp, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

// Debounce function
function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise(resolve => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
}


function ResultsDisplay({ result, onRetake, onEdit }: { result: ParentStreamSuggestionOutput, onRetake: () => void, onEdit: () => void }) {
  const [expandedCollege, setExpandedCollege] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-6"
    >
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-3xl font-headline text-primary">AI-Powered Guidance</CardTitle>
                <CardDescription>Based on your answers, here is a personalized recommendation</CardDescription>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onEdit}><Edit className="mr-2 h-4 w-4" />Edit Answers</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 text-base">
          <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border-2 border-primary/20">
            <h2 className="text-3xl font-bold text-center font-headline">
              {result.suggestedPath}
            </h2>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg flex items-center gap-2"><Lightbulb className="h-5 w-5 text-orange-500" /> Why this path?</h3>
            <p className="text-muted-foreground leading-relaxed pl-7">
              {result.reasoning}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg flex items-center gap-2"><StepForward className="h-5 w-5 text-green-500" /> Recommended Next Steps:</h3>
            <ul className="list-none space-y-2 pl-7">
              {result.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Fee Breakdown Card */}
      <Card className="shadow-lg border-2 border-blue-200">
        <CardHeader className="bg-blue-50 dark:bg-blue-950/20">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-blue-600" />
            Estimated Costs & Budget Planning
          </CardTitle>
          <CardDescription>Get a clear picture of educational expenses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
              <div className="text-sm text-muted-foreground mb-1">Annual Tuition Fee</div>
              <div className="text-xl font-bold text-green-700 dark:text-green-400">{result.estimatedCosts.tuitionFeeRange}</div>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
              <div className="text-sm text-muted-foreground mb-1">Total Course Cost</div>
              <div className="text-xl font-bold text-blue-700 dark:text-blue-400">{result.estimatedCosts.totalCostEstimate}</div>
            </div>
          </div>

          {result.estimatedCosts.governmentCollegeFee && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Fee Estimate</h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="p-3 border rounded">
                  <Badge variant="secondary" className="mb-2">Government College</Badge>
                  <div className="font-medium">{result.estimatedCosts.governmentCollegeFee}</div>
                </div>
              </div>
            </div>
          )}

          {result.estimatedCosts.additionalExpenses?.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Additional Expenses</h4>
              <ul className="space-y-1 text-sm">
                {result.estimatedCosts.additionalExpenses.map((expense, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    {expense}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {result.scholarshipOpportunities && result.scholarshipOpportunities.length > 0 && (
        <Card className="shadow-lg border-2 border-amber-200">
          <CardHeader className="bg-amber-50 dark:bg-amber-950/20">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6 text-amber-600" />
              Scholarship Opportunities
            </CardTitle>
            <CardDescription>Click to visit scholarship websites</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {result.scholarshipOpportunities.map((scholarship, idx) => (
                <a
                  key={idx}
                  href={scholarship.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold group-hover:text-amber-600 transition-colors">{scholarship.name}</h4>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-500">{scholarship.amount}</Badge>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{scholarship.eligibility}</p>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommended Colleges Card */}
      {result.recommendedColleges && result.recommendedColleges.length > 0 && (
        <Card className="shadow-lg border-2 border-purple-200">
          <CardHeader className="bg-purple-50 dark:bg-purple-950/20">
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-purple-600" />
              Recommended Colleges
            </CardTitle>
            <CardDescription>Click to view full details about each college</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {result.recommendedColleges.map((college, idx) => (
                <div key={idx} className="border rounded-lg overflow-hidden">
                  <div
                    className="p-4 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-colors cursor-pointer"
                    onClick={() => setExpandedCollege(expandedCollege === idx ? null : idx)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{college.name}</h4>
                          {expandedCollege === idx ?
                            <ChevronUp className="h-4 w-4 text-muted-foreground" /> :
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          }
                        </div>
                        <p className="text-sm text-muted-foreground">{college.location}</p>
                      </div>
                      <Badge variant={college.type.includes('Government') ? 'default' : 'secondary'}>
                        {college.type}
                      </Badge>
                    </div>
                    <div className="text-sm font-medium text-green-600">{college.estimatedFee}</div>
                  </div>

                  {/* Expanded Details */}
                  {expandedCollege === idx && (
                    <div className="px-4 pb-4 pt-2 bg-purple-50/50 dark:bg-purple-950/10 border-t space-y-3">
                      {college.courses && (
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Courses Offered</h5>
                          <p className="text-sm text-muted-foreground">{college.courses}</p>
                        </div>
                      )}
                      {college.facilities && (
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Facilities</h5>
                          <p className="text-sm text-muted-foreground">{college.facilities}</p>
                        </div>
                      )}
                      {college.highlights && (
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Highlights</h5>
                          <p className="text-sm text-muted-foreground">{college.highlights}</p>
                        </div>
                      )}
                      {college.website && (
                        <div className="pt-2">
                          <a
                            href={college.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2"
                          >
                            <Button size="sm" variant="outline" className="w-full">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Know More About College
                            </Button>
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardFooter className="pt-6">
          <Button onClick={onRetake} className="w-full" variant="outline">Start New Assessment</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function ParentQuizForm() {
  const { userProfile, parentQuizAnswers, updateParentQuizAnswers, loading: authLoading } = useAuth();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ParentStreamSuggestionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [questionSequence, setQuestionSequence] = useState<typeof adaptiveParentQuestions>([]);
  const [showInitialChoice, setShowInitialChoice] = useState(false);
  const [justCompletedQuiz, setJustCompletedQuiz] = useState(false); // Track if quiz was just completed in this session

  // Build complete question sequence when starting quiz fresh
  useEffect(() => {
    if (isEditing) {
      // Get questions based on current answers to determine what's next
      const applicableQuestions = getNextQuestions(answers);

      // Only update sequence when we have no sequence or when restarting
      if (questionSequence.length === 0 || Object.keys(answers).length === 0) {
        setQuestionSequence(applicableQuestions);
      }
    }
  }, [isEditing, answers]);

  const debouncedSuggestStream = useCallback(debounce(suggestStreamForParent, 500), []);

  useEffect(() => {
    if (parentQuizAnswers && Object.keys(parentQuizAnswers).length > 0 && !justCompletedQuiz) {
      // User has previously completed the quiz - show choice screen
      // BUT not if they just completed it in this session
      setAnswers(parentQuizAnswers);
      setShowInitialChoice(true);
      setIsEditing(false);
    } else if (!parentQuizAnswers || Object.keys(parentQuizAnswers).length === 0) {
      // No previous answers - start quiz in editing mode
      setIsEditing(true);
      setShowInitialChoice(false);
    }
  }, [parentQuizAnswers, justCompletedQuiz]);

  useEffect(() => {
    // Generate suggestion if answers exist and not in editing mode and not showing initial choice
    if (Object.keys(answers).length > 0 && !isEditing && !showInitialChoice) {
      const getSuggestion = async () => {
        setIsLoading(true);
        setError(null);
        const formattedAnswers = adaptiveParentQuestions.reduce((acc, q) => {
          const answer = answers[q.id.toString()];
          if (answer) {
            acc[q.question] = answer;
          }
          return acc;
        }, {} as Record<string, string>);

        // Add timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
          setIsLoading(false);
          setError("AI analysis is taking longer than expected. Your answers have been saved. You can view the dashboard or try again later.");
        }, 30000); // 30 second timeout

        try {
          const suggestion = await debouncedSuggestStream({ parentAnswers: JSON.stringify(formattedAnswers, null, 2) });
          clearTimeout(timeoutId);
          setResult(suggestion);
        } catch (err) {
          clearTimeout(timeoutId);
          console.error(err);
          setError("We couldn't generate a recommendation right now. Your answers have been saved. You can view the dashboard or try again later.");
        } finally {
          clearTimeout(timeoutId);
          setIsLoading(false);
        }
      };
      getSuggestion();
    }
  }, [answers, isEditing, showInitialChoice, debouncedSuggestStream]);


  const handleNext = async () => {
    if (currentQuestionIndex < questionSequence.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed - save answers and directly show results
      setJustCompletedQuiz(true); // Mark that quiz was just completed
      setShowInitialChoice(false);
      await updateParentQuizAnswers(answers);
      setIsEditing(false); // This will trigger the AI analysis
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id.toString()]: value });
  };

  const handleRetake = () => {
    setResult(null);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setQuestionSequence([]);
    setJustCompletedQuiz(false); // Reset flag when retaking
    setIsEditing(true);
    setShowInitialChoice(false);
  };

  const handleViewPreviousResults = () => {
    setShowInitialChoice(false);
    setIsEditing(false); // This will trigger the AI analysis with existing answers
  };

  const handleEdit = () => {
    setCurrentQuestionIndex(0);
    setResult(null);
    setIsEditing(true);
  };

  const currentQuestion = questionSequence[currentQuestionIndex];
  const classCompleted = answers[QUESTION_IDS.CLASS_COMPLETED.toString()];
  const expectedTotal = getExpectedQuestionCount(classCompleted);
  const progress = expectedTotal > 0 ? ((currentQuestionIndex + 1) / expectedTotal) * 100 : 0;
  const isAnswered = currentQuestion ? answers[currentQuestion.id.toString()] !== undefined : false;

  if (authLoading) {
    return <Skeleton className="h-96 w-full" />
  }

  // Show initial choice screen if user has previously completed the quiz
  if (showInitialChoice) {
    return (
      <Card className="w-full max-w-3xl mx-auto shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-center">Welcome Back!</CardTitle>
          <CardDescription className="text-center">
            You've already completed the Parent Guidance Quiz. What would you like to do?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 py-8">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-16 w-16 text-primary" />
            </div>
            <p className="text-muted-foreground">
              Start a new quiz to update your preferences, or view your previous AI-powered recommendations.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button onClick={handleRetake} variant="outline" className="flex-1">
            <Edit className="mr-2 h-4 w-4" />
            Start New Quiz
          </Button>
          <Button onClick={handleViewPreviousResults} className="flex-1">
            <Sparkles className="mr-2 h-4 w-4" />
            View Previous Results
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-3xl mx-auto shadow-2xl text-center p-8">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-headline">Analyzing your answers...</h2>
        <p className="text-muted-foreground mb-6">Our AI is crafting personalized guidance for you. This may take a moment.</p>
        <Button
          variant="outline"
          onClick={() => window.location.href = '/parent-zone'}
        >
          Skip & Go to Dashboard
        </Button>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-3xl mx-auto shadow-2xl text-center p-8">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="flex gap-3 mt-4 justify-center">
          <Button onClick={handleRetake} variant="outline">Try Again</Button>
          <Button onClick={() => window.location.href = '/parent-zone'}>
            Go to Dashboard
          </Button>
        </div>
      </Card>
    )
  }

  // Show results if they exist and not in editing mode
  if (result && !isEditing) {
    return <ResultsDisplay result={result} onRetake={handleRetake} onEdit={handleEdit} />;
  }

  // Otherwise, show the quiz form
  return (
    <Card className="w-full max-w-3xl mx-auto shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Parent Guidance Quiz</CardTitle>
        <CardDescription>
          {expectedTotal > 0 ? `Answer these questions to receive AI-powered advice tailored to your child's needs.` : 'Start by telling us about your child.'}
        </CardDescription>
        <div className="pt-4">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Question {currentQuestionIndex + 1}{expectedTotal > 0 ? ` of ~${expectedTotal}` : ''}
          </p>
        </div>
      </CardHeader>
      <CardContent className="min-h-[300px]">
        {currentQuestion ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-semibold text-xl mb-4">{currentQuestion.question}</h3>
              <RadioGroup
                value={answers[currentQuestion.id.toString()]}
                onValueChange={handleAnswerChange}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-md border has-[:checked]:bg-secondary has-[:checked]:border-primary">
                    <RadioGroupItem value={option} id={`q${currentQuestion.id}-o${index}`} />
                    <Label htmlFor={`q${currentQuestion.id}-o${index}`} className="flex-1 cursor-pointer text-base">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={currentQuestionIndex === 0}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!isAnswered || !currentQuestion}>
          {currentQuestionIndex < questionSequence.length - 1 ? 'Next' : 'Get My Guidance'}
        </Button>
      </CardFooter>
    </Card>
  );
}
