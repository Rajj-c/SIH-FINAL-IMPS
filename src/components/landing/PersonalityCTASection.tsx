'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import { Lightbulb, Rocket, Target, ArrowRight } from 'lucide-react';

export function PersonalityCTASection() {
    return (
        <section className="py-24 bg-gradient-to-b from-purple-50/50 to-white relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-100/30 blur-[100px] rounded-full pointer-events-none" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold font-headline text-slate-800 mb-6 leading-tight">
                        Want to see careers that match your <span className="text-purple-600">personality?</span>
                    </h2>
                    <p className="text-slate-500 text-lg">
                        Find your path undefined even if studies are not your strength
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                    <Card
                        icon={Lightbulb}
                        color="text-yellow-500"
                        bg="bg-yellow-50"
                        title="Your Talent Matters"
                        desc="Everyone has unique strengths. We'll help you discover yours."
                    />
                    <Card
                        icon={Rocket}
                        color="text-red-500"
                        bg="bg-red-50"
                        title="Start Small, Dream Big"
                        desc="Every successful person started somewhere. Today is your day."
                    />
                    <Card
                        icon={Target}
                        color="text-blue-500"
                        bg="bg-blue-50"
                        title="No Pressure, Just Progress"
                        desc="Take it one step at a time. We're here to guide you."
                    />
                </div>

                <div className="text-center space-y-8">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href="/login">
                            <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg px-10 py-8 rounded-full shadow-xl shadow-green-200 gap-2">
                                <span className="mr-1">✨</span> Start Your Journey Now <ArrowRight size={20} />
                            </Button>
                        </Link>
                    </motion.div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xs font-semibold text-slate-500">
                        <span className="flex items-center gap-1 text-green-600"><CheckIcon /> Free to explore</span>
                        <span className="hidden md:inline text-slate-300">•</span>
                        <span className="flex items-center gap-1 text-green-600"><CheckIcon /> No commitment needed</span>
                        <span className="hidden md:inline text-slate-300">•</span>
                        <span className="flex items-center gap-1 text-green-600"><CheckIcon /> Start anytime</span>
                    </div>

                    <div className="text-[10px] text-slate-400 flex justify-center gap-4">
                        <span>• Personalized career matches</span>
                        <span>• Expert guidance</span>
                        <span>• Real success stories</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Card({ icon: Icon, title, desc, color, bg }: any) {
    return (
        <div className={`p-6 rounded-2xl border border-slate-100 shadow-sm ${bg} text-center flex flex-col items-center`}>
            <div className={`p-3 bg-white rounded-full shadow-sm mb-4 ${color}`}>
                <Icon size={24} />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
        </div>
    )
}

function CheckIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
        </svg>
    )
}
