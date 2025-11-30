'use client';

import React, { useCallback, useState } from 'react';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    Node,
    Controls,
    Background,
    useReactFlow,
    ReactFlowProvider,
    Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';
import { careerMap, getInitialNodes, CareerNodeData } from '@/lib/dynamic-career-data';
import { Button } from '@/components/ui/button';
import { SmartInsightsPanel } from './SmartInsightsPanel';
import { motion } from 'framer-motion';
import { getCustomCareerPath } from '@/app/actions/career-ai';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles, ZoomIn, ZoomOut, RotateCcw, Search } from 'lucide-react';

import { StartNode, StreamNode, DegreeNode, CareerNode, OpportunityNode } from './CustomNodes';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const nodeTypes = {
    root: StartNode,
    stream: StreamNode,
    degree: DegreeNode,
    industry: DegreeNode,
    opportunity: OpportunityNode,
    role: CareerNode,
    outcome: CareerNode,
    default: StartNode
};

const nodeWidth = 280; // Increased for custom nodes
const nodeHeight = 120; // Increased for custom nodes

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    dagreGraph.setGraph({ rankdir: 'LR' });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        return {
            ...node,
            targetPosition: 'left' as const,
            sourcePosition: 'right' as const,
            position: {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            },
        };
    });

    return { nodes: layoutedNodes, edges };
};

