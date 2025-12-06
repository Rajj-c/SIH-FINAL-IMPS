'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Target, AlertTriangle } from 'lucide-react';
import { useRoadmap } from './RoadmapContext';
import { Button } from '@/components/ui/button';

export type PlanType = { id: string; name: string };

export function PlanBSelector({ plans }: { plans?: { A: PlanType, B: PlanType, C: PlanType } }) {
    const { state, setCareerGoal, setCourseId } = useRoadmap();

    // Use passed plans or defaults/mock if missing (fallback logic)
    const currentPlans = plans || {
        A: { id: state.courseId, name: state.careerGoal },
        B: { id: 'data-scientist', name: 'Data Scientist' },
        C: { id: 'freelance-dev', name: 'Freelance Developer' }
    };

    const handleSelectPlan = (plan: PlanType) => {
        setCareerGoal(plan.name);
        setCourseId(plan.id);
    };

    return (
        <Card className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-500" />
                    Career Strategy
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                        {/* Plan A */}
                        <div
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${state.courseId === currentPlans.A.id ? 'border-primary bg-primary/5' : 'border-transparent hover:bg-secondary'}`}
                            onClick={() => handleSelectPlan(currentPlans.A)}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-sm flex items-center gap-2">
                                    <Target className="h-4 w-4 text-green-500" /> Plan A (Dream)
                                </span>
                                {state.courseId === currentPlans.A.id && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">Active</span>}
                            </div>
                            <p className="text-sm text-muted-foreground">{currentPlans.A.name}</p>
                        </div>

                        {/* Plan B */}
                        <div
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${state.courseId === currentPlans.B.id ? 'border-primary bg-primary/5' : 'border-transparent hover:bg-secondary'}`}
                            onClick={() => handleSelectPlan(currentPlans.B)}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-sm flex items-center gap-2">
                                    <Shield className="h-4 w-4 text-orange-500" /> Plan B (Backup)
                                </span>
                                {state.courseId === currentPlans.B.id && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">Active</span>}
                            </div>
                            <p className="text-sm text-muted-foreground">{currentPlans.B.name}</p>
                        </div>

                        {/* Plan C */}
                        <div
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${state.courseId === currentPlans.C.id ? 'border-primary bg-primary/5' : 'border-transparent hover:bg-secondary'}`}
                            onClick={() => handleSelectPlan(currentPlans.C)}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-sm flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-yellow-500" /> Plan C (Safety)
                                </span>
                                {state.courseId === currentPlans.C.id && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">Active</span>}
                            </div>
                            <p className="text-sm text-muted-foreground">{currentPlans.C.name}</p>
                        </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full text-xs">
                        Edit Plans
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
