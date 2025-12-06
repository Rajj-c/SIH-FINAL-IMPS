'use client';

import { CareerFlowChart } from '@/components/career-flow/CareerFlowChart';
import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { useState } from 'react';
import { SmartInsightsPanel } from '@/components/career-flow/SmartInsightsPanel';

interface AllPathsProps {
    streamFilter?: string;
    userClass?: string;
    userStream?: string;
    recommendedCourseId?: string;
}

export function AllPaths({ streamFilter, userClass, userStream, recommendedCourseId }: AllPathsProps) {
    const defaultStream = streamFilter ?
        (streamFilter.includes('science') ? 'science' :
            streamFilter.includes('commerce') ? 'commerce' :
                streamFilter.includes('art') ? 'arts' : undefined)
        : undefined;

    const [selectedNode, setSelectedNode] = useState<any>(null);

    const handleNodeClick = (nodeData: any) => {
        setSelectedNode(nodeData);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[700px]">
            {/* Main Chart Area */}
            <div className={`transition-all duration-300 ${selectedNode ? 'lg:w-[65%]' : 'w-full'}`}>
                <CareerFlowChart
                    onNodeClick={handleNodeClick}
                    viewMode="all"
                    suggestedStream={defaultStream}
                    userClass={userClass}
                    userStream={userStream}
                    recommendedCourseId={recommendedCourseId}
                />
            </div>

            {/* Side Panel for Insights */}
            <SmartInsightsPanel
                nodeData={selectedNode}
                onClose={() => setSelectedNode(null)}
            />
        </div>
    );
}
