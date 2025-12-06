'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, HeartHandshake, Compass, GraduationCap, Calendar, Sparkles, Brain, Languages } from 'lucide-react';
import { motion } from 'framer-motion';

import { useTranslations } from 'next-intl';

export function FeatureGrid() {
    const t = useTranslations('FeatureGrid');

    const features = [
        {
            title: t('features.roadmap.title'),
            description: t('features.roadmap.desc'),
            icon: Compass,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            colSpan: "md:col-span-1",
        },
        {
            title: t('features.alignment.title'),
            description: t('features.alignment.desc'),
            icon: HeartHandshake,
            color: "text-pink-500",
            bg: "bg-pink-500/10",
            colSpan: "md:col-span-1",
        },
        {
            title: t('features.colleges.title'),
            description: t('features.colleges.desc'),
            icon: GraduationCap,
            color: "text-green-500",
            bg: "bg-green-500/10",
            colSpan: "md:col-span-1",
        },
        {
            title: t('features.solution.title'),
            description: t('features.solution.desc'),
            icon: Sparkles,
            color: "text-primary",
            bg: "bg-primary/10",
            colSpan: "md:col-span-2 lg:col-span-3",
            highlight: true,
        },
        {
            title: t('features.assessment.title'),
            description: t('features.assessment.desc'),
            icon: Brain,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            colSpan: "md:col-span-1",
        },
        {
            title: t('features.multilingual.title'),
            description: t('features.multilingual.desc'),
            icon: Languages,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            colSpan: "md:col-span-2",
        },
    ];

    return (
        <section id="features" className="w-full py-24 bg-background relative overflow-hidden">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-headline mb-4">
                            {t('title')}
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
                            {t('subtitle')}
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`${feature.colSpan} group`}
                        >
                            <Card className={`h-full border-0 relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 
                                ${feature.highlight
                                    ? 'bg-gradient-to-br from-primary/90 to-emerald-600 text-primary-foreground shadow-xl shadow-primary/20'
                                    : 'bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-white/20 dark:border-white/10 hover:border-primary/30'
                                }`}>

                                {/* Hover Glow Effect */}
                                {!feature.highlight && (
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                                )}

                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <div className={`p-3 rounded-2xl transition-transform duration-500 group-hover:scale-110 ${feature.highlight ? 'bg-white/20 text-white' : feature.bg}`}>
                                        <feature.icon className={`h-6 w-6 ${feature.highlight ? 'text-white' : feature.color}`} />
                                    </div>
                                    <CardTitle className={`text-xl font-bold ${feature.highlight ? 'text-white' : ''}`}>
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className={`leading-relaxed ${feature.highlight ? 'text-white/90' : 'text-muted-foreground'}`}>
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
