'use client';

import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Code2, Database, Layout, Server, Shield, Smartphone, Brain } from 'lucide-react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const teamMembers = [
    {
        name: "Rajeswar",
        role: "Lead Developer",
        icon: Code2,
    },
    {
        name: "MaaTeja",
        role: "UI/UX Designer",
        icon: Layout,
    },
    {
        name: "Karunya",
        role: "AI Specialist",
        icon: Brain,
    },
    {
        name: "Niveditha",
        role: "Frontend Dev",
        icon: Smartphone,
    },
    {
        name: "Harika",
        role: "Research",
        icon: Database,
    },
    {
        name: "Priya",
        role: "Content Strategy",
        icon: Shield,
    },
];

export function TeamSection() {
    const [activeMember, setActiveMember] = useState<number | null>(null);
    const [particles, setParticles] = useState<{ id: number; x: number; y: number; symbol: string }[]>([]);

    const handleMouseEnter = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
        setActiveMember(index);

        // Calculate spawn position relative to the section
        const rect = e.currentTarget.getBoundingClientRect();
        const section = document.getElementById('team');
        if (!section) return;
        const sectionRect = section.getBoundingClientRect();

        const relativeX = rect.left - sectionRect.left + rect.width / 2;
        const relativeY = rect.top - sectionRect.top + rect.height / 2;

        // Spawn particles
        const newParticles = Array.from({ length: 8 }).map((_, i) => ({
            id: Date.now() + i,
            x: relativeX,
            y: relativeY,
            symbol: ["< />", "{ }", "const", "&&", ";", "()", "npm", "git"][Math.floor(Math.random() * 8)]
        }));

        setParticles(prev => [...prev, ...newParticles]);
    };

    const handleMouseLeave = () => {
        setActiveMember(null);
    };

    return (
        <section id="team" className="relative w-full py-24 overflow-hidden bg-emerald-50/50 text-emerald-950 border-t border-emerald-100">
            {/* Light Emerald Theme Background */}
            <div className="absolute inset-0 w-full h-full">
                {/* Base Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/50 via-emerald-50/30 to-white" />

                {/* Animated Mesh Gradient / Aurora Effect - Subtle for Light Theme */}
                <motion.div
                    className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-200/30 blur-[100px]"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                        rotate: [0, 20, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-teal-200/30 blur-[100px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                        rotate: [0, -20, 0]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />

                {/* Floating Developer Symbols (Background) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                    {["< />", "{ }", "const", "npm", "git", "&&", "||", "=>", "try", "catch"].map((symbol, i) => (
                        <motion.div
                            key={i}
                            className="absolute font-mono text-emerald-900/40 font-bold text-xl md:text-2xl whitespace-nowrap"
                            style={{
                                top: Math.random() * 100 + '%',
                                left: Math.random() * 100 + '%',
                            }}
                            animate={{
                                y: [0, -100, 0],
                                opacity: [0, 0.4, 0],
                                scale: [0.8, 1.2, 0.8],
                                rotate: [0, Math.random() * 20 - 10, 0],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: Math.random() * 5,
                            }}
                        >
                            {symbol}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Falling Particles (Foreground) */}
            <AnimatePresence>
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ x: p.x, y: p.y, opacity: 1, scale: 0 }}
                        animate={{
                            x: p.x + (Math.random() - 0.5) * 200, // Spread horizontally
                            y: p.y + 300 + Math.random() * 150,   // Fall down
                            opacity: 0,
                            scale: 1.5,
                            rotate: Math.random() * 360
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 5, ease: "easeOut" }}
                        onAnimationComplete={() => setParticles(prev => prev.filter(item => item.id !== p.id))}
                        className="absolute text-emerald-600 font-mono font-bold text-xl pointer-events-none z-50"
                    >
                        {p.symbol}
                    </motion.div>
                ))}
            </AnimatePresence>

            <div className="container relative z-10 px-4 md:px-6 mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-headline mb-4 text-emerald-950">
                            Built by <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Tech Pioneers</span>
                        </h2>
                        <p className="text-emerald-800/80 max-w-2xl mx-auto text-lg">
                            A passionate team cultivating the future of education.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            onMouseEnter={(e) => handleMouseEnter(index, e)}
                            onMouseLeave={handleMouseLeave}
                            className="cursor-pointer"
                        >
                            <Card className={`text-center h-full border-emerald-100 bg-white/60 backdrop-blur-md transition-all duration-300 group overflow-hidden shadow-sm hover:shadow-lg hover:shadow-emerald-100/50 ${activeMember === index ? 'ring-4 ring-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.6)] scale-105 bg-white/90' : 'hover:-translate-y-2 hover:bg-white/90'}`}>
                                <div className={`absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent transition-opacity duration-300 ${activeMember === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                                <CardContent className="pt-8 pb-6 flex flex-col items-center gap-4 relative z-10">
                                    <div className={`p-4 rounded-full transition-colors duration-300 ring-1 ${activeMember === index ? 'bg-emerald-100 text-emerald-700 ring-emerald-200' : 'bg-emerald-50 group-hover:bg-emerald-100 group-hover:text-emerald-700 ring-emerald-100 group-hover:ring-emerald-200'}`}>
                                        <member.icon className={`h-8 w-8 transition-colors duration-300 ${activeMember === index ? 'text-emerald-700' : 'text-emerald-600/80 group-hover:text-emerald-700'}`} />
                                    </div>
                                    <div>
                                        <h3 className={`font-bold text-lg transition-colors duration-300 ${activeMember === index ? 'text-emerald-900' : 'text-emerald-950 group-hover:text-emerald-900'}`}>{member.name}</h3>
                                        <p className={`text-xs font-medium uppercase tracking-wider mt-1 transition-colors duration-300 ${activeMember === index ? 'text-emerald-700' : 'text-emerald-600/80 group-hover:text-emerald-700'}`}>{member.role}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors hover:underline underline-offset-4">
                                Visit Developer Portfolio <span className="ml-1">→</span>
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-emerald-950">Choose Portfolio Link</DialogTitle>
                                <DialogDescription className="text-emerald-800/80">
                                    Please select one of the links below to view the portfolio.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-4 mt-4">
                                <a
                                    href="https://rajeswar.tech"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col p-4 border rounded-lg hover:bg-emerald-50 transition-colors border-emerald-100 group"
                                >
                                    <span className="font-semibold text-emerald-900 group-hover:text-emerald-700">Main Link (Recommended)</span>
                                    <span className="text-sm text-emerald-600/70">www.rajeswar.tech</span>
                                </a>
                                <a
                                    href="https://rajeswar-tech.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col p-4 border rounded-lg hover:bg-emerald-50 transition-colors border-emerald-100 group"
                                >
                                    <span className="font-semibold text-emerald-900 group-hover:text-emerald-700">Backup Link</span>
                                    <span className="text-sm text-emerald-600/70">
                                        Use this if your college/office WiFi blocks the main link
                                    </span>
                                </a>
                            </div>
                        </DialogContent>
                    </Dialog>
                </motion.div>
            </div>
        </section>
    );
}
