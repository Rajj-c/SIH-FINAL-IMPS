'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface JourneyStage {
    id: string;
    label: string;
    sublabel: string;
    status: 'completed' | 'current' | 'locked';
    points: number;
    link?: string;
}

interface JourneyTimelineProps {
    currentStage: 'profile' | 'quiz' | 'advisor' | 'decision';
    hasCompletedQuiz: boolean;
}

export function JourneyTimeline({ currentStage, hasCompletedQuiz }: JourneyTimelineProps) {
    const stages: JourneyStage[] = [
        {
            id: 'profile',
            label: 'Profile',
            sublabel: 'Complete',
            status: 'completed',
            points: 5,
        },
        {
            id: 'quiz',
            label: 'Quiz',
            sublabel: hasCompletedQuiz ? 'Complete' : 'In Progress',
            status: hasCompletedQuiz ? 'completed' : 'current',
            points: 30,
            link: hasCompletedQuiz ? undefined : '/quiz',
        },
        {
            id: 'advisor',
            label: 'One-Stop',
            sublabel: 'Advisor',
            status: hasCompletedQuiz ? 'current' : 'locked',
            points: 20,
            link: hasCompletedQuiz ? '/one-stop-advisor' : undefined,
        },
        {
            id: 'decision',
            label: 'Decide',
            sublabel: 'Final Plan',
            status: hasCompletedQuiz ? 'locked' : 'locked', // Will unlock after visiting advisor
            points: 15,
            link: hasCompletedQuiz ? '/my-plan' : undefined,
        },
    ];

    const currentStageIndex = stages.findIndex(s => s.id === currentStage);

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <span>📍</span>
                            Your Career Discovery Journey
                        </h3>
                    </div>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Desktop View */}
                        <div className="hidden md:block">
                            <div className="flex items-center justify-between mb-8">
                                {stages.map((stage, idx) => (
                                    <div key={stage.id} className="flex flex-col items-center flex-1 relative">
                                        {/* Stage Indicator */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className={cn(
                                                "w-12 h-12 rounded-full flex items-center justify-center mb-3 relative z-10",
                                                stage.status === 'completed' && "bg-primary text-primary-foreground",
                                                stage.status === 'current' && "bg-primary/20 border-2 border-primary",
                                                stage.status === 'locked' && "bg-muted border-2 border-muted-foreground/20"
                                            )}
                                        >
                                            {stage.status === 'completed' ? (
                                                <CheckCircle2 className="h-6 w-6" />
                                            ) : stage.status === 'current' ? (
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 1.2, 1],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                    }}
                                                >
                                                    <Circle className="h-6 w-6 fill-primary" />
                                                </motion.div>
                                            ) : (
                                                <Circle className="h-6 w-6" />
                                            )}
                                        </motion.div>

                                        {/* Star for advisor */}
                                        {stage.id === 'advisor' && (
                                            <motion.div
                                                className="absolute -top-2 -right-2 z-20"
                                                animate={{
                                                    rotate: [0, 360],
                                                    scale: [1, 1.2, 1],
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                }}
                                            >
                                                <Sparkles className="h-6 w-6 text-amber-400 fill-amber-400" />
                                            </motion.div>
                                        )}

                                        {/* Labels */}
                                        <div className="text-center">
                                            <div className={cn(
                                                "font-semibold text-sm",
                                                stage.status !== 'locked' ? "text-foreground" : "text-muted-foreground"
                                            )}>
                                                {stage.label}
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-1">
                                                {stage.sublabel}
                                            </div>
                                        </div>

                                        {/* Connection Line */}
                                        {idx < stages.length - 1 && (
                                            <div className="absolute top-6 left-[50%] w-full h-0.5 -z-10">
                                                <div
                                                    className={cn(
                                                        "h-full transition-all duration-500",
                                                        stage.status === 'completed' ? "bg-primary" : "bg-muted"
                                                    )}
                                                    style={{
                                                        width: stage.status === 'completed' ? '100%' : '0%'
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-muted" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* "You Are Here" indicator */}
                            {currentStageIndex >= 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center text-sm text-primary font-medium"
                                    style={{
                                        marginLeft: `${(currentStageIndex / (stages.length - 1)) * 100}%`,
                                        transform: 'translateX(-50%)'
                                    }}
                                >
                                    <div className="flex items-center justify-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        YOU ARE HERE
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Mobile View */}
                        <div className="md:hidden space-y-4">
                            {stages.map((stage, idx) => (
                                <div key={stage.id} className="flex items-start gap-4">
                                    {/* Indicator */}
                                    <div className="relative">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center",
                                            stage.status === 'completed' && "bg-primary text-primary-foreground",
                                            stage.status === 'current' && "bg-primary/20 border-2 border-primary",
                                            stage.status === 'locked' && "bg-muted border-2 border-muted-foreground/20"
                                        )}>
                                            {stage.status === 'completed' ? (
                                                <CheckCircle2 className="h-5 w-5" />
                                            ) : stage.status === 'current' ? (
                                                <Circle className="h-5 w-5 fill-primary" />
                                            ) : (
                                                <Circle className="h-5 w-5" />
                                            )}
                                        </div>
                                        {idx < stages.length - 1 && (
                                            <div className="absolute top-10 left-5 w-0.5 h-8 bg-muted" />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 pb-4">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold">{stage.label}</p>
                                            {stage.id === 'advisor' && <span>⭐</span>}
                                            {stage.status === 'current' && (
                                                <span className="text-xs text-primary font-medium">YOU ARE HERE</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{stage.sublabel}</p>
                                        <p className="text-xs text-muted-foreground mt-1">+{stage.points} points</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Next Milestone CTA */}
                    {hasCompletedQuiz ? (
                        <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                            <p className="font-semibold mb-2">Next Milestone: Explore One-Stop Advisor (+20 points)</p>
                            <p className="text-sm text-muted-foreground mb-3">
                                You've unlocked personalized career guidance!
                            </p>
                            <Button asChild className="w-full sm:w-auto">
                                <Link href="/one-stop-advisor" className="flex items-center gap-2">
                                    Visit One-Stop Advisor
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="bg-amber-500/5 rounded-lg p-4 border border-amber-500/20">
                            <p className="font-semibold mb-2">Next Milestone: Complete Aptitude Quiz (+30 points)</p>
                            <p className="text-sm text-muted-foreground mb-3">
                                Discover your personality type and unlock personalized recommendations!
                            </p>
                            <Button asChild className="w-full sm:w-auto">
                                <Link href="/quiz" className="flex items-center gap-2">
                                    Continue Quiz
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
