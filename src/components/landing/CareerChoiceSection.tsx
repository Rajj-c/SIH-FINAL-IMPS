'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import {
    Stethoscope,
    MonitorSmartphone,
    Briefcase,
    Landmark,
    HelpCircle,
    ArrowRight
} from 'lucide-react';

export function CareerChoiceSection({ id }: { id?: string }) {
    const choices = [
        {
            icon: Stethoscope,
            label: "Doctor / Nurse / Healthcare",
            color: "bg-red-500",
            hover: "hover:bg-red-600",
            shadow: "shadow-red-200"
        },
        {
            icon: MonitorSmartphone,
            label: "Engineer / Technology / Computers",
            color: "bg-blue-500",
            hover: "hover:bg-blue-600",
            shadow: "shadow-blue-200"
        },
        {
            icon: Briefcase,
            label: "Business / Commerce / Finance",
            color: "bg-green-500",
            hover: "hover:bg-green-600",
            shadow: "shadow-green-200"
        },
        {
            icon: Landmark,
            label: "Government Jobs / Defense",
            color: "bg-indigo-500",
            hover: "hover:bg-indigo-600",
            shadow: "shadow-indigo-200"
        }
    ];

    const scrollToAwareness = () => {
        const element = document.getElementById('awareness-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id={id} className="py-20 bg-background relative z-10">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold font-headline text-slate-800"
                    >
                        Which future do you imagine for <span className="text-blue-600">yourself?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-lg"
                    >
                        Choose what interests you most. Don't worry if you're unsure undefined we'll help you find your path.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {choices.map((choice, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href="/login">
                                <Card className={`h-48 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 transform hover:scale-105 ${choice.color} ${choice.hover} border-none text-white shadow-xl ${choice.shadow}`}>
                                    <choice.icon size={48} className="opacity-90" />
                                    <h3 className="text-xl md:text-2xl font-bold text-center px-4">{choice.label}</h3>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Not Sure Box */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="max-w-2xl mx-auto mt-12"
                >
                    <div
                        onClick={scrollToAwareness}
                        className="cursor-pointer bg-gradient-to-r from-orange-400 to-amber-500 rounded-2xl p-8 text-white shadow-xl shadow-orange-200 relative overflow-hidden group transition-all hover:shadow-2xl hover:scale-[1.02]"
                    >
                        <div className="absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                            Click here if unsure
                        </div>

                        <div className="flex items-center gap-6 relative z-10">
                            <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm shrink-0">
                                <HelpCircle size={40} className="text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-1">Not interested in studies / Not sure</h3>
                                <p className="text-orange-50 opacity-90 text-sm">We'll help you discover opportunities you never knew existed</p>
                            </div>
                            <ArrowRight className="hidden md:block transition-transform group-hover:translate-x-2" />
                        </div>

                        {/* Decorative circles */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
                        <div className="absolute top-10 left-1/2 w-20 h-20 bg-white/5 rounded-full" />
                    </div>

                    <div className="text-center mt-4 text-xs text-muted-foreground flex items-center justify-center gap-2">
                        <span className="text-yellow-500">✨</span> Tip: You can always change your mind later
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
