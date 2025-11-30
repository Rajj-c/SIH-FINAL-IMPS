'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
    return (
        <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden bg-background">
            {/* Background Effects */}
            <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.03]" />

            <div className="container relative z-10 px-4 md:px-6 mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6 max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-secondary/50 backdrop-blur-sm">
                        <Sparkles className="mr-2 h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">AI-Powered Career Guidance</span>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none font-headline">
                        Find Your <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Future</span>, Today.
                    </h1>

                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
                        Confused about your career after 10th or 12th? EduPath Navigator provides personalized guidance to help you choose the right stream, course, and college.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <Button asChild size="lg" className="h-12 px-8 text-lg rounded-full shadow-lg hover:shadow-primary/25 transition-all">
                            <Link href="/signup">
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-12 px-8 text-lg rounded-full border-2">
                            <Link href="/parent-zone/signup">Join as a Parent</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
