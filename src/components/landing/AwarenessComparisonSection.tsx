'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function AwarenessComparisonSection() {
    const withoutAwareness = [
        { icon: XCircle, text: "Low-paying jobs", color: "text-red-500" },
        { icon: XCircle, text: "Miss low-fee colleges", color: "text-red-500" },
        { icon: XCircle, text: "Confused about future", color: "text-red-500" },
        { icon: XCircle, text: "Depend on luck", color: "text-red-500" },
        { icon: XCircle, text: "Miss scholarships", color: "text-red-500" },
    ];

    const withAwareness = [
        { icon: CheckCircle2, text: "Choose courses that suit you", color: "text-green-500" },
        { icon: CheckCircle2, text: "Get job placement help", color: "text-green-500" },
        { icon: CheckCircle2, text: "ITI/Polytechnic options", color: "text-green-500" },
        { icon: CheckCircle2, text: "Stable salary early", color: "text-green-500" },
        { icon: CheckCircle2, text: "Access benefits & scholarships", color: "text-green-500" },
    ];

    return (
        <section id="awareness-section" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-green-50/50 skew-x-12 translate-x-32" />
            <div className="absolute top-0 left-0 w-1/3 h-full bg-red-50/50 -skew-x-12 -translate-x-32" />

            <div className="container px-4 relative z-10 mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block bg-blue-100 text-blue-700 font-semibold px-4 py-1.5 rounded-full text-sm mb-4"
                    >
                        It's okay to be confused
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold font-headline text-slate-800 mb-4">
                        Many successful people were just like you in school
                    </h2>
                    <p className="text-slate-600 text-lg flex items-center justify-center gap-2">
                        <span>✨</span> But before you leave, see what opportunities you may miss without awareness.
                    </p>
                </div>

                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-slate-900">Two Paths, Your Choice</h3>
                    <p className="text-muted-foreground">See the difference awareness can make</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Without Awareness Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="p-8 h-full bg-red-50/50 border-red-100 shadow-lg shadow-red-100/50 hover:shadow-xl transition-shadow relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-red-400" />
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-red-100 rounded-full text-red-600">
                                    <XCircle size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-red-800">Without Awareness</h3>
                            </div>
                            <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-4">
                                What you risk missing out on
                            </p>
                            <div className="space-y-3">
                                {withoutAwareness.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-red-100 shadow-sm">
                                        <item.icon size={18} className={item.color} />
                                        <span className="text-slate-700 font-medium">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>

                    {/* With Awareness Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="p-8 h-full bg-green-50/50 border-green-100 shadow-lg shadow-green-100/50 hover:shadow-xl transition-shadow relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-green-100 rounded-full text-green-600">
                                    <CheckCircle2 size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-green-800">With Awareness</h3>
                            </div>
                            <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-4">
                                Opportunities waiting for you
                            </p>
                            <div className="space-y-3">
                                {withAwareness.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-100 shadow-sm">
                                        <item.icon size={18} className={item.color} />
                                        <span className="text-slate-700 font-medium">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                </div>

                <div className="text-center mt-12">
                    <p className="text-green-700 font-bold text-lg">
                        Simple choice. Big difference. ✨
                    </p>
                </div>
            </div>
        </section>
    );
}
