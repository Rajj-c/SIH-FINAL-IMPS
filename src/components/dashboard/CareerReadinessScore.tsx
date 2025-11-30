'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CareerReadinessScoreProps {
    score: number;
    breakdown: {
        quizCompleted: boolean;
        savedItemsCount: number;
        profileComplete: boolean;
    };
}

export function CareerReadinessScore({ score, breakdown }: CareerReadinessScoreProps) {
    const [displayScore, setDisplayScore] = useState(0);
    const controls = useAnimationControls();

    // Count-up animation for score
    useEffect(() => {
        let startTime: number;
        const duration = 2000; // 2 seconds
        const startScore = 0;
        const endScore = score;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (easeOutCubic)
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentScore = Math.floor(startScore + (endScore - startScore) * easeProgress);

            setDisplayScore(currentScore);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [score]);

    // Pulse animation for high scores
    useEffect(() => {
        if (score >= 80) {
            controls.start({
                scale: [1, 1.05, 1],
                transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            });
        }
    }, [score, controls]);

    const data = [
        {
            name: 'Score',
            value: displayScore,
            fill: score >= 75 ? '#22c55e' : score >= 50 ? '#eab308' : '#ef4444',
        },
    ];

    const getScoreLabel = (score: number) => {
        if (score >= 80) return { text: 'Path Master! 🏆', color: 'text-green-600', description: 'You\'re crushing it!' };
        if (score >= 60) return { text: 'Rising Explorer 🚀', color: 'text-yellow-600', description: 'Great progress!' };
        if (score >= 40) return { text: 'Career Seeker 🔍', color: 'text-orange-600', description: 'Keep going!' };
        return { text: 'Just Starting 🌱', color: 'text-red-600', description: 'Every journey begins somewhere!' };
    };

    const scoreLabel = getScoreLabel(score);

    const suggestions = [];
    if (!breakdown.quizCompleted) suggestions.push({ text: 'Complete the aptitude quiz', link: '/quiz', points: '+30 points' });
    if (breakdown.savedItemsCount < 3) suggestions.push({ text: 'Save colleges and career paths', link: '/colleges', points: '+20 points' });
    if (!breakdown.profileComplete) suggestions.push({ text: 'Complete your profile', link: '/profile', points: '+20 points' });

    const completionPercentage = [
        breakdown.quizCompleted,
        breakdown.savedItemsCount >= 3,
        breakdown.profileComplete
    ].filter(Boolean).length;

    return (
        <Card className="overflow-hidden border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-headline flex items-center gap-2">
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Award className="h-5 w-5 text-primary" />
                        </motion.div>
                        Career Readiness Level
                    </CardTitle>
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                    {completionPercentage}/3 milestones completed
                </p>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Radial Chart with Count-up */}
                    <motion.div
                        className="relative"
                        animate={controls}
                    >
                        <ResponsiveContainer width={180} height={180}>
                            <RadialBarChart
                                cx="50%"
                                cy="50%"
                                innerRadius="70%"
                                outerRadius="100%"
                                barSize={15}
                                data={data}
                                startAngle={90}
                                endAngle={-270}
                            >
                                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                                <RadialBar
                                    background
                                    dataKey="value"
                                    cornerRadius={10}
                                    animationDuration={2000}
                                    animationBegin={0}
                                />
                            </RadialBarChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <motion.div
                                className="text-4xl font-bold"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                                {displayScore}
                            </motion.div>
                            <div className="text-xs text-muted-foreground">/ 100</div>
                        </div>
                    </motion.div>

                    {/* Score Info */}
                    <div className="flex-1 space-y-4 w-full">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className={`text-2xl font-bold ${scoreLabel.color}`}>{scoreLabel.text}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                {scoreLabel.description}
                            </p>
                        </motion.div>

                        {/* Progress Milestones */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-medium">Progress</span>
                                <span className="text-muted-foreground">{Math.round((completionPercentage / 3) * 100)}%</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(completionPercentage / 3) * 100}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                />
                            </div>
                        </div>

                        {/* Suggestions */}
                        {suggestions.length > 0 && (
                            <motion.div
                                className="space-y-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <p className="text-sm font-semibold">Level up:</p>
                                <ul className="space-y-1.5">
                                    {suggestions.map((suggestion, idx) => (
                                        <motion.li
                                            key={idx}
                                            className="text-sm"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1 + idx * 0.1 }}
                                        >
                                            <Link href={suggestion.link} className="text-primary hover:underline flex items-center gap-2 group">
                                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                                                <span>{suggestion.text}</span>
                                                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                                                    {suggestion.points}
                                                </span>
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        {score >= 80 && (
                            <motion.div
                                className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border border-green-200 dark:border-green-800 rounded-lg p-3"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 1.2, type: "spring" }}
                            >
                                <p className="text-sm text-green-800 dark:text-green-200 font-medium flex items-center gap-2">
                                    <span className="text-lg">🎉</span>
                                    <span>Outstanding! You're fully prepared to explore your career options!</span>
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
