'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, BarChart3, Map, BookOpen, MessageCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { getCareerRecommendation, getAlternativeCourses } from '@/lib/career-recommendations';
import { getCourseById, getCoursesByStream } from '@/lib/courses-database';
import { PersonalizedPath } from '@/components/one-stop/PersonalizedPath';
import { CompareCareers } from '@/components/one-stop/CompareCareers';
import { DegreeEncyclopedia } from '@/components/one-stop/DegreeEncyclopedia';
import { AllPaths } from '@/components/one-stop/AllPaths';
import { SmartGuidance } from '@/components/one-stop/SmartGuidance';
import { questionBankFor10th, questionBankFor12th } from '@/lib/quiz/question-bank';
import { calculateRIASECScores } from '@/lib/quiz/riasec-scoring';
import type { RIASECScores, QuizResponse } from '@/lib/quiz/riasec-scoring';
import { OneStopAdvisorHero } from '@/components/dashboard/OneStopAdvisorHero';

function AdvisorContent() {
    const { userProfile, quizAnswers, loading: authLoading } = useAuth();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [recommendation, setRecommendation] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('your-path');
    const [showAllCareers, setShowAllCareers] = useState(false);

    useEffect(() => {
        if (authLoading) return;

        if (!quizAnswers || !userProfile) {
            // Don't redirect, just stop loading to show locked state
            setLoading(false);
            return;
        }

        // Calculate RIASEC scores from quiz answers
        const questionBank = userProfile.classLevel === '10' ? questionBankFor10th : questionBankFor12th;
        const allQuestions = [
            ...questionBank.baseline,
            ...Object.values(questionBank.deepdive).flat(),
        ];

        // Convert quiz answers to QuizResponse format
        const responses: QuizResponse[] = Object.entries(quizAnswers).map(([questionId, answer]) => ({
            questionId,
            answer: answer,
        }));

        // Calculate RIASEC scores
        const riasecScores: RIASECScores | undefined = responses.length > 0
            ? calculateRIASECScores(responses, allQuestions)
            : undefined;

        // Get AI recommendation with RIASEC scores
        const recs = getCareerRecommendation(quizAnswers, userProfile, riasecScores);
        if (recs && recs.length > 0) {
            setRecommendation(recs[0]);
        }
        setLoading(false);
    }, [quizAnswers, userProfile, router, authLoading]);

    if (loading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-96 w-full" />
            </div>
        );
    }

    if (!recommendation) {
        return (
            <div className="container mx-auto py-8">
                <OneStopAdvisorHero hasCompletedQuiz={false} />
            </div>
        );
    }

    const recommendedCourse = getCourseById(recommendation.courseId);
    if (!recommendedCourse) return null;

    const streamCourses = getCoursesByStream(recommendation.stream);
    const alternativeCourses = streamCourses.filter(c => c.id !== recommendation.courseId);

    return (
        <div className="space-y-6">
            {/* Header */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/quiz/results">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Results
                            </Link>
                        </Button>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center">
                            <Sparkles className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-4xl font-headline">Your One-Stop Career Advisor</CardTitle>
                            <CardDescription className="text-base">
                                Everything you need to make informed career decisions - personalized for you
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Main Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
                    <TabsTrigger value="your-path" className="flex flex-col gap-1 py-3">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-xs">Your Path</span>
                    </TabsTrigger>
                    <TabsTrigger value="compare" className="flex flex-col gap-1 py-3">
                        <BarChart3 className="h-4 w-4" />
                        <span className="text-xs">Compare</span>
                    </TabsTrigger>
                    <TabsTrigger value="all-paths" className="flex flex-col gap-1 py-3">
                        <Map className="h-4 w-4" />
                        <span className="text-xs">All Paths</span>
                    </TabsTrigger>
                    <TabsTrigger value="degrees" className="flex flex-col gap-1 py-3">
                        <BookOpen className="h-4 w-4" />
                        <span className="text-xs">Degrees</span>
                    </TabsTrigger>
                    <TabsTrigger value="guidance" className="flex flex-col gap-1 py-3">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-xs">Guidance</span>
                    </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                    <TabsContent value="your-path" className="mt-0">
                        <PersonalizedPath
                            recommendedCourse={recommendedCourse}
                            matchScore={recommendation.matchScore}
                            reasons={recommendation.whyRecommended}
                            stream={recommendation.stream}
                            onExploreMore={() => setShowAllCareers(true)}
                        />

                        {showAllCareers && (
                            <div className="mt-8 pt-8 border-t">
                                <h3 className="text-2xl font-bold mb-4">
                                    Explore More {recommendation.stream.charAt(0).toUpperCase() + recommendation.stream.slice(1)} Careers
                                </h3>
                                <p className="text-muted-foreground mb-6">
                                    Click "Add to Compare" to compare any of these careers with your recommended course
                                </p>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {alternativeCourses.map(course => (
                                        <Card key={course.id} className="hover:border-primary transition-colors">
                                            <CardHeader>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="text-3xl">{course.icon}</span>
                                                    <div>
                                                        <CardTitle className="text-lg">{course.name}</CardTitle>
                                                        <CardDescription className="text-xs">{course.duration}</CardDescription>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-full mt-3"
                                                    onClick={() => setActiveTab('compare')}
                                                >
                                                    Add to Compare
                                                </Button>
                                            </CardHeader>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="compare" className="mt-0">
                        <CompareCareers
                            recommendedCourse={recommendedCourse}
                            availableCourses={alternativeCourses}
                        />
                    </TabsContent>

                    <TabsContent value="all-paths" className="mt-0">
                        <AllPaths
                            streamFilter={recommendation.stream}
                            userClass={userProfile?.classLevel}
                            userStream={userProfile?.studentStream}
                            recommendedCourseId={recommendation?.courseId}
                        />
                    </TabsContent>

                    <TabsContent value="degrees" className="mt-0">
                        <DegreeEncyclopedia streamFilter={recommendation.stream} />
                    </TabsContent>

                    <TabsContent value="guidance" className="mt-0">
                        <SmartGuidance
                            recommendedCourse={{
                                name: recommendedCourse.name,
                                stream: recommendation.stream,
                            }}
                        />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}

export default function OneStopAdvisorPage() {
    return (
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <AdvisorContent />
        </Suspense>
    );
}
