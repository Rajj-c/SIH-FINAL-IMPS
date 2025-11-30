'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, Lock, CheckCircle2, BarChart3, MessageCircle, BookOpen, Target, Building2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface OneStopAdvisorHeroProps {
    hasCompletedQuiz: boolean;
    topRecommendation?: {
        name: string;
        matchScore: number;
        stream: string;
    };
    lastAccessed?: string;
}

export function OneStopAdvisorHero({ hasCompletedQuiz, topRecommendation, lastAccessed }: OneStopAdvisorHeroProps) {
    if (hasCompletedQuiz && topRecommendation) {
        return (
            <Card className="relative overflow-hidden border-2 border-primary/20 shadow-2xl">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />

                {/* Featured Badge */}
                <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white px-3 py-1">
                        <Sparkles className="h-3 w-3 mr-1" />
                        RECOMMENDED FOR YOU
                    </Badge>
                </div>

                <CardHeader className="relative pb-3">
                    <div className="flex items-center gap-2">
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Sparkles className="h-6 w-6 text-primary" />
                        </motion.div>
                        <CardTitle className="text-2xl md:text-3xl font-headline">
                            Your Personalized One-Stop Career Advisor
                        </CardTitle>
                    </div>
                    <CardDescription className="text-base mt-2">
                        Based on your quiz results, we've prepared your complete career guidance package!
                    </CardDescription>
                </CardHeader>

                <CardContent className="relative space-y-6">
                    {/* Main Recommendation */}
                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">YOUR TOP RECOMMENDATION</p>
                                <h3 className="text-2xl font-bold">{topRecommendation.name}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{topRecommendation.stream} Stream</p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-primary">{topRecommendation.matchScore}%</div>
                                <p className="text-xs text-muted-foreground">Match</p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${topRecommendation.matchScore}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div>
                        <p className="text-sm font-semibold mb-3">What You'll Get:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {[
                                { icon: Target, text: 'Personalized stream/course recommendations' },
                                { icon: BarChart3, text: 'Top 3 career paths matched to your personality' },
                                { icon: CheckCircle2, text: 'Side-by-side career comparison tools' },
                                { icon: BookOpen, text: 'Complete degree encyclopedia' },
                                { icon: MessageCircle, text: 'AI-powered guidance chatbot' },
                                { icon: Building2, text: 'College recommendations with match scores' },
                            ].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.08, type: "spring", stiffness: 100 }}
                                    className="flex items-center gap-2 group"
                                >
                                    <div className="flex-shrink-0">
                                        <feature.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                                    </div>
                                    <span className="text-sm group-hover:text-primary transition-colors">{feature.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Button asChild size="lg" className="w-full sm:w-auto group relative overflow-hidden">
                            <Link href="/one-stop-advisor" className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5" />
                                Explore Your Career Path
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                        {lastAccessed && (
                            <p className="text-sm text-muted-foreground">
                                💡 Last accessed: {lastAccessed}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Quiz Not Completed - Unlock Screen
    return (
        <Card className="relative overflow-hidden border-2 border-primary/20 shadow-2xl">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-primary/5 to-transparent" />

            {/* Lock Icon Background */}
            <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-5">
                <Lock className="h-64 w-64" />
            </div>

            <CardHeader className="relative text-center pb-3">
                <div className="flex justify-center mb-4">
                    <div className="relative">
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Lock className="h-16 w-16 text-amber-500" />
                        </motion.div>
                        <motion.div
                            className="absolute -top-2 -right-2"
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                            }}
                        >
                            <Sparkles className="h-6 w-6 text-primary" />
                        </motion.div>
                    </div>
                </div>
                <CardTitle className="text-2xl md:text-3xl font-headline">
                    Unlock Your One-Stop Career Advisor
                </CardTitle>
                <CardDescription className="text-base mt-2">
                    Get Your Complete Career Guidance Package!
                </CardDescription>
            </CardHeader>

            <CardContent className="relative space-y-6">
                <p className="text-center font-medium">Take our 10-minute quiz to unlock:</p>

                {/* Feature Icons */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                        { icon: Target, label: 'Stream Recs', color: 'text-blue-500' },
                        { icon: BarChart3, label: 'Career Compare', color: 'text-green-500' },
                        { icon: MessageCircle, label: 'AI Guidance', color: 'text-purple-500' },
                        { icon: BookOpen, label: 'Degree Guide', color: 'text-orange-500' },
                        { icon: Building2, label: 'College Match', color: 'text-pink-500' },
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex flex-col items-center gap-2 p-4 bg-background/50 rounded-lg border border-border"
                        >
                            <feature.icon className={`h-8 w-8 ${feature.color}`} />
                            <span className="text-xs font-medium text-center">{feature.label}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                    {[
                        '✨ Personalized to YOUR interests and strengths',
                        '🎯 Powered by RIASEC personality assessment',
                        '📈 Used by 10,000+ successful students',
                    ].map((benefit, idx) => (
                        <motion.p
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                            className="text-sm text-center"
                        >
                            {benefit}
                        </motion.p>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="flex flex-col items-center gap-3">
                    <Button asChild size="lg" className="w-full sm:w-auto group relative overflow-hidden">
                        <Link href="/quiz" className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5" />
                            Start Quiz & Unlock (10 min)
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                animate={{
                                    x: ['-200%', '200%'],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatDelay: 1,
                                    ease: "easeInOut"
                                }}
                            />
                        </Link>
                    </Button>
                    <motion.p
                        className="text-sm text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        ⭐ Earn +30 points towards Career Readiness Score!
                    </motion.p>
                </div>
            </CardContent>
        </Card>
    );
}
