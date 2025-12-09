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
    LucideIcon,
    Users
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
    onShareWithParent?: () => void;
}

import { useTranslations } from 'next-intl';

export function QuickActionsGrid({ savedItemsCount, hasCompletedQuiz, onShareWithParent }: QuickActionsGridProps) {
    const t = useTranslations('Dashboard.quickActions');

    const actions: QuickActionItem[] = [
        // Featured: One-Stop Advisor
        {
            id: 'advisor',
            title: t('advisor.title'),
            description: t('advisor.desc'),
            icon: Sparkles,
            link: '/one-stop-advisor',
            featured: true,
            badge: hasCompletedQuiz ? t('advisor.badgeUnlocked') : t('advisor.badgeLocked'),
            color: 'from-primary/20 to-primary/10',
        },
        // Regular actions
        {
            id: 'quiz',
            title: t('quiz.title'),
            description: hasCompletedQuiz
                ? t('quiz.descCompleted')
                : t('quiz.descStart'),
            icon: Lightbulb,
            link: '/quiz',
            badge: hasCompletedQuiz ? t('quiz.badgeCompleted') : t('quiz.badgeStart'),
            color: 'from-amber-500/20 to-amber-500/10',
        },
        {
            id: 'paths',
            title: t('paths.title'),
            description: t('paths.desc'),
            icon: Compass,
            link: '/career-paths',
        },
        {
            id: 'colleges',
            title: t('colleges.title'),
            description: t('colleges.desc'),
            icon: GraduationCap,
            link: '/colleges',
        },
        {
            id: 'chat',
            title: t('chat.title'),
            description: t('chat.desc'),
            icon: MessageCircle,
            link: '/chat',
            badge: t('chat.badge'),
            color: 'from-purple-500/20 to-purple-500/10',
        },
        {
            id: 'plan',
            title: t('plan.title'),
            description: hasCompletedQuiz ? t('plan.descReady') : t('plan.descLocked'),
            icon: CheckCircle2,
            link: '/my-plan',
            badge: hasCompletedQuiz ? t('plan.badgeReady') : t('plan.badgeLocked'),
            color: 'from-green-500/20 to-green-500/10',
        },
        {
            id: 'timeline',
            title: t('timeline.title'),
            description: t('timeline.desc'),
            icon: Calendar,
            link: '/timeline',
        },
        {
            id: 'resources',
            title: t('resources.title'),
            description: t('resources.desc'),
            icon: Library,
            link: '/resources',
        },
        {
            id: 'saved',
            title: t('saved.title'),
            description: t('saved.desc', { count: savedItemsCount }),
            icon: Bookmark,
            link: '/saved',
        },
        // Parent Share Action
        {
            id: 'share',
            title: 'Sync with Parent',
            description: 'Share your progress with your parents',
            icon: Users,
            link: '#', // We'll handle click
            color: 'from-blue-500/20 to-blue-500/10',
            badge: 'New'
        },
    ];

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">{t('title')}</h2>

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
                                                        {t('exploreNow')}
                                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                                    </Link>
                                                </Button>

                                                {!hasCompletedQuiz && (
                                                    <p className="text-xs text-amber-600 mt-2">
                                                        {t('unlockTip')}
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
                        <Card
                            className="h-full hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
                            onClick={(e) => {
                                if (action.id === 'share' && onShareWithParent) {
                                    e.preventDefault();
                                    onShareWithParent();
                                }
                            }}
                        >
                            <Link href={action.link} onClick={(e) => {
                                if (action.id === 'share') e.preventDefault();
                            }}>
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
