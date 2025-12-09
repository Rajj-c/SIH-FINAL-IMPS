'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, TrendingUp, Award, BarChart3 } from 'lucide-react';
import { CollegeCostCalculator } from '@/components/financial/CollegeCostCalculator';
import { EMICalculator } from '@/components/financial/EMICalculator';
import { ScholarshipMatcher } from '@/components/financial/ScholarshipMatcher';
import { FeeComparisonTool } from '@/components/financial/FeeComparisonTool';
import { useSearchParams } from 'next/navigation';

import { College } from '@/lib/types';

export default function FinancialToolsPage() {
    const searchParams = useSearchParams();
    const childUid = searchParams.get('child');

    const [suggestedCourse, setSuggestedCourse] = useState<string | undefined>();
    const [courseDuration, setCourseDuration] = useState<number | undefined>();
    const [suggestedCollege, setSuggestedCollege] = useState<College | undefined>();

    useEffect(() => {
        async function fetchChildData() {
            if (!childUid) return;

            try {
                const { getSavedCareerPaths, getSavedColleges } = await import('@/lib/firebase/database');
                const [paths, colleges] = await Promise.all([
                    getSavedCareerPaths(childUid),
                    getSavedColleges(childUid)
                ]);

                if (paths.length > 0) {
                    const topPath = paths[0];
                    setSuggestedCourse(topPath.name); // Corrected property name from 'title' to 'name'

                    // Simple heuristic for duration
                    const titleLower = topPath.name.toLowerCase();
                    if (titleLower.includes('b.tech') || titleLower.includes('engineering')) {
                        setCourseDuration(4);
                    } else if (titleLower.includes('mbbs') || titleLower.includes('medical')) {
                        setCourseDuration(5);
                    } else if (titleLower.includes('mba') || titleLower.includes('m.tech')) {
                        setCourseDuration(2);
                    } else {
                        setCourseDuration(3);
                    }
                }

                if (colleges.length > 0) {
                    setSuggestedCollege(colleges[0]);
                }
            } catch (error) {
                console.error("Error fetching child data:", error);
            }
        }
        fetchChildData();
    }, [childUid]);

    return (
        <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold font-headline mb-4">
                    Financial Planning Tools
                </h1>
                <p className="text-muted-foreground text-lg">
                    Make informed financial decisions for your child&apos;s education
                </p>
                {suggestedCourse && (
                    <div className="mt-2 inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                        Planning for: {suggestedCourse}
                    </div>
                )}
            </div>

            <Tabs defaultValue="cost" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                    <TabsTrigger value="cost" className="flex items-center gap-2">
                        <Calculator className="h-4 w-4" />
                        <span className="hidden sm:inline">Cost Calculator</span>
                        <span className="sm:hidden">Cost</span>
                    </TabsTrigger>
                    <TabsTrigger value="emi" className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        <span className="hidden sm:inline">EMI Calculator</span>
                        <span className="sm:hidden">EMI</span>
                    </TabsTrigger>
                    <TabsTrigger value="scholarships" className="flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        <span className="hidden sm:inline">Scholarships</span>
                        <span className="sm:hidden">Awards</span>
                    </TabsTrigger>
                    <TabsTrigger value="comparison" className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        <span className="hidden sm:inline">Compare Fees</span>
                        <span className="sm:hidden">Compare</span>
                    </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                    <TabsContent value="cost">
                        <CollegeCostCalculator suggestedDuration={courseDuration} suggestedCollege={suggestedCollege} />
                    </TabsContent>

                    <TabsContent value="emi">
                        <EMICalculator suggestedCourse={suggestedCourse} courseDuration={courseDuration} />
                    </TabsContent>

                    <TabsContent value="scholarships">
                        <ScholarshipMatcher />
                    </TabsContent>

                    <TabsContent value="comparison">
                        <FeeComparisonTool />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
