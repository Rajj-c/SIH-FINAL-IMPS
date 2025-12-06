'use client';

import { motion } from 'framer-motion';
import { X, CheckCircle2, ArrowDown, GraduationCap, BookOpen, Trophy, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface LearningStep {
    step: string;
    detail: string;
}

interface LearningRoadmapModalProps {
    isOpen: boolean;
    onClose: () => void;
    careerName: string;
    steps: LearningStep[];
}

export function LearningRoadmapModal({ isOpen, onClose, careerName, steps }: LearningRoadmapModalProps) {
    if (!steps || steps.length === 0) return null;

    const getIcon = (index: number) => {
        if (index === 0) return <GraduationCap className="h-5 w-5" />;
        if (index === steps.length - 1) return <Briefcase className="h-5 w-5" />;
        if (index % 2 === 0) return <BookOpen className="h-5 w-5" />;
        return <Trophy className="h-5 w-5" />;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <span className="text-primary">🚀</span>
                        Your Path to {careerName}
                    </DialogTitle>
                    <DialogDescription>
                        Follow this step-by-step roadmap to achieve your dream career.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-6 relative pl-4 md:pl-8">
                    {/* Vertical Line */}
                    <div className="absolute left-[27px] md:left-[43px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/50 to-primary/10 rounded-full" />

                    <div className="space-y-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                                className="relative flex items-start gap-4 md:gap-6"
                            >
                                {/* Icon Circle */}
                                <div className="relative z-10 flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white dark:bg-slate-950 border-2 border-primary flex items-center justify-center text-primary shadow-sm">
                                    {getIcon(index)}
                                    {/* Connecting Arrow for all but last */}
                                    {index !== steps.length - 1 && (
                                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-primary/30">
                                            <ArrowDown className="h-4 w-4" />
                                        </div>
                                    )}
                                </div>

                                {/* Content Card */}
                                <div className="flex-1 pt-1">
                                    <div className="bg-slate-50 dark:bg-slate-900 border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="font-semibold text-primary text-sm uppercase tracking-wider">
                                                Step {index + 1}: {step.step}
                                            </h3>
                                            {index === 0 && (
                                                <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
                                                    Start Here
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-lg font-medium text-slate-800 dark:text-slate-200">
                                            {step.detail}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Final Success Message */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: steps.length * 0.2 + 0.3 }}
                        className="mt-12 text-center p-6 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl border-2 border-dashed border-primary/20"
                    >
                        <h4 className="text-xl font-bold text-primary mb-2">Goal Achieved! 🎉</h4>
                        <p className="text-muted-foreground">
                            You are now ready to become a successful <span className="font-semibold text-foreground">{careerName}</span>.
                        </p>
                    </motion.div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
