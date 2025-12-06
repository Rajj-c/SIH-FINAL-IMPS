'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRoadmap } from './RoadmapContext';
import { CAREER_PATHS } from '@/lib/suggested-tasks';

export function DailyQuickWins() {
    const { state } = useRoadmap();
    // Use courseId for lookup, fallback to generic if not found
    const careerData = CAREER_PATHS[state.courseId] || CAREER_PATHS['generic'] || CAREER_PATHS['btech-cs'];

    return (
        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-orange-800">Daily Quick Wins ⚡</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {(careerData.dailyWins || [
                    "Watch a 5-min video on your field",
                    "Read one industry news article",
                    "Update your LinkedIn headline"
                ]).map((task, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-orange-900/80">
                        <input type="checkbox" className="rounded border-orange-400 text-orange-600 focus:ring-orange-500" />
                        <span>{task}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
