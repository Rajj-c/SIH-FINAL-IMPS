'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, Target, Lightbulb } from 'lucide-react';
import { ParentOnboardingData } from '@/lib/types';

interface AptitudeReportCardProps {
    onboardingData?: ParentOnboardingData;
    quizAnswers?: Record<string, string>;
}

// Map interests to strengths and career domains
const INTEREST_TO_STRENGTH_MAP: Record<string, { strength: string; domain: string }> = {
    mathematics: { strength: 'Analytical Thinking & Problem Solving', domain: 'STEM' },
    science: { strength: 'Scientific Curiosity & Research Skills', domain: 'STEM' },
    technology: { strength: 'Technical Aptitude & Innovation', domain: 'Technology' },
    arts: { strength: 'Creativity & Artistic Expression', domain: 'Creative Arts' },
    music: { strength: 'Musical Intelligence & Performance', domain: 'Performing Arts' },
    sports: { strength: 'Physical Coordination & Team Spirit', domain: 'Sports & Fitness' },
    reading: { strength: 'Language Skills & Communication', domain: 'Humanities' },
    business: { strength: 'Entrepreneurial Mindset & Leadership', domain: 'Business' },
    social: { strength: 'Empathy & Social Awareness', domain: 'Social Services' },
    nature: { strength: 'Environmental Awareness & Care', domain: 'Environment' },
    language: { strength: 'Linguistic Ability & Expression', domain: 'Languages' },
    mechanical: { strength: 'Practical Skills & Technical Know-how', domain: 'Engineering' }
};

// Recommend streams based on interests
const getRecommendedStreams = (interests: string[], childClass?: string) => {
    const domains = interests.map(i => INTEREST_TO_STRENGTH_MAP[i]?.domain).filter(Boolean);
    const domainCounts: Record<string, number> = {};

    domains.forEach(domain => {
        domainCounts[domain] = (domainCounts[domain] || 0) + 1;
    });

    const recommendations = [];

    // Science stream
    const stemCount = (domainCounts['STEM'] || 0) + (domainCounts['Technology'] || 0) + (domainCounts['Engineering'] || 0);
    if (stemCount > 0) {
        recommendations.push({
            name: 'Science (PCM - Physics, Chemistry, Maths)',
            confidence: Math.min(stemCount * 30 + 40, 95),
            reason: 'Strong aptitude in technical and analytical subjects. Ideal for engineering, technology, and research careers.',
            forClass: ['10', '11']
        });
    }

    // Medical stream
    const medicalCount = (domainCounts['STEM'] || 0);
    if (interests.includes('science') || interests.includes('social')) {
        recommendations.push({
            name: 'Science (PCB - Physics, Chemistry, Biology)',
            confidence: Math.min(medicalCount * 25 + (interests.includes('social') ? 15 : 0) + 40, 90),
            reason: 'Interest in science and helping others. Perfect for medical, healthcare, and life sciences.',
            forClass: ['10', '11']
        });
    }

    // Commerce stream
    const businessCount = (domainCounts['Business'] || 0);
    if (interests.includes('business') || interests.includes('mathematics')) {
        recommendations.push({
            name: 'Commerce',
            confidence: Math.min(businessCount * 35 + (interests.includes('mathematics') ? 20 : 0) + 40, 92),
            reason: 'Entrepreneurial mindset and numerical skills. Great for business, finance, and accounting careers.',
            forClass: ['10', '11']
        });
    }

    // Arts/Humanities
    const humanitiesCount = (domainCounts['Humanities'] || 0) + (domainCounts['Creative Arts'] || 0) + (domainCounts['Social Services'] || 0);
    if (humanitiesCount > 0 || interests.includes('reading') || interests.includes('arts')) {
        recommendations.push({
            name: 'Arts/Humanities',
            confidence: Math.min(humanitiesCount * 30 + 45, 88),
            reason: 'Creative and communicative strengths. Excellent for arts, literature, social sciences, and civil services.',
            forClass: ['10', '11']
        });
    }

    return recommendations.sort((a, b) => b.confidence - a.confidence).slice(0, 3);
};

// Get skills to improve based on interests
const getSkillsToImprove = (interests: string[]) => {
    const skills = [];

    if (!interests.includes('mathematics') && !interests.includes('technology')) {
        skills.push('Basic Mathematics & Logical Reasoning');
    }

    if (!interests.includes('reading') && !interests.includes('language')) {
        skills.push('Communication & Writing Skills');
    }

    if (!interests.includes('social') && !interests.includes('business')) {
        skills.push('Teamwork & Leadership');
    }

    if (!interests.includes('technology')) {
        skills.push('Computer & Digital Literacy');
    }

    return skills.length > 0 ? skills.slice(0, 3) : ['Well-rounded development', 'Time management', 'Exam preparation strategies'];
};

export function AptitudeReportCard({ onboardingData, quizAnswers }: AptitudeReportCardProps) {
    if (!onboardingData || !onboardingData.childInterests || onboardingData.childInterests.length === 0) {
        return (
            <Card className="border-2">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                            <Brain className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <CardTitle>Child's Aptitude & Interest Report</CardTitle>
                            <CardDescription>Understanding your child's strengths</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground text-center py-8">
                        Complete the onboarding to see your child's aptitude report
                    </p>
                </CardContent>
            </Card>
        );
    }

    const { childInterests, childClass, childName } = onboardingData;

    // Generate strengths from interests
    const strengths = childInterests
        .map(interest => INTEREST_TO_STRENGTH_MAP[interest]?.strength)
        .filter(Boolean)
        .slice(0, 4);

    // Get recommended streams
    const recommendedStreams = getRecommendedStreams(childInterests, childClass);

    // Get skills to improve
    const skillsToImprove = getSkillsToImprove(childInterests);

    // Calculate overall confidence (average of top 2 streams)
    const overallConfidence = recommendedStreams.length > 0
        ? Math.round((recommendedStreams[0].confidence + (recommendedStreams[1]?.confidence || recommendedStreams[0].confidence)) / 2)
        : 70;

    return (
        <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                        <Brain className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <CardTitle>
                            {childName ? `${childName}'s` : "Child's"} Aptitude & Interest Report
                        </CardTitle>
                        <CardDescription>Based on interests and profile</CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Overall Confidence */}
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Career Readiness Confidence
                        </h4>
                        <span className="text-2xl font-bold text-purple-600">{overallConfidence}%</span>
                    </div>
                    <Progress value={overallConfidence} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                        Based on interests alignment with career paths
                    </p>
                </div>

                {/* Strengths */}
                <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        Key Strengths
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {strengths.map((strength, idx) => (
                            <Badge key={idx} variant="secondary" className="text-sm py-1.5 px-3">
                                ✓ {strength}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Recommended Streams */}
                <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-orange-500" />
                        Recommended Streams
                    </h4>
                    <div className="space-y-3">
                        {recommendedStreams.map((stream, idx) => (
                            <div key={idx} className="p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
                                <div className="flex items-start justify-between mb-2">
                                    <h5 className="font-medium text-sm">{stream.name}</h5>
                                    <Badge variant={idx === 0 ? 'default' : 'outline'} className="text-xs">
                                        {stream.confidence}% Match
                                    </Badge>
                                </div>
                                <Progress value={stream.confidence} className="h-1.5 mb-2" />
                                <p className="text-xs text-muted-foreground">{stream.reason}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills to Develop */}
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold mb-2 text-sm">💡 Areas for Additional Development</h4>
                    <ul className="space-y-1">
                        {skillsToImprove.map((skill, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                                <span className="text-blue-500 mt-0.5">•</span>
                                {skill}
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
