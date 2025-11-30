'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Code, Palette, Brain, Rocket, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const teamMembers = [
    { name: "Rajeswar", role: "Lead Developer", icon: Code },
    { name: "MaaTeja", role: "UI/UX Designer", icon: Palette },
    { name: "Karunya", role: "AI Specialist", icon: Brain },
    { name: "Niveditha", role: "Frontend Dev", icon: Rocket },
    { name: "Harika", role: "Research", icon: Users },
    { name: "Priya", role: "Content Strategy", icon: Heart },
];

export function TeamSection() {
    return (
        <section id="team" className="w-full py-20 bg-background border-t">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline mb-4">
                        Built by Tech Pioneers
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A passionate team dedicated to transforming education guidance through technology.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="text-center hover:border-primary/50 transition-colors h-full">
                                <CardContent className="pt-6 flex flex-col items-center gap-3">
                                    <div className="p-3 rounded-full bg-secondary text-primary">
                                        <member.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{member.name}</h3>
                                        <p className="text-xs text-muted-foreground">{member.role}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a href="https://rajeswar.tech" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4">
                        Visit Developer Portfolio
                    </a>
                </div>
            </div>
        </section>
    );
}
