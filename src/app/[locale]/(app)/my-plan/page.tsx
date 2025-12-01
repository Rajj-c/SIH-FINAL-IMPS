'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { getCareerRecommendation } from '@/lib/career-recommendations';
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

        const rec = getCareerRecommendation(quizAnswers, userProfile, riasecScores);
        if (!rec) return null;

        const course = getCourseById(rec.courseId);
        return course ? { ...rec, course } : null;
    })();

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

            {/* Success Banner */}
            {planSaved && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 bg-green-50 dark:bg-green-950 border-2 border-green-500 rounded-lg p-4"
                >
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                        <div>
                            <p className="font-semibold text-green-900 dark:text-green-100">
                                Career Plan Saved Successfully! 🎉
                            </p>
                            <p className="text-sm text-green-700 dark:text-green-300">
                                Your decision has been recorded. Keep exploring to refine your path!
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Main Recommendation Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
            >
                <Card className="mb-6 border-2 border-primary/30 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                        <div className="flex items-start justify-between">
                            <div>
                                <Badge className="mb-2 bg-primary">
                                    {recommendation.matchScore}% Match
                                </Badge>
                                <CardTitle className="text-2xl mb-2">
                                    {recommendation.course.name}
                                </CardTitle>
                                <CardDescription className="text-base">
                                    {recommendation.course.description}
                                </CardDescription>
                            </div>
                            <Target className="h-12 w-12 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Duration</p>
                                <p className="font-semibold">{recommendation.course.duration}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Average Salary</p>
                                <p className="font-semibold">{recommendation.course.avgSalary}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Demand</p>
                                <p className="font-semibold">{recommendation.course.demand}</p>
                            </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="flex flex-wrap gap-3">
                            <Button
                                onClick={handleSavePlan}
                                size="lg"
                                className="flex items-center gap-2"
                            >
                                <CheckCircle2 className="h-5 w-5" />
                                {selectedPath ? 'Plan Saved ✓' : 'Commit to This Path'}
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link href="/one-stop-advisor">
                                    <TrendingUp className="h-5 w-5 mr-2" />
                                    Explore Alternatives
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Why This Fits You */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Why This Path Fits You</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {recommendation.course.skills.slice(0, 4).map((skill, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + idx * 0.1 }}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <p>{skill}</p>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Next Steps */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <h2 className="text-2xl font-bold mb-4">Your Next Steps</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {nextSteps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                        >
                            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                                <Link href={step.link}>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <step.icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <Badge variant="secondary">{idx + 1}</Badge>
                                        </div>
                                        <CardTitle className="text-lg">{step.title}</CardTitle>
                                        <CardDescription>{step.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-primary hover:underline flex items-center gap-1">
                                            {step.action} →
                                        </p>
                                    </CardContent>
                                </Link>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Actions */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4 justify-center"
            >
                <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Plan (PDF)
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share with Parents
                </Button>
            </motion.div>

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
