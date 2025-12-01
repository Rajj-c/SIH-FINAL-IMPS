'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, TrendingUp, Award, BarChart3 } from 'lucide-react';
import { CollegeCostCalculator } from '@/components/financial/CollegeCostCalculator';
import { EMICalculator } from '@/components/financial/EMICalculator';
import { ScholarshipMatcher } from '@/components/financial/ScholarshipMatcher';
import { FeeComparisonTool } from '@/components/financial/FeeComparisonTool';

export default function FinancialToolsPage() {
    return (
        <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold font-headline mb-4">
                    Financial Planning Tools
                </h1>
                <p className="text-muted-foreground text-lg">
                    Make informed financial decisions for your child&apos;s education
                </p>
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
                        <CollegeCostCalculator />
                    </TabsContent>

                    <TabsContent value="emi">
                        <EMICalculator />
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
