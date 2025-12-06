'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Lock, MapPin, Star, ArrowRight, PlayCircle, Rocket, Flag } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface JourneyStage {
    id: string;
    label: string;
    description: string;
    status: 'completed' | 'current' | 'locked';
    icon: React.ReactNode;
    link?: string;
    color: string;
    gradient: string;
}

interface JourneyMapProps {
    currentStage: 'profile' | 'quiz' | 'advisor' | 'decision';
    hasCompletedQuiz: boolean;
}

export function JourneyMap({ currentStage, hasCompletedQuiz }: JourneyMapProps) {
    const stages: JourneyStage[] = [
        {
            id: 'profile',
            label: 'Profile Setup',
            description: 'Your starting point',
            status: 'completed',
            icon: <Check className="w-6 h-6" />,
            color: 'text-green-500',
            gradient: 'from-green-500/20 to-green-500/5',
        },
        {
            id: 'quiz',
            label: 'Career Quiz',
            description: hasCompletedQuiz ? 'Analysis Complete' : 'Discover your path',
            status: hasCompletedQuiz ? 'completed' : 'current',
            icon: hasCompletedQuiz ? <Check className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />,
            link: hasCompletedQuiz ? undefined : '/quiz',
            color: 'text-blue-500',
            gradient: 'from-blue-500/20 to-blue-500/5',
        },
        {
            id: 'advisor',
            label: 'One-Stop Advisor',
            description: 'AI-powered guidance',
            status: hasCompletedQuiz ? 'current' : 'locked',
            icon: <Star className="w-6 h-6" />,
            link: hasCompletedQuiz ? '/one-stop-advisor' : undefined,
            color: 'text-purple-500',
            gradient: 'from-purple-500/20 to-purple-500/5',
        },
        {
            id: 'decision',
            label: 'Final Decision',
            description: 'Choose your future',
            status: hasCompletedQuiz ? 'locked' : 'locked',
            icon: <Flag className="w-6 h-6" />,
            link: hasCompletedQuiz ? '/my-plan' : undefined,
            color: 'text-orange-500',
            gradient: 'from-orange-500/20 to-orange-500/5',
        },
    ];

    return (
        <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-background to-secondary/20">
            <CardHeader className="pb-8 border-b border-border/50 bg-background/50 backdrop-blur-sm sticky top-0 z-20">
                <CardTitle className="flex items-center gap-3 text-2xl font-headline">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <Rocket className="w-6 h-6 text-primary" />
                    </div>
                    Your Career Adventure Map
                </CardTitle>
            </CardHeader>
            <CardContent className="relative pt-12 pb-12 px-4 md:px-12">
                {/* Connecting Line */}
                <div className="absolute left-8 top-12 bottom-12 w-1 bg-muted -z-10 md:left-1/2 md:-translate-x-1/2 rounded-full overflow-hidden">
                    <motion.div
                        className="w-full bg-gradient-to-b from-primary via-primary/80 to-primary/20"
                        initial={{ height: '0%' }}
                        animate={{ height: `${(stages.findIndex(s => s.status === 'current') + 1) / stages.length * 100}%` }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                </div>

                <div className="space-y-12">
                    {stages.map((stage, idx) => {
                        const isCompleted = stage.status === 'completed';
                        const isCurrent = stage.status === 'current';
                        const isLocked = stage.status === 'locked';

                        return (
                            <motion.div
                                key={stage.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.15 }}
                                className={cn(
                                    "relative flex items-center gap-6 md:gap-16",
                                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                )}
                            >
                                {/* Icon Node */}
                                <div className="relative z-10 flex-shrink-0">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className={cn(
                                            "w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 border-4",
                                            isCompleted ? "bg-primary border-primary text-primary-foreground" :
                                                isCurrent ? "bg-background border-primary text-primary ring-4 ring-primary/20" :
                                                    "bg-muted border-muted-foreground/20 text-muted-foreground"
                                        )}
                                    >
                                        {isLocked ? <Lock className="w-6 h-6" /> : stage.icon}
                                    </motion.div>

                                    {/* Current Indicator Badge */}
                                    {isCurrent && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full shadow-md whitespace-nowrap z-20"
                                        >
                                            YOU ARE HERE
                                        </motion.div>
                                    )}
                                </div>

                                {/* Content Card */}
                                <motion.div
                                    className={cn(
                                        "flex-1 p-6 rounded-2xl border transition-all duration-300 group",
                                        isCurrent ? "bg-background border-primary/50 shadow-lg shadow-primary/5 scale-105" :
                                            isCompleted ? "bg-background/80 border-border/50" : "bg-muted/30 border-transparent",
                                        isLocked && "opacity-60 grayscale"
                                    )}
                                    whileHover={!isLocked ? { y: -5 } : {}}
                                >
                                    <div className={cn(
                                        "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none",
                                        !isLocked && "group-hover:opacity-100",
                                        `bg-gradient-to-br ${stage.gradient}`
                                    )} />

                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className={cn("font-bold text-xl", isCurrent ? "text-primary" : "text-foreground")}>
                                                {stage.label}
                                            </h4>
                                            {isCompleted && <Check className="w-5 h-5 text-green-500" />}
                                        </div>

                                        <p className="text-muted-foreground mb-4">{stage.description}</p>

                                        {stage.link && !isLocked && (
                                            <Button asChild className={cn("w-full md:w-auto", isCurrent ? "shadow-lg shadow-primary/20" : "")} variant={isCurrent ? "default" : "outline"}>
                                                <Link href={stage.link}>
                                                    {isCurrent ? "Continue Mission" : "Review"} <ArrowRight className="ml-2 w-4 h-4" />
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
