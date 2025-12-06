'use client';

import { DynamicCareerFlow } from '@/components/career-flow/DynamicCareerFlow';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CareerFlowPage() {
    return (
        <div className="space-y-6 relative">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back
                            </Button>
                        </Link>
                    </div>
                    <h1 className="text-4xl font-bold font-headline bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Visual Career Path Explorer
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Discover your journey from Class 12 to your dream career with interactive flowcharts
                    </p>
                </div>
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <div>
                        <div className="text-sm font-semibold text-primary">Interactive</div>
                        <div className="text-xs text-muted-foreground">Click, Drag, Explore</div>
                    </div>
                </div>
            </div>

            {/* Main Flow Chart */}
            <DynamicCareerFlow courseName="General" stream="Science" />

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">🎯 Clear Path</h3>
                    <p className="text-sm text-blue-700">
                        See exactly what steps you need to take from your current class to your dream career.
                    </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-900 mb-2">💰 Salary Insights</h3>
                    <p className="text-sm text-green-700">
                        Understand the earning potential and job market demand for each career path.
                    </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-900 mb-2">🏢 Top Employers</h3>
                    <p className="text-sm text-purple-700">
                        Know which companies and organizations hire for each career track.
                    </p>
                </div>
            </div>
        </div>
    );
}
