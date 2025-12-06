'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';

export function LoadingAnimation() {
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

    const loadingMessages = [
        { text: "Analyzing profile...", icon: "🔍" },
        { text: "Filtering best courses for brighter future...", icon: "🎓" },
        { text: "Matching with top colleges...", icon: "🏫" },
        { text: "Generating personalized roadmap...", icon: "🚀" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-2xl border-primary/20">
            <CardContent className="flex flex-col items-center justify-center min-h-[400px] space-y-8 py-12">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="text-6xl"
                >
                    {loadingMessages[loadingMessageIndex].icon}
                </motion.div>

                <div className="space-y-4 text-center max-w-md">
                    <motion.h3
                        key={loadingMessageIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-2xl font-bold font-headline text-primary"
                    >
                        {loadingMessages[loadingMessageIndex].text}
                    </motion.h3>
                    <Progress value={(loadingMessageIndex + 1) * 25} className="w-full h-2" />
                </div>
            </CardContent>
        </Card>
    );
}
