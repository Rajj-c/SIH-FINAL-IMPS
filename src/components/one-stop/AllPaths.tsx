'use client';

import { CareerFlowChart } from '@/components/career-flow/CareerFlowChart';
import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface AllPathsProps {
    streamFilter?: string;
}

export function AllPaths({ streamFilter }: AllPathsProps) {
    return (
        <div className="space-y-4">
            {streamFilter && (
                <Card className="p-4 bg-blue-50 dark:bg-blue-950/30 border-blue-200">
                    <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                            <p className="text-sm text-blue-900 dark:text-blue-100">
                                <strong>Filtered View:</strong> Showing career paths for {streamFilter.charAt(0).toUpperCase() + streamFilter.slice(1)} stream based on your quiz results.
                            </p>
                        </div>
                    </div>
                </Card>
            )}

            <CareerFlowChart />
        </div>
    );
}
