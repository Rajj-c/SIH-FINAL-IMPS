'use client';

import React from 'react';
import { RoadmapProvider } from './RoadmapContext';
import { YearlyTimeline } from './YearlyTimeline';
import { TaskSuggester } from './TaskSuggester';
import { MonthlyPlanner } from './MonthlyPlanner';
import { CalendarDays, Map, Target, Sparkles, GitBranch } from 'lucide-react';
import { DynamicCareerFlow } from '@/components/career-flow/DynamicCareerFlow';
import { SkillGapTracker } from './SkillGapTracker';
import { PlanBSelector } from './PlanBSelector';
import { DreamWall } from './DreamWall';
import { ParentSync } from './ParentSync';
import { SmartAlerts } from './SmartAlerts';
import { ExportPDF } from './ExportPDF';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DailyQuickWins } from './DailyQuickWins';
import { CareerFlowMap } from './CareerFlowMap';

export type PlanType = { id: string; name: string };

function RoadmapContent() {
    return (
        <div className="space-y-8">
            {/* Top Section: Timeline & Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Timeline Area (2/3 width) */}
                <div className="lg:col-span-2 space-y-6">
                    <YearlyTimeline />
                </div>

                {/* Sidebar Area (1/3 width) - Recommendations */}
                <div className="space-y-6">
                    <TaskSuggester />
                </div>
            </div>

            {/* Bottom Section: Daily Wins & Monthly Planner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DailyQuickWins />
                <MonthlyPlanner />
            </div>
        </div>
    );
}

export function InteractiveRoadmap({
    careerGoal,
    courseId,
    plans
}: {
    careerGoal?: string,
    courseId?: string,
    plans?: { A: PlanType, B: PlanType, C: PlanType }
}) {
    const [activeTab, setActiveTab] = React.useState('flow');

    const tabs = [
        { id: 'flow', label: 'Flow Map', icon: GitBranch },
        { id: 'timeline', label: 'Timeline', icon: CalendarDays },
        { id: 'skills', label: 'Skills', icon: Target },
        { id: 'vision', label: 'Vision', icon: Sparkles },
    ];

    return (
        <RoadmapProvider initialGoal={careerGoal} initialCourseId={courseId}>
            <div className="space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Your Future Diary 📖</h2>
                        <p className="text-muted-foreground">
                            Plan your journey step by step. Own your future.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <ParentSync />
                        <ExportPDF />
                        <SmartAlerts />
                    </div>
                </div>

                {/* Custom Animated Tabs */}
                <div className="relative">
                    <div className="flex items-center gap-8 border-b border-border/50 pb-1 overflow-x-auto">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "relative flex items-center gap-2 px-2 py-3 text-sm font-medium transition-colors hover:text-primary/80 whitespace-nowrap",
                                        isActive ? "text-primary" : "text-muted-foreground"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {tab.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Tab Content with Transitions */}
                <div className="min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'flow' && (
                                <CareerFlowMap courseName={careerGoal} />
                            )}

                            {activeTab === 'timeline' && <RoadmapContent />}

                            {activeTab === 'skills' && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-2">
                                        <SkillGapTracker />
                                    </div>
                                    <div>
                                        <PlanBSelector plans={plans} />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'vision' && <DreamWall />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </RoadmapProvider>
    );
}
