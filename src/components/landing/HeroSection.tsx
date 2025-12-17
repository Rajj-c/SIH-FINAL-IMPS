'use client';

import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronDown, GraduationCap, Compass, Brain } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface HeroSectionProps {
    title?: string;
    subtitle?: string;
}

export function HeroSection({ title, subtitle }: HeroSectionProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Particle Constellation Logic
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouse = { x: -1000, y: -1000 };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(100, 100, 255, 0.5)'; // Blue-ish particles
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const particleCount = Math.min(window.innerWidth / 10, 100); // Responsive count
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();

                // Connect to mouse
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(100, 100, 255, ${1 - distance / 150})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }

                // Connect to nearby particles
                particles.forEach(other => {
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(100, 100, 255, ${(1 - distance / 100) * 0.2})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        window.addEventListener('resize', resize);
        canvas.addEventListener('mousemove', handleMouseMove);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-between overflow-hidden bg-background">
            {/* Canvas Background - Increased Opacity */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-60 pointer-events-auto"
            />

            {/* Gradient Blobs - Removed for cleaner look */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px]" />
            </div>

            {/* Floating Icons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-[15%] left-[15%] text-primary/50"
                    animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <GraduationCap size={64} />
                </motion.div>
                <motion.div
                    className="absolute top-[20%] right-[15%] text-blue-500/50"
                    animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    <Compass size={64} />
                </motion.div>
                <motion.div
                    className="absolute bottom-[20%] left-[20%] text-purple-500/50"
                    animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                    <Brain size={64} />
                </motion.div>
            </div>

            <div className="flex-1 flex items-center justify-center w-full z-10 pointer-events-none p-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8 max-w-5xl mx-auto text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center rounded-full border border-primary/20 px-4 py-1.5 text-sm font-medium bg-primary/5 backdrop-blur-md text-primary shadow-sm"
                    >
                        <Sparkles className="mr-2 h-4 w-4" />
                        <span className="tracking-wide">AI-Powered Career Guidance</span>
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight font-headline text-slate-800 leading-tight pb-4">
                        Discover Your Future <br />
                        <span className="text-slate-700">Today.</span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-slate-500 text-xl font-medium">
                        One-Stop Personalized Career & Education Advisor
                    </p>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="mb-12 cursor-pointer z-50 group pointer-events-auto"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div
                    onClick={() => document.getElementById('career-choice-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Click Here to Start
                    </span>
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-200 transition-transform group-hover:scale-110">
                        <ChevronDown className="h-8 w-8" />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium opacity-60">Discover Your Path</span>
                </div>
            </motion.div>
        </section >
    );
}
