'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle } from 'lucide-react';
import { useRoadmap } from './RoadmapContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
// @ts-ignore
import confetti from 'canvas-confetti';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

export function MonthlyPlanner() {
    const { state, updateMonthlyMilestone, addMonthlyMilestone } = useRoadmap();
    const [newTask, setNewTask] = React.useState('');
    const [isAdding, setIsAdding] = React.useState(false);

    const handleCheck = (index: number, completed: boolean) => {
        updateMonthlyMilestone(index, completed);
        if (completed) {
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#3b82f6', '#10b981', '#f59e0b']
            });
        }
    };

    const handleAdd = () => {
        if (newTask.trim()) {
            addMonthlyMilestone(newTask);
            setNewTask('');
            setIsAdding(false);
        }
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center justify-between">
                    <span>Monthly Milestones</span>
                    <span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                        {state.monthlyMilestones.filter(m => m.completed).length}/{state.monthlyMilestones.length} Done
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 overflow-y-auto">
                {state.monthlyMilestones.map((milestone, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                        <button
                            onClick={() => handleCheck(index, !milestone.completed)}
                            className={cn(
                                "mt-0.5 flex-shrink-0 transition-transform active:scale-90",
                                milestone.completed ? "text-green-500" : "text-muted-foreground hover:text-primary"
                            )}
                        >
                            {milestone.completed ? (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                    <CheckCircle2 className="h-5 w-5" />
                                </motion.div>
                            ) : (
                                <Circle className="h-5 w-5" />
                            )}
                        </button>
                        <div className={cn(
                            "flex-1 text-sm transition-all",
                            milestone.completed ? "text-muted-foreground line-through" : "text-foreground"
                        )}>
                            <span className="font-semibold block text-xs text-primary mb-0.5">{milestone.month}</span>
                            {milestone.task}
                        </div>
                    </div>
                ))}

                {isAdding ? (
                    <div className="flex gap-2 items-center mt-2 animate-in fade-in slide-in-from-bottom-2">
                        <Input
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Enter milestone..."
                            className="h-8 text-sm"
                            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                            autoFocus
                        />
                        <Button size="sm" onClick={handleAdd} className="h-8 px-3">Add</Button>
                        <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)} className="h-8 px-2">✕</Button>
                    </div>
                ) : (
                    <Button
                        variant="outline"
                        className="w-full text-xs border-dashed text-muted-foreground hover:text-primary mt-2"
                        onClick={() => setIsAdding(true)}
                    >
                        <Plus className="h-3 w-3 mr-1" /> Add New Milestone
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
