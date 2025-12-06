'use client';

// Force rebuild


import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { getCareerRecommendation, getAlternativeCourses } from '@/lib/career-recommendations';
import { getCourseById } from '@/lib/courses-database';
import { questionBankFor10th, questionBankFor12th } from '@/lib/quiz/question-bank';
import { calculateRIASECScores } from '@/lib/quiz/riasec-scoring';
import {
    CheckCircle2,
    Target,
    Calendar,
    BookOpen,
    GraduationCap,
    TrendingUp,
    Download,
    Share2,
    Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExamCalendar } from '@/components/government/ExamCalendar';
import { JobRoles } from '@/components/government/JobRoles';
import { InteractiveRoadmap } from '@/components/roadmap/InteractiveRoadmap';

export default function MyCareerPlanPage() {
    const { userProfile, quizAnswers, savedColleges, savedCareerPaths } = useAuth();
    const router = useRouter();
    const [selectedPath, setSelectedPath] = useState<string | null>(null);
    const [planSaved, setPlanSaved] = useState(false);

    // Get recommendation
    const recommendation = (() => {
        if (!quizAnswers || !userProfile || Object.keys(quizAnswers).length === 0) {
            return null;
        }

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

        const recs = getCareerRecommendation(quizAnswers, userProfile, riasecScores);
        if (!recs || recs.length === 0) return null;

        const rec = recs[0];
        const course = getCourseById(rec.courseId);
        return course ? { ...rec, course } : null;
    })();

    const alternativeCourses = recommendation
        ? getAlternativeCourses(recommendation.course.id, recommendation.stream)
        : [];

    const plans = recommendation ? {
        A: { id: recommendation.course.id, name: recommendation.course.name },
        B: { id: alternativeCourses[0]?.id || 'generic', name: alternativeCourses[0]?.fullName || 'Alternative Path 1' },
        C: { id: alternativeCourses[1]?.id || 'generic', name: alternativeCourses[1]?.fullName || 'Alternative Path 2' }
    } : undefined;

    useEffect(() => {
        if (!quizAnswers || Object.keys(quizAnswers).length === 0) {
            router.push('/quiz');
        }
    }, [quizAnswers, router]);

    if (!recommendation || !userProfile) {
        return null;
    }

    const handleSavePlan = () => {
        // In a real app, this would save to database
        setSelectedPath(recommendation.course.id);
        setPlanSaved(true);

        // Show success for 2 seconds
        setTimeout(() => {
            setPlanSaved(false);
        }, 2000);
    };

    const nextSteps = [
        {
            title: 'Research Entrance Exams',
            description: recommendation.course.entranceExams.join(', ') || 'No entrance exam required',
            icon: BookOpen,
            action: 'View exam details',
            link: '/resources#exams'
        },
        {
            title: 'Explore Top Colleges',
            description: `${savedColleges.length} colleges saved`,
            icon: GraduationCap,
            action: 'Browse colleges',
            link: '/colleges'
        },
        {
            title: 'Plan Your Timeline',
            description: 'Track admission deadlines',
            icon: Calendar,
            action: 'View timeline',
            link: '/timeline'
        },
        {
            title: 'Get AI Guidance',
            description: 'Ask questions about your path',
            icon: Sparkles,
            action: 'Chat with advisor',
            link: '/chat'
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-bold font-headline mb-2 flex items-center gap-3">
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                    My Career Plan
                </h1>
                <p className="text-muted-foreground text-lg">
                    Based on your quiz results and exploration, here's your personalized career roadmap.
                </p>
            </motion.div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="roadmap" className="w-full">
                <TabsList className="w-full max-w-md grid grid-cols-2 mb-8 mx-auto">
                    <TabsTrigger value="roadmap">Future Diary</TabsTrigger>
                    <TabsTrigger value="government">Government Careers</TabsTrigger>
                </TabsList>

                <TabsContent value="roadmap" className="space-y-6">
                    <InteractiveRoadmap
                        careerGoal={recommendation.course.name}
                        courseId={recommendation.course.id}
                        plans={plans}
                    />
                </TabsContent>

                <TabsContent value="government" className="space-y-8">
                    <div className="bg-secondary/10 p-6 rounded-xl border border-secondary mb-6">
                        <h2 className="text-2xl font-bold mb-2">Government Career Pathways</h2>
                        <p className="text-muted-foreground">
                            Explore prestigious opportunities in the public sector. From Civil Services to Defense, find the path that serves the nation.
                        </p>
                    </div>

                    <ExamCalendar />
                    <Separator />
                    <JobRoles />
                </TabsContent>
            </Tabs>

            {/* Back to Dashboard */}
            <div className="mt-8 text-center">
                <Button variant="ghost" asChild>
                    <Link href="/dashboard">
                        ← Back to Dashboard
                    </Link>
                </Button>
            </div>
        </div>
    );
}
