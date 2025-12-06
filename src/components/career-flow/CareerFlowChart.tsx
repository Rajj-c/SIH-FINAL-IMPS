'use client';

import { useCallback, useState, useEffect } from 'react';
import {
    ReactFlow,
    Background,
    useNodesState,
    useEdgesState,
    Node,
    Edge,
    useReactFlow,
    ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { StartNode, StreamNode, DegreeNode, CareerNode } from './CustomNodes';
import { careerFlows } from '@/lib/career-flow-data';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Info, Sparkles, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const nodeTypes = {
    startNode: StartNode,
    streamNode: StreamNode,
    degreeNode: DegreeNode,
    careerNode: CareerNode,
};

interface CareerFlowChartProps {
    onNodeClick?: (nodeData: any) => void;
    suggestedStream?: 'science' | 'commerce' | 'arts';
    viewMode?: 'suggested' | 'all';
    userClass?: string;
    userStream?: string;
    recommendedCourseId?: string;
}

function FlowChartContent({ onNodeClick, suggestedStream, viewMode, userClass, userStream, recommendedCourseId }: CareerFlowChartProps) {
    const [selectedStream, setSelectedStream] = useState<'class10' | 'science' | 'commerce' | 'arts'>('class10');
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const { fitView, zoomIn, zoomOut } = useReactFlow();

    // Initialize based on props
    useEffect(() => {
        if (viewMode === 'suggested' && suggestedStream) {
            setSelectedStream(suggestedStream);
        } else if (viewMode === 'all') {
            // Logic for Default View based on Class 12
            if (userClass === '12' && userStream) {
                const streamMap: Record<string, 'science' | 'commerce' | 'arts'> = {
                    'science': 'science',
                    'commerce': 'commerce',
                    'arts': 'arts'
                };

                // Flexible matching for stream name (e.g. "Science (PCM)" -> "science")
                const normalizedStream = userStream.toLowerCase();
                let foundStream: 'science' | 'commerce' | 'arts' | undefined;

                if (normalizedStream.includes('science')) foundStream = 'science';
                else if (normalizedStream.includes('commerce')) foundStream = 'commerce';
                else if (normalizedStream.includes('art') || normalizedStream.includes('humanit')) foundStream = 'arts';

                if (foundStream) {
                    setSelectedStream(foundStream);
                } else {
                    setSelectedStream('class10'); // Fallback
                }
            } else {
                setSelectedStream('class10');
            }
        }
    }, [viewMode, suggestedStream, userClass, userStream]);

    // Update nodes/edges when stream changes
    useEffect(() => {
        const flowData = careerFlows[selectedStream];
        if (!flowData) return;

        let currentNodes = flowData.nodes;
        const currentEdges = flowData.edges;

        // Visual Highlighting Logic for Recommended Course
        if (recommendedCourseId) {
            currentNodes = currentNodes.map(node => {
                // Check if this node is the recommended one (fuzzy match or direct ID)
                // We check both ID and Label for robustness
                const isRecommended =
                    node.id === recommendedCourseId ||
                    node.data.label === recommendedCourseId ||
                    (node.data.label && typeof node.data.label === 'string' &&
                        (node.data.label as string).toLowerCase().includes(recommendedCourseId.toLowerCase()));

                if (isRecommended) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            isRecommended: true // Flag for CustomNodes
                        }
                    };
                }
                return node;
            });
        }

        setNodes(currentNodes);
        setEdges(currentEdges);

        // Fit view after a short delay to allow rendering
        setTimeout(() => fitView({ duration: 800 }), 100);
    }, [selectedStream, setNodes, setEdges, fitView, recommendedCourseId]);

    const handleStreamChange = useCallback((stream: 'class10' | 'science' | 'commerce' | 'arts') => {
        setSelectedStream(stream);
    }, []);

    const onNodeClickInternal = useCallback((event: React.MouseEvent, node: Node) => {
        if (onNodeClick) {
            onNodeClick(node.data);
        }
    }, [onNodeClick]);

    return (
        <div className="w-full h-full relative group">
            {/* Floating Controls */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {/* Stream Selector - Only show if NOT in suggested mode or if user wants to explore */}
                <div className="bg-white/90 dark:bg-black/90 backdrop-blur-md p-1.5 rounded-xl border shadow-lg">
                    <Tabs value={selectedStream} onValueChange={(v) => handleStreamChange(v as any)}>
                        <TabsList className={`grid h-auto gap-1 bg-transparent ${userClass === '12' ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
                            {userClass !== '12' && (
                                <TabsTrigger value="class10" className="text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                                    🎓 10th
                                </TabsTrigger>
                            )}
                            <TabsTrigger value="science" className="text-xs data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
                                🔬 Sci
                            </TabsTrigger>
                            <TabsTrigger value="commerce" className="text-xs data-[state=active]:bg-amber-100 data-[state=active]:text-amber-700">
                                💼 Comm
                            </TabsTrigger>
                            <TabsTrigger value="arts" className="text-xs data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
                                🎨 Arts
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
                <div className="bg-white/90 dark:bg-black/90 backdrop-blur-md p-2 rounded-lg border shadow-lg flex flex-col gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => zoomIn({ duration: 300 })}>
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => zoomOut({ duration: 300 })}>
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => fitView({ duration: 300 })}>
                        <Maximize className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Flow Chart */}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClickInternal}
                nodeTypes={nodeTypes as any}
                fitView
                minZoom={0.2}
                maxZoom={2}
                attributionPosition="bottom-left"
                className="bg-slate-50 dark:bg-slate-950"
            >
                <Background color="#94a3b8" gap={20} size={1} className="opacity-20" />

            </ReactFlow>

            {/* Overlay for Suggested Mode */}
            <AnimatePresence>
                {viewMode === 'suggested' && selectedStream === suggestedStream && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute top-4 right-4 z-10"
                    >
                        <div className="bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                            <Sparkles className="h-4 w-4 animate-pulse" />
                            <span className="text-sm font-medium">Recommended Path</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function CareerFlowChart(props: CareerFlowChartProps) {
    return (
        <ReactFlowProvider>
            <div className="w-full h-[600px] md:h-[700px] border rounded-xl overflow-hidden shadow-sm bg-white dark:bg-slate-950">
                <FlowChartContent {...props} />
            </div>
        </ReactFlowProvider>
    );
}
