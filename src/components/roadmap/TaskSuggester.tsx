'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Plus, Check } from 'lucide-react';
import { useRoadmap } from './RoadmapContext';
import { CAREER_PATHS } from '@/lib/suggested-tasks';
import { motion } from 'framer-motion';

export function TaskSuggester() {
    const { state, addItemToYear } = useRoadmap();
    // Use courseId for lookup, fallback to generic if not found
    const careerData = CAREER_PATHS[state.courseId] || CAREER_PATHS['generic'] || CAREER_PATHS['btech-cs'];

    // Calculate current year offset based on selected year
    const startYear = state.years[0]?.year || 2025;
    const selectedYear = state.selectedYear || startYear;
    const currentYearOffset = selectedYear - startYear;

    const currentYearData = careerData.years.find(y => y.yearOffset === currentYearOffset);

    const handleAddSuggestion = (task: any) => {
        addItemToYear(selectedYear, {
            type: task.type,
            title: task.title,
            isAutomated: true,
        });
    };

    return (
        <div className="space-y-6">
            {/* Career Goal Header */}
            <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 p-4 rounded-xl border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Goal: {state.careerGoal}
                    </h3>
                    <Badge variant="secondary" className="bg-white/50">Year {currentYearOffset + 1}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                    {careerData.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {careerData.requiredSkills.slice(0, 4).map(skill => (
                        <Badge key={skill} variant="outline" className="bg-white/50 text-xs">
                            {skill}
                        </Badge>
                    ))}
                    <Badge variant="outline" className="bg-white/50 text-xs">+{careerData.requiredSkills.length - 4} more</Badge>
                </div>
            </div>

            {/* Suggested Tasks List */}
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">Recommended for {selectedYear}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {currentYearData?.tasks.map((task, idx) => {
                        // Check if already added to the SELECTED year
                        const activeYearItems = state.years.find(y => y.year === selectedYear)?.items || [];
                        const isAdded = activeYearItems.some(i => i.title === task.title);

                        return (
                            <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30 border border-transparent hover:border-primary/20 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm text-lg">
                                        {task.type === 'course' ? '🎓' : task.type === 'skill' ? '💻' : '📌'}
                                    </div>
                                    <div className="text-sm font-medium">{task.title}</div>
                                </div>
                                <Button
                                    size="sm"
                                    variant={isAdded ? "ghost" : "outline"}
                                    className={isAdded ? "text-green-600" : ""}
                                    disabled={isAdded}
                                    onClick={() => handleAddSuggestion(task)}
                                >
                                    {isAdded ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                </Button>
                            </div>
                        );
                    })}
                </CardContent>
            </Card>
        </div>
    );
}