function DynamicFlow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(getInitialNodes('root-10'));
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [selectedNodeData, setSelectedNodeData] = useState<any>(null);
    const [customQuery, setCustomQuery] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedTab, setSelectedTab] = useState<'root-10' | 'root-12'>('root-10');
    const { fitView, zoomIn, zoomOut } = useReactFlow();

    const handleTabChange = (value: string) => {
        const newRootId = value as 'root-10' | 'root-12';
        setSelectedTab(newRootId);
        setNodes(getInitialNodes(newRootId));
        setEdges([]);
        setTimeout(() => fitView({ duration: 800 }), 100);
    };

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onNodeClick = useCallback(
        (event: React.MouseEvent, node: Node) => {
            // 1. Show Insights Panel
            setSelectedNodeData(node.data);

            // 2. Expand Children (Progressive Disclosure)
            const nodeId = node.id;
            const nodeData = careerMap[nodeId];

            if (!nodeData || !nodeData.children) return;

            // Check if children are already present
            const childrenIds = nodeData.children;
            const firstChildId = childrenIds[0];
            const isExpanded = nodes.some((n) => n.id === firstChildId);

            if (isExpanded) return; // Already expanded

            // Create new nodes and edges
            const newNodes: Node[] = childrenIds.map((childId) => {
                const childData = careerMap[childId];
                return {
                    id: childId,
                    type: childData.type, // Use the correct type for custom node rendering
                    data: {
                        subtitle: childData.subtitle || childData.description, // Fallback for nodes without subtitle
                        growth: childData.demand, // Map demand to growth for CareerNode
                        ...childData
                    },
                    position: { x: 0, y: 0 }, // Position will be fixed by dagre
                };
            });

            const newEdges: Edge[] = childrenIds.map((childId) => ({
                id: `${nodeId}-${childId}`,
                source: nodeId,
                target: childId,
                animated: true,
                style: { stroke: '#94a3b8' },
            }));

            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
                [...nodes, ...newNodes],
                [...edges, ...newEdges]
            );

            setNodes(layoutedNodes as Node[]);
            setEdges(layoutedEdges);

            // Smoothly fit view to include new nodes
            setTimeout(() => {
                fitView({ duration: 800, padding: 0.2 });
            }, 100);
        },
        [nodes, edges, setNodes, setEdges, fitView]
    );

    const handleReset = () => {
        setNodes(getInitialNodes(selectedTab));
        setEdges([]);
        setSelectedNodeData(null);
        setTimeout(() => fitView({ duration: 800 }), 100);
    };

    const handleCustomGenerate = async () => {
        if (!customQuery.trim()) return;
        setIsGenerating(true);
        try {
            const result = await getCustomCareerPath(customQuery, 'Class 12 Student');

            if (result && result.nodes && result.nodes.length > 0) {
                // Create a chain of nodes
                const aiNodes: Node[] = result.nodes.map((node: any, index: number) => ({
                    id: node.id,
                    data: { ...node, label: node.label },
                    position: { x: 0, y: 0 },
                    className: '', // Custom node handles styling
                    type: node.type || 'degree', // Default to degree if type missing from AI
                }));

                // Connect them sequentially
                const aiEdges: Edge[] = [];
                for (let i = 0; i < aiNodes.length - 1; i++) {
                    aiEdges.push({
                        id: `ai-${i}-${i + 1}`,
                        source: aiNodes[i].id,
                        target: aiNodes[i + 1].id,
                        animated: true,
                        style: { stroke: '#a855f7' },
                    });
                }

                // If a node was selected, connect the first AI node to it
                if (selectedNodeData && selectedNodeData.id) {
                    aiEdges.unshift({
                        id: `connect-${selectedNodeData.id}-${aiNodes[0].id}`,
                        source: selectedNodeData.id,
                        target: aiNodes[0].id,
                        animated: true,
                        style: { stroke: '#a855f7', strokeDasharray: '5,5' },
                    });
                }

                // Add to graph
                const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
                    [...nodes, ...aiNodes],
                    [...edges, ...aiEdges]
                );

                setNodes(layoutedNodes as Node[]);
                setEdges(layoutedEdges);
                setCustomQuery('');

                setTimeout(() => fitView({ duration: 800, padding: 0.2 }), 100);
            }
        } catch (error) {
            console.error("Failed to generate path", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="h-[80vh] w-full bg-slate-50 dark:bg-slate-950 rounded-2xl border relative overflow-hidden">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                nodeTypes={nodeTypes}
                fitView
                className="bg-slate-50 dark:bg-slate-950"
            >
                <Background color="#94a3b8" gap={20} size={1} className="opacity-20" />
                <Controls showInteractive={false} />

                {/* Tab Selector - Responsive Width */}
                <Panel position="top-center" className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border shadow-lg mx-auto mt-4 w-[95vw] max-w-[350px]">
                    <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
                        <TabsList className="grid grid-cols-2 h-auto gap-1 bg-transparent w-full">
                            <TabsTrigger value="root-10" className="text-[10px] md:text-xs font-bold px-1 py-2">🎓 After Class 10</TabsTrigger>
                            <TabsTrigger value="root-12" className="text-[10px] md:text-xs font-bold px-1 py-2">🏫 After Class 12</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </Panel>

                <Panel position="top-right" className="flex gap-2 mt-16 md:mt-0">
                    <Button variant="outline" size="icon" onClick={handleReset} title="Reset Flow" className="h-8 w-8 md:h-10 md:w-10">
                        <RotateCcw className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                </Panel>

                {/* Desktop Search Panel (Top Left) */}
                <Panel position="top-left" className="hidden md:block bg-white/90 dark:bg-slate-900/90 backdrop-blur p-4 rounded-xl border shadow-sm w-80">
                    <h3 className="font-bold text-primary flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4" />
                        Dynamic Explorer
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4">
                        Click nodes to expand. Or type a dream career below to generate a custom path!
                    </p>

                    <div className="flex gap-2">
                        <Input
                            placeholder="e.g. Space Biologist"
                            value={customQuery}
                            onChange={(e) => setCustomQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCustomGenerate()}
                            className="h-8 text-xs"
                        />
                        <Button
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={handleCustomGenerate}
                            disabled={isGenerating}
                        >
                            {isGenerating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Search className="h-3 w-3" />}
                        </Button>
                    </div>
                </Panel>

                {/* Mobile Search Panel (Bottom Center) */}
                <Panel position="bottom-center" className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur p-3 rounded-t-xl border-t border-x shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] w-full mb-0 pb-6">
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-primary flex items-center gap-2 text-sm">
                                <Sparkles className="h-3 w-3" />
                                AI Career Path
                            </h3>
                        </div>
                        <div className="flex gap-2 w-full">
                            <Input
                                placeholder="Type dream career..."
                                value={customQuery}
                                onChange={(e) => setCustomQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleCustomGenerate()}
                                className="h-9 text-sm flex-1"
                            />
                            <Button
                                size="sm"
                                className="h-9 w-9 p-0 shrink-0"
                                onClick={handleCustomGenerate}
                                disabled={isGenerating}
                            >
                                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                </Panel>
            </ReactFlow>

            {/* Smart Insights Panel */}
            <SmartInsightsPanel
                nodeData={selectedNodeData}
                onClose={() => setSelectedNodeData(null)}
            />
        </div>
    );
}

export function DynamicCareerFlowUpdated() {
    return (
        <ReactFlowProvider>
            <DynamicFlow />
        </ReactFlowProvider>
    );
}
