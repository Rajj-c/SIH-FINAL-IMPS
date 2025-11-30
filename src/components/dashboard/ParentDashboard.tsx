import { useAuth } from '@/hooks/use-auth';
import { useMemo } from 'react';
import { ParentGuidanceScore } from './ParentGuidanceScore';
import { ParentQuickActions } from './ParentQuickActions';
import { ParentRecommendationsSummary } from './ParentRecommendationsSummary';
import { ParentSavedOverview } from './ParentSavedOverview';
import { AptitudeReportCard } from './AptitudeReportCard';
import { DegreeCoursesExplained } from './DegreeCoursesExplained';
import { AdmissionAlerts } from './AdmissionAlerts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HandHeart, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface ParentDashboardProps {
    aiRecommendation?: {
        suggestedPath: string;
        reasoning: string;
        nextSteps: string[];
    } | null;
}

export function ParentDashboard({ aiRecommendation }: ParentDashboardProps) {
    const { userProfile, savedColleges, savedCareerPaths, parentQuizAnswers } = useAuth();

    const guidanceScore = useMemo(() => {
        let score = 0;
        const breakdown = {
            quizCompleted: false,
            savedItems: 0,
            profileComplete: false,
            resourcesExplored: 0,
        };

        if (parentQuizAnswers && Object.keys(parentQuizAnswers).length > 0) {
            score += 30;
            breakdown.quizCompleted = true;
        }

        const savedCount = savedColleges.length + savedCareerPaths.length;
        score += Math.min(savedCount * 4, 20);
        breakdown.savedItems = savedCount;

        if (userProfile?.name && userProfile?.email) {
            score += 20;
            breakdown.profileComplete = true;
        }

        if (breakdown.quizCompleted && breakdown.savedItems > 0) {
            score += 15;
        }

        // Bonus for onboarding completion
        if (userProfile?.parentOnboarding?.completedAt) {
            score += 10;
        }

        return { score: Math.min(score, 100), breakdown };
    }, [userProfile, parentQuizAnswers, savedColleges, savedCareerPaths]);

    // Extract recommended streams from quiz or onboarding
    const recommendedStreams = useMemo(() => {
        // This would come from AI recommendations in real implementation
        // For now, return empty array
        return [];
    }, [parentQuizAnswers]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold flex items-center gap-3">
                    <HandHeart className="h-10 w-10 text-orange-500" />
                    Welcome, {userProfile?.name}!
                </h1>
                <p className="text-muted-foreground mt-2">
                    {userProfile?.parentOnboarding?.childName
                        ? `Supporting ${userProfile.parentOnboarding.childName}'s educational journey`
                        : "Supporting your child's educational journey"
                    }
                </p>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-orange-500" />
                    Quick Actions
                </h2>
                <ParentQuickActions />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Scores & Info */}
                <div className="space-y-6">
                    <ParentGuidanceScore score={guidanceScore.score} breakdown={guidanceScore.breakdown} />
                    <ParentSavedOverview
                        savedCollegesCount={savedColleges.length}
                        savedCareerPathsCount={savedCareerPaths.length}
                    />
                </div>

                {/* Right Column - AI Recommendations or CTA */}
                <div className="lg:col-span-2">
                    {aiRecommendation ? (
                        <ParentRecommendationsSummary
                            suggestedPath={aiRecommendation.suggestedPath}
                            reasoning={aiRecommendation.reasoning}
                            nextSteps={aiRecommendation.nextSteps}
                        />
                    ) : (
                        <Card className="border-2 border-dashed">
                            <CardHeader>
                                <CardTitle>Get Personalized Guidance</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Complete the guidance quiz to receive AI-powered recommendations
                                </p>
                                <Link href="/parent-zone?tab=quiz">
                                    <Button className="w-full bg-gradient-to-r from-orange-500 to-rose-500">
                                        Take Guidance Quiz
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            {/* 4 Main Dashboard Cards */}
            <div>
                <h2 className="text-2xl font-bold mb-6">Your Personalized Dashboard</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Card 1: Aptitude Report */}
                    <AptitudeReportCard
                        onboardingData={userProfile?.parentOnboarding}
                        quizAnswers={parentQuizAnswers || undefined}
                    />

                    {/* Card 2: Degree Courses */}
                    <DegreeCoursesExplained
                        recommendedStreams={recommendedStreams}
                    />

                    {/* Card 3: Admission Alerts - Full Width */}
                    <div className="lg:col-span-2">
                        <AdmissionAlerts
                            onboardingData={userProfile?.parentOnboarding}
                            recommendedStreams={recommendedStreams}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
