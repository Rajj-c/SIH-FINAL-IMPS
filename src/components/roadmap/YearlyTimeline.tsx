'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Plus, GraduationCap, Code, Briefcase, Award, BookOpen, Calendar, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useRoadmap, RoadmapItem, RoadmapItemType } from './RoadmapContext';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ITEM_ICONS: Record<RoadmapItemType, React.ReactNode> = {
    course: <GraduationCap className="h-4 w-4" />,
    skill: <Code className="h-4 w-4" />,
    project: <Briefcase className="h-4 w-4" />,
    certification: <Award className="h-4 w-4" />,
    internship: <Briefcase className="h-4 w-4" />,
    exam: <BookOpen className="h-4 w-4" />,
};

const ITEM_COLORS: Record<RoadmapItemType, string> = {
    course: 'bg-blue-100 text-blue-700 border-blue-200',
    skill: 'bg-purple-100 text-purple-700 border-purple-200',
    project: 'bg-orange-100 text-orange-700 border-orange-200',
    certification: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    internship: 'bg-green-100 text-green-700 border-green-200',
    exam: 'bg-red-100 text-red-700 border-red-200',
};

export function YearlyTimeline() {
    const { state, addItemToYear, toggleItemStatus, setSelectedYear } = useRoadmap();
    const [newItemText, setNewItemText] = useState('');
    const [newItemType, setNewItemType] = useState<RoadmapItemType>('skill');
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Use selectedYear from context, default to first year if not set (though it should be)
    const selectedYear = state.selectedYear || state.years[0]?.year || 2025;

    const activeYearData = state.years.find(y => y.year === selectedYear);

    const handleAddItem = () => {
        if (!newItemText.trim()) return;
        addItemToYear(selectedYear, {
            type: newItemType,
            title: newItemText,
            isAutomated: false,
        });
        setNewItemText('');
    };

    return (
        <div className="space-y-6">
            {/* Year Selector (Horizontal Scroll) */}
            <div className="relative">
                <ScrollArea className="w-full whitespace-nowrap pb-4">
                    <div className="flex space-x-4 px-1">
                        {state.years.map((yearData, index) => (
                            <button
                                key={yearData.year}
                                onClick={() => setSelectedYear(yearData.year)}
                                className={cn(
                                    "flex flex-col items-center justify-center w-32 h-24 rounded-xl border-2 transition-all duration-300 snap-center shrink-0",
                                    selectedYear === yearData.year
                                        ? "border-primary bg-primary/5 shadow-md scale-105"
                                        : "border-border bg-card hover:border-primary/50 hover:bg-accent"
                                )}
                            >
                                <span className={cn(
                                    "text-2xl font-bold",
                                    selectedYear === yearData.year ? "text-primary" : "text-muted-foreground"
                                )}>
                                    {yearData.year}
                                </span>
                                <span className="text-xs text-muted-foreground mt-1 font-medium truncate w-full px-2 text-center">
                                    {yearData.title}
                                </span>
                                {index < state.years.length - 1 && (
                                    <div className="absolute right-[-1rem] top-1/2 -translate-y-1/2 text-muted-foreground/30">
                                        <ChevronRight className="h-6 w-6" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>

            {/* Active Year Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedYear}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    <Card className="border-2 border-primary/10 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div>
                                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                    <Calendar className="h-6 w-6 text-primary" />
                                    {selectedYear} Roadmap
                                </CardTitle>
                                <p className="text-muted-foreground text-sm mt-1">
                                    {activeYearData?.title}
                                </p>
                            </div>
                            <Badge variant="outline" className="text-lg px-3 py-1">
                                {activeYearData?.items.filter(i => i.status === 'completed').length} / {activeYearData?.items.length} Done
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            {/* Add New Item Input */}
                            <div className="flex gap-2 mb-6 p-4 bg-white dark:bg-slate-900 rounded-lg border shadow-sm">
                                <Select value={newItemType} onValueChange={(v) => setNewItemType(v as RoadmapItemType)}>
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="course">Course</SelectItem>
                                        <SelectItem value="skill">Skill</SelectItem>
                                        <SelectItem value="project">Project</SelectItem>
                                        <SelectItem value="certification">Certificate</SelectItem>
                                        <SelectItem value="internship">Internship</SelectItem>
                                        <SelectItem value="exam">Exam</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input
                                    placeholder="Add a goal (e.g., Learn Python, Finish Project)..."
                                    value={newItemText}
                                    onChange={(e) => setNewItemText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                                    className="flex-1"
                                />
                                <Button onClick={handleAddItem} size="icon">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Items List */}
                            <div className="space-y-3">
                                {activeYearData?.items.length === 0 ? (
                                    <div className="text-center py-10 text-muted-foreground">
                                        <p>No goals set for this year yet.</p>
                                        <p className="text-sm">Add one above to get started!</p>
                                    </div>
                                ) : (
                                    activeYearData?.items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={cn(
                                                "group flex items-center justify-between p-3 rounded-lg border transition-all hover:shadow-md",
                                                item.status === 'completed' ? "bg-slate-50 dark:bg-slate-900/50 opacity-70" : "bg-white dark:bg-slate-900"
                                            )}
                                        >
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <button
                                                    onClick={() => toggleItemStatus(selectedYear, item.id)}
                                                    className={cn(
                                                        "flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors",
                                                        item.status === 'completed'
                                                            ? "bg-green-500 border-green-500 text-white"
                                                            : "border-muted-foreground/30 hover:border-primary"
                                                    )}
                                                >
                                                    {item.status === 'completed' && <CheckCircle2 className="h-4 w-4" />}
                                                </button>

                                                <div className="flex flex-col min-w-0">
                                                    <span className={cn(
                                                        "font-medium truncate transition-all",
                                                        item.status === 'completed' && "line-through text-muted-foreground"
                                                    )}>
                                                        {item.title}
                                                    </span>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge variant="secondary" className={cn("text-[10px] px-1.5 py-0 h-5 gap-1", ITEM_COLORS[item.type])}>
                                                            {ITEM_ICONS[item.type]}
                                                            <span className="capitalize">{item.type}</span>
                                                        </Badge>
                                                        {item.isAutomated && (
                                                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 border-blue-200 text-blue-500">
                                                                Suggested
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                                            // Delete functionality would go here
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
