'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Sparkles,
    Lightbulb,
    Compass,
    GraduationCap,
    Calendar,
    Library,
    Bookmark,
    MessageCircle,
    ArrowRight,
    CheckCircle2,
    LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickActionItem {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    link: string;
    featured?: boolean;
    badge?: string;
    color?: string;
}

interface QuickActionsGridProps {
    savedItemsCount: number;
    hasCompletedQuiz: boolean;
}

export function QuickActionsGrid({ savedItemsCount, hasCompletedQuiz }: QuickActionsGridProps) {
    const actions: QuickActionItem[] = [
        // Featured: One-Stop Advisor
        {
            id: 'advisor',
            title: 'One-Stop Career Advisor',
            description: 'Your complete career guidance hub with personalized recommendations, comparisons, AI guidance & more!',
            icon: Sparkles,
            link: '/one-stop-advisor',
            featured: true,
            badge: hasCompletedQuiz ? 'UNLOCKED' : 'COMPLETE QUIZ TO UNLOCK',
            color: 'from-primary/20 to-primary/10',
        },
        // Regular actions
        {
            id: 'quiz',
            title: 'Aptitude Quiz',
            description: hasCompletedQuiz
                ? 'View your results or retake the quiz'
                : 'Discover your recommended stream',
            icon: Lightbulb,
            link: '/quiz',
            badge: hasCompletedQuiz ? 'COMPLETED' : 'START NOW',
            color: 'from-amber-500/20 to-amber-500/10',
        },
        {
            id: 'paths',
            title: 'Career Paths',
            description: 'Explore 50+ career opportunities available to you',
            icon: Compass,
            link: '/career-paths',
        },
        {
            id: 'colleges',
            title: 'College Directory',
            description: '500+ Government colleges nationwide',
            icon: GraduationCap,
            link: '/colleges',
        },
        {
            id: 'chat',
            title: 'AI Career Advisor',
            description: 'Get instant personalized guidance',
            icon: MessageCircle,
            link: '/chat',
            badge: 'NEW',
            color: 'from-purple-500/20 to-purple-500/10',
        },
        {
            id: 'plan',
            title: 'My Career Plan',
            description: hasCompletedQuiz ? 'Finalize your career decision' : 'Complete quiz to unlock',
            icon: CheckCircle2,
            link: '/my-plan',
            badge: hasCompletedQuiz ? 'READY' : 'LOCKED',
            color: 'from-green-500/20 to-green-500/10',
        },
        {
            id: 'timeline',
            title: 'Timeline Tracker',
            description: 'Important admission and scholarship deadlines',
            icon: Calendar,
            link: '/timeline',
        },
        {
            id: 'resources',
            title: 'Resources',
            description: 'E-books, study materials & scholarship portals',
            icon: Library,
            link: '/resources',
        },
        {
            id: 'saved',
            title: 'Saved Items',
            description: `${savedItemsCount} saved colleges and career paths`,
            icon: Bookmark,
            link: '/saved',
        },
    ];

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">Quick Actions</h2>

            <div className="grid grid-cols-1 gap-6">
                {actions.map((action, idx) => {
                    if (action.featured) {
                        return (
                            <motion.div
                                key={action.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <Card className={cn(
                                    "relative overflow-hidden border-2 transition-all duration-300 max-w-7xl",
                                    hasCompletedQuiz
                                        ? "border-primary/30 shadow-lg hover:shadow-xl hover:border-primary/50"
                                        : "border-amber-500/30 shadow-lg hover:shadow-xl hover:border-amber-500/50"
                                )}>
                                    {/* Background Gradient */}
                                    <div className={cn(
                                        "absolute inset-0 bg-gradient-to-br",
                                        hasCompletedQuiz ? action.color : "from-amber-500/10 to-amber-500/5"
                                    )} />

                                    {/* Featured Badge */}
                                    <div className="absolute top-4 right-4 z-10">
                                        <Badge className={cn(
                                            "px-3 py-1",
                                            hasCompletedQuiz
                                                ? "bg-primary text-white"
                                                : "bg-amber-500 text-white"
                                        )}>
                                            {action.badge}
                                        </Badge>
                                    </div>

                                    <CardContent className="relative p-6">
                                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                            {/* Icon */}
                                            <div className={cn(
                                                "flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center",
                                                hasCompletedQuiz
                                                    ? "bg-primary/20"
                                                    : "bg-amber-500/20"
                                            )}>
                                                <motion.div
                                                    animate={hasCompletedQuiz ? {
                                                        scale: [1, 1.1, 1],
                                                        rotate: [0, 5, -5, 0]
                                                    } : {}}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                >
                                                    <action.icon className={cn(
                                                        "h-8 w-8",
                                                        hasCompletedQuiz ? "text-primary" : "text-amber-500"
                                                    )} />
                                                </motion.div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                                    {action.title}
                                                    <span className="text-xl">⭐</span>
                                                </h3>
                                                <p className="text-sm text-muted-foreground mb-4">
                                                    {action.description}
                                                </p>

                                                <Button
                                                    asChild
                                                    size="lg"
                                                    className="group"
                                                    disabled={!hasCompletedQuiz}
                                                >
                                                    <Link href={action.link} className="flex items-center gap-2">
                                                        Explore Now
                                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                                    </Link>
                                                </Button>

                                                {!hasCompletedQuiz && (
                                                    <p className="text-xs text-amber-600 mt-2">
                                                        💡 Complete the quiz first to unlock this feature!
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    }

                    return null;
                })}
            </div>

            {/* Grid for regular cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {actions.slice(1).map((action, idx) => (
                    <motion.div
                        key={action.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (idx + 1) * 0.05 }}
                        className="h-full"
                    >
                        <Card className="h-full hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                            <Link href={action.link}>
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className={cn(
                                            "w-12 h-12 rounded-lg flex items-center justify-center",
                                            action.color ? `bg-gradient-to-br ${action.color}` : "bg-primary/10"
                                        )}>
                                            <action.icon className="h-6 w-6 text-foreground" />
                                        </div>
                                        {action.badge && (
                                            <Badge variant="secondary" className="text-xs">
                                                {action.badge}
                                            </Badge>
                                        )}
                                    </div>
                                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                        {action.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {action.description}
                                    </p>
                                </CardContent>
                            </Link>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
