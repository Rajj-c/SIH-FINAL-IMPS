'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Trophy } from 'lucide-react';
import { useRoadmap } from './RoadmapContext';
import { CAREER_PATHS } from '@/lib/suggested-tasks';
import { motion } from 'framer-motion';

export function SkillGapTracker() {
    const { state, addSkill, toggleSkill } = useRoadmap();
    const careerData = CAREER_PATHS[state.courseId] || CAREER_PATHS['btech-cs'];

    if (!careerData) {
        return (
            <Card className="h-full border-2 border-primary/10">
                <CardContent className="pt-6">
                    <p className="text-muted-foreground text-center">Select a valid career path to see skills.</p>
                </CardContent>
            </Card>
        );
    }

    // Calculate progress
    const requiredSkills = careerData.requiredSkills;
    const acquiredSkillsCount = requiredSkills.filter(skill =>
        state.skills.find(s => s.name === skill && s.acquired)
    ).length;

    const progress = Math.round((acquiredSkillsCount / requiredSkills.length) * 100);

    const handleToggleSkill = (skill: string) => {
        // Ensure skill exists in state first
        addSkill(skill);
        toggleSkill(skill);
    };

    return (
        <Card className="h-full border-2 border-primary/10">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        Skill Gap Analysis
                    </CardTitle>
                    <span className="text-2xl font-bold text-primary">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                    You have {acquiredSkillsCount} out of {requiredSkills.length} required skills for {state.careerGoal}.
                </p>
            </CardHeader>
            <CardContent>
                <div className="space-y-3 mt-2">
                    {requiredSkills.map((skill, index) => {
                        const isAcquired = state.skills.find(s => s.name === skill)?.acquired;

                        return (
                            <motion.div
                                key={skill}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center justify-between group cursor-pointer"
                                onClick={() => handleToggleSkill(skill)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`
                    h-5 w-5 rounded-full flex items-center justify-center border transition-colors
                    ${isAcquired ? 'bg-green-500 border-green-500 text-white' : 'border-muted-foreground/30 group-hover:border-primary'}
                  `}>
                                        {isAcquired ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
                                    </div>
                                    <span className={`text-sm font-medium transition-colors ${isAcquired ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                                        {skill}
                                    </span>
                                </div>
                                {isAcquired && (
                                    <Badge variant="secondary" className="text-[10px] bg-green-100 text-green-700 hover:bg-green-200">
                                        Acquired
                                    </Badge>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
