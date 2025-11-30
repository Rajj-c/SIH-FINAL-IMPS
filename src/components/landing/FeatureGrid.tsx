'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, HeartHandshake, Compass, GraduationCap, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        title: "Aptitude Quiz for Students",
        description: "A short quiz to suggest the best academic stream for you based on your interests and skills.",
        icon: Lightbulb,
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        colSpan: "md:col-span-1",
    },
    {
        title: "Guidance Quiz for Parents",
        description: "A dedicated quiz for parents to get AI-driven advice on how to best support their child's career path.",
        icon: HeartHandshake,
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        colSpan: "md:col-span-1",
    },
    {
        title: "Your One-Stop Career Advisor",
        description: "From personalized quizzes to a directory of nearby government colleges, we have everything you need to make informed decisions about your future.",
        icon: Sparkles,
        color: "text-primary",
        bg: "bg-primary/10",
        colSpan: "md:col-span-2 lg:col-span-3",
        highlight: true,
    },
    {
        title: "Course to Career Mapping",
        description: "Visually understand how different courses lead to various career paths and job opportunities.",
        icon: Compass,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        colSpan: "md:col-span-1",
    },
    {
        title: "Govt. College Directory",
        description: "A comprehensive list of nearby government colleges with details on courses, eligibility, and facilities.",
        icon: GraduationCap,
        color: "text-green-500",
        bg: "bg-green-500/10",
        colSpan: "md:col-span-1",
    },
    {
        title: "Timeline Tracker",
        description: "Never miss a deadline with our tracker for admissions, scholarships, and exams.",
        icon: Calendar,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        colSpan: "md:col-span-1",
    },
];

export function FeatureGrid() {
    return (
        <section id="features" className="w-full py-20 bg-secondary/30">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                        Everything You Need
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Comprehensive tools designed to guide you from confusion to clarity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`${feature.colSpan}`}
                        >
                            <Card className={`h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-muted/50 ${feature.highlight ? 'bg-gradient-to-br from-background to-secondary border-primary/20' : 'bg-background'}`}>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className={`p-3 rounded-xl ${feature.bg}`}>
                                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
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
