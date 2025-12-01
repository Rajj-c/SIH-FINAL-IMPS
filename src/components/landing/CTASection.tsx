'use client';

import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTASection() {
    return (
        <section className="w-full py-24 bg-primary/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
            <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto space-y-8"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-headline">
                        Ready to Shape Your <span className="text-primary">Future?</span>
                    </h2>
                    <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                        Take the first step towards a confident career choice. Let AI guide you to your perfect path.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-4">
                        <Button asChild size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105 bg-gradient-to-r from-primary to-emerald-600 border-0">
                            <Link href="/signup">
                                Get Started Now
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-2 bg-background hover:bg-secondary/50 transition-all hover:scale-105">
                            <Link href="/parent-zone/signup">Join as a Parent</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
