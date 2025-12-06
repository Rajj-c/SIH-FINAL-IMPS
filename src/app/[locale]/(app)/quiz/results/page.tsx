'use client';

import { Suspense, useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { suggestStream, type StreamSuggestionInput, type StreamSuggestionOutput } from '@/ai/flows/stream-suggestion-from-quiz';
import {
  Lightbulb, ArrowRight, BookOpen, TrendingUp, TrendingDown,
  Target, Sparkles, Brain, Rocket, GraduationCap, Briefcase, Clock,
  IndianRupee, BarChart3, Award, Info, ChevronRight, MapPin
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/use-auth';
import { quizData, colleges } from '@/lib/data';
import type { QuizQuestion } from '@/lib/types';
import { motion } from 'framer-motion';
import { CollegeDetailsModal } from '@/components/colleges/CollegeDetailsModal';
import { createGenericCollege } from '@/lib/utils';
import { calculateRIASECScores, type RIASECScores, type QuizResponse } from '@/lib/quiz/riasec-scoring';
import { getCareerRecommendation } from '@/lib/career-recommendations';
import { questionBankFor10th, questionBankFor12th } from '@/lib/quiz/question-bank';
import { LoadingAnimation } from '@/components/ui/LoadingAnimation';

// Debounce function to prevent rapid API calls while editing
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

function SuggestionSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-80" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

const personalityIcons: Record<string, string> = {
  'Analytical Innovator': '🧠',
  'Creative Visionary': '🎨',
  'Empathetic Leader': '❤️',
  'Practical Builder': '🔧',
  'Strategic Thinker': '♟️',
};

const getPersonalityColor = (type: string) => {
  if (type.includes('Analytical')) return 'bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-300';
  if (type.includes('Creative')) return 'bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-300';
  if (type.includes('Empathetic')) return 'bg-pink-500/10 border-pink-500/20 text-pink-700 dark:text-pink-300';
  if (type.includes('Practical')) return 'bg-orange-500/10 border-orange-500/20 text-orange-700 dark:text-orange-300';
  if (type.includes('Strategic')) return 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-300';
  return 'bg-primary/10 border-primary/20';
};

function ResultsDisplay() {
  const { userProfile, loading, quizAnswers, updateQuizAnswers, resetQuizAnswers, saveQuizResult } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const justCompleted = searchParams?.get('completed') === 'true';

  const [suggestion, setSuggestion] = useState<StreamSuggestionOutput | null>(null);
  const [suggestionLoading, setSuggestionLoading] = useState(true);
  const [waitingForData, setWaitingForData] = useState(justCompleted);

  const quizQuestions = useMemo(() => {
    if (!userProfile) return [];
    return userProfile.classLevel === '10' ? quizData.for10th : quizData.for12th;
  }, [userProfile]);

  const debouncedSuggestStream = useCallback(debounce(suggestStream, 500), []);

  // If quiz was just completed, wait for data
  useEffect(() => {
    if (justCompleted && quizAnswers) {
      setWaitingForData(false);
    }
  }, [justCompleted, quizAnswers]);

  // ... (existing imports)

  // ... (inside ResultsDisplay component)

  useEffect(() => {
    if (quizAnswers && userProfile) {
      const formattedAnswers = quizQuestions.reduce((acc, q) => {
        const answer = quizAnswers[q.id.toString()];
        if (answer) {
          const answerText = `For the question '${q.question}', the user answered '${answer}'.`;
          acc[q.category] = acc[q.category] ? `${acc[q.category]}\n${answerText}` : answerText;
        }
        return acc;
      }, {} as Record<string, string>);

      // --- DETERMINISTIC CALCULATION START ---
      // 1. Prepare inputs for RIASEC calculation
      const questionBank = userProfile.classLevel === '10' ? questionBankFor10th : questionBankFor12th;
      const allQuestions = [
        ...questionBank.baseline,
        ...Object.values(questionBank.deepdive).flat(),
      ];
      const responses: QuizResponse[] = Object.entries(quizAnswers).map(([questionId, answer]) => ({
        questionId,
        answer: answer,
      }));

      // 2. Calculate RIASEC Scores
      const riasecScores = responses.length > 0
        ? calculateRIASECScores(responses, allQuestions)
        : undefined;

      // 3. Get Deterministic Recommendations (Top 3)
      const fixedRecs = getCareerRecommendation(quizAnswers, userProfile, riasecScores);

      // 4. Prepare Constraint for AI
      const fixedRecommendationsConstraint = fixedRecs ? fixedRecs.map(rec => ({
        courseName: rec.courseName,
        stream: rec.stream,
        personalityType: riasecScores
          ? Object.entries(riasecScores).sort(([, a], [, b]) => b - a)[0][0] // Top RIASEC code
          : 'Unknown'
      })) : undefined;
      // --- DETERMINISTIC CALCULATION END ---

      // Check if we already have a persisted result
      if (userProfile.quizResult) {
        setSuggestion(userProfile.quizResult as StreamSuggestionOutput);
        setSuggestionLoading(false);
        return;
      }

      setSuggestionLoading(true);

      (async () => {
        try {
          const result = await debouncedSuggestStream({
            quizAnswers: JSON.stringify(formattedAnswers),
            classLevel: userProfile.classLevel || '12',
            fixedRecommendations: fixedRecommendationsConstraint, // Pass the constraint array
          });
          setSuggestion(result);
          // Persist the result so it doesn't change on reload
          await saveQuizResult(result);
        } catch (error) {
          console.error('Error getting stream suggestion:', error);
        } finally {
          setSuggestionLoading(false);
        }
      })();
    }
  }, [quizAnswers, userProfile, quizQuestions, debouncedSuggestStream, saveQuizResult]);


  const handleRetakeQuiz = async () => {
    try {
      // Reset quiz answers in Firebase and state
      await resetQuizAnswers();

      // Force a small delay to ensure state has cleared before navigating
      // This prevents the quiz page from immediately redirecting back to results
      await new Promise(resolve => setTimeout(resolve, 300));

      // Navigate to quiz page - it will start from beginning since answers are now null
      router.push('/quiz');
    } catch (error) {
      console.error('Error resetting quiz:', error);
    }
  };

  // Loading state handled in render


  if (!userProfile || !quizAnswers) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">No Quiz Data Found</h1>
        <p className="text-muted-foreground">Please complete the quiz to see your results.</p>
        <Button asChild className="mt-4">
          <Link href="/quiz">Go to Quiz</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-4xl font-headline">Your Career Analysis</CardTitle>
            <CardDescription className="text-base">
              AI-powered insights based on your quiz responses
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      {(loading || waitingForData || suggestionLoading) ? (
        <div className="py-12">
          <LoadingAnimation />
        </div>
      ) : suggestion ? (
        <>
          {/* Personality Type */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className={`border-2 ${getPersonalityColor(suggestion.personalityType.type)}`}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="text-6xl">
                    {personalityIcons[suggestion.personalityType.type] || '🌟'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-5 w-5" />
                      <CardTitle className="text-2xl">Your Personality Type</CardTitle>
                    </div>
                    <CardDescription className="text-xl font-semibold">
                      {suggestion.personalityType.type}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-base leading-relaxed">{suggestion.personalityType.description}</p>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Your Key Traits:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {suggestion.personalityType.traits.map((trait, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Career Paths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Award className="h-6 w-6 text-primary" />
                  Top 3 Career Paths for You
                </CardTitle>
                <CardDescription>Ranked by match score based on your profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestion.topCareerPaths.map((path, idx) => (
                  <Card key={idx} className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="default" className="text-lg px-3 py-1">
                              #{idx + 1}
                            </Badge>
                            <CardTitle className="text-xl">{path.name}</CardTitle>
                          </div>
                          <Badge variant="outline">{path.category}</Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-primary">{path.matchScore}%</div>
                          <p className="text-xs text-muted-foreground">Match Score</p>
                        </div>
                      </div>
                      <Progress value={path.matchScore} className="h-2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Pros */}
                        <div className="space-y-2">
                          <h4 className="font-semibold flex items-center gap-2 text-green-600 dark:text-green-400">
                            <TrendingUp className="h-4 w-4" />
                            Advantages
                          </h4>
                          <ul className="space-y-1 text-sm">
                            {path.pros.map((pro, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <ChevronRight className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Cons */}
                        <div className="space-y-2">
                          <h4 className="font-semibold flex items-center gap-2 text-orange-600 dark:text-orange-400">
                            <Info className="h-4 w-4" />
                            Considerations
                          </h4>
                          <ul className="space-y-1 text-sm">
                            {path.cons.map((con, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <ChevronRight className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t">
                        <div className="text-center p-2 bg-secondary/50 rounded-lg">
                          <IndianRupee className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">Starting Salary</p>
                          <p className="font-semibold text-sm">{path.estimatedSalary}</p>
                        </div>
                        <div className="text-center p-2 bg-secondary/50 rounded-lg">
                          <TrendingUp className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">Growth</p>
                          <p className="font-semibold text-sm">{path.growthPotential}</p>
                        </div>
                        <div className="text-center p-2 bg-secondary/50 rounded-lg">
                          <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">Duration</p>
                          <p className="font-semibold text-sm">{path.timeToCareer}</p>
                        </div>
                        <div className="text-center p-2 bg-secondary/50 rounded-lg">
                          <GraduationCap className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">Top Colleges</p>
                          <p className="font-semibold text-sm">{path.topColleges.length}</p>
                        </div>
                      </div>

                      {/* Top Colleges */}
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Top Colleges:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {path.topColleges.map((collegeName, i) => {
                            const collegeData = colleges.find(c => c.name === collegeName) || createGenericCollege(collegeName);

                            return (
                              <CollegeDetailsModal
                                key={i}
                                college={collegeData}
                                trigger={
                                  <Badge variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                                    {collegeName}
                                  </Badge>
                                }
                              />
                            );
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabbed Content: Emerging Fields, Roadmap, Market Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Tabs defaultValue="emerging" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="emerging">
                  <Rocket className="h-4 w-4 mr-2" />
                  Emerging Fields
                </TabsTrigger>
                <TabsTrigger value="roadmap">
                  <Target className="h-4 w-4 mr-2" />
                  Roadmap
                </TabsTrigger>
                <TabsTrigger value="market">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Market Insights
                </TabsTrigger>
              </TabsList>

              <TabsContent value="emerging" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Emerging Fields for You</CardTitle>
                    <CardDescription>Cutting-edge career opportunities aligned with your interests</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {suggestion.emergingFields.map((field, idx) => (
                      <Card key={idx} className="border-l-4 border-l-primary">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Rocket className="h-5 w-5 text-primary" />
                            {field.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div>
                            <h4 className="font-semibold text-sm mb-1">Why this field suits you:</h4>
                            <p className="text-sm text-muted-foreground">{field.relevance}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm mb-1">Future opportunities:</h4>
                            <p className="text-sm text-muted-foreground">{field.futureScope}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="roadmap" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Learning Roadmap</CardTitle>
                    <CardDescription>A personalized path to achieve your career goals</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Badge variant="default">Immediate (3-6 months)</Badge>
                      </h3>
                      <ul className="space-y-2">
                        {suggestion.learningRoadmap.immediate.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Badge variant="secondary">Short-term (1-2 years)</Badge>
                      </h3>
                      <ul className="space-y-2">
                        {suggestion.learningRoadmap.shortTerm.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Badge variant="outline">Long-term Vision (5-10 years)</Badge>
                      </h3>
                      <p className="text-muted-foreground pl-7">{suggestion.learningRoadmap.longTerm}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="market" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Market Insights</CardTitle>
                    <CardDescription>Current trends and future outlook for your field</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Demand Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2">
                            {suggestion.marketInsights.demandTrend.includes('High') || suggestion.marketInsights.demandTrend === 'Growing' ? (
                              <TrendingUp className="h-5 w-5 text-green-600" />
                            ) : (
                              <TrendingDown className="h-5 w-5 text-orange-600" />
                            )}
                            <p className="text-2xl font-bold">{suggestion.marketInsights.demandTrend}</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Competition</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-primary" />
                            <p className="text-2xl font-bold">{suggestion.marketInsights.competitionLevel}</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Essential Skills</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" />
                            <p className="text-2xl font-bold">{suggestion.marketInsights.keySkills.length}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Key Skills to Develop:</h4>
                      <div className="flex flex-wrap gap-2">
                        {suggestion.marketInsights.keySkills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-sm">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Alert>
                      <BarChart3 className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        <strong>Industry Outlook:</strong> {suggestion.marketInsights.industryTrends}
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Overall Recommendation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  Our Recommendation for You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed">{suggestion.overallRecommendation}</p>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="sm:flex-1">
                  <Link href="/one-stop-advisor">
                    Explore Your Career Path
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" onClick={handleRetakeQuiz} className="sm:flex-1">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Retake Quiz
                </Button>
              </CardFooter>
            </Card>
          </motion.div>


        </>
      ) : (
        <Alert>
          <AlertDescription>Unable to generate career suggestions. Please try again later.</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export default function QuizResultsPage() {
  return (
    <Suspense fallback={<SuggestionSkeleton />}>
      <ResultsDisplay />
    </Suspense>
  );
}
