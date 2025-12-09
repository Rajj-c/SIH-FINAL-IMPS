'use client';

import React, { useCallback, useEffect, useState, useMemo } from 'react';
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
    Panel,
    useReactFlow,
    ReactFlowProvider,
    MarkerType,
    Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';
import { CareerNode, StartNode, StreamNode, DegreeNode } from './CustomNodes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Maximize, Search, Sparkles, RefreshCw, ChevronRight, Zap } from 'lucide-react';
import { careerFlows } from '@/lib/career-flow-data';
import { SmartInsightsPanel } from './SmartInsightsPanel';
import { getCustomCareerPath } from '@/app/actions/career-ai';
import { useToast } from '@/hooks/use-toast';

// --- mappings ---
// Map Class 10 node IDs to Class 12/Stream node IDs to bridge the flows
const BRIDGE_NODES: Record<string, string> = {
    'engineering-entrance': 'engineering',
    'medical-entrance': 'medical',
    'ca-foundation': 'professional', // approximate mapping
    'law-entrance': 'law',
};

const nodeTypes = {
    custom: CareerNode,
    careerNode: CareerNode,
    startNode: StartNode,
    streamNode: StreamNode,
    degreeNode: DegreeNode,
};

// Layout configurations
const nodeWidth = 280;
const nodeHeight = 160;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'LR') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const newNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        return {
            ...node,
            targetPosition: Position.Left,
            sourcePosition: Position.Right,
            position: {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            },
        };
    });

    return { nodes: newNodes, edges };
};

function CareerFlowContent({ courseName, stream }: { courseName: string, stream: string }) {
    // --- State ---
    const [activeTab, setActiveTab] = useState<'class10' | 'class12'>('class12');
    const [searchQuery, setSearchQuery] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedNodeData, setSelectedNodeData] = useState<any>(null);
    const { toast } = useToast();

    // Core Graph State
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

    const { fitView } = useReactFlow();

    // --- Helpers ---

    // Load initial state based on Tab
    const loadInitialState = useCallback((type: 'class10' | 'class12') => {
        let initialNodes: Node[] = [];
        let initialEdges: Edge[] = [];

        if (type === 'class10') {
            // Load Class 10 Root + Stream Options (Level 1 expansion)
            const root = careerFlows.class10.nodes.find(n => n.id === 'start');
            if (root) {
                initialNodes = [root];
                // Auto-expand root for better UX
                const rootEdges = careerFlows.class10.edges.filter(e => e.source === 'start');
                const childIds = rootEdges.map(e => e.target);
                const children = careerFlows.class10.nodes.filter(n => childIds.includes(n.id));

                initialNodes = [...initialNodes, ...children];
                initialEdges = [...rootEdges];
                setExpandedNodes(new Set(['start']));
            }
        } else {
            // Class 12 - Load Stream Roots
            // We create a virtual "Class 12" root for better UX
            const virtualRoot: Node = {
                id: 'class12-root',
                type: 'startNode',
                position: { x: 0, y: 0 },
                data: { label: 'After Class 12', subtitle: 'Select Stream', icon: '🎓' }
            };

            // Stream Starters - Reuse nodes from Class 10 flow to ensure ID connectivity
            const sciStart = careerFlows.class10.nodes.find(n => n.id === 'science-stream');
            const commStart = careerFlows.class10.nodes.find(n => n.id === 'commerce-stream');
            const artsStart = careerFlows.class10.nodes.find(n => n.id === 'arts-stream');

            initialNodes = [virtualRoot];
            if (sciStart) initialNodes.push({ ...sciStart, position: { x: 0, y: 0 } });
            if (commStart) initialNodes.push({ ...commStart, position: { x: 0, y: 0 } });
            if (artsStart) initialNodes.push({ ...artsStart, position: { x: 0, y: 0 } });

            // Virtual Edges - Connect Root to Streams
            initialEdges = [
                { id: 'e-root-sci', source: 'class12-root', target: 'science-stream', animated: true, style: { stroke: '#3b82f6' } },
                { id: 'e-root-comm', source: 'class12-root', target: 'commerce-stream', animated: true, style: { stroke: '#f59e0b' } },
                { id: 'e-root-arts', source: 'class12-root', target: 'arts-stream', animated: true, style: { stroke: '#8b5cf6' } },
            ];



            setExpandedNodes(new Set(['class12-root']));
        }

        const layouted = getLayoutedElements(initialNodes, initialEdges);
        setNodes(layouted.nodes);
        setEdges(layouted.edges);
        setTimeout(() => fitView({ duration: 800 }), 100);
    }, [fitView, setNodes, setEdges]);


    // Effect to handle Tab Change
    useEffect(() => {
        loadInitialState(activeTab);
    }, [activeTab, loadInitialState]);


    // Handle Node Click (Expansion + Details)
    const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        // 1. Show Details
        setSelectedNodeData(node.data);

        // 2. Toggle Logic
        if (expandedNodes.has(node.id)) {
            // --- COLLAPSE LOGIC ---
            const getDescendants = (parentId: string, currentEdges: Edge[]): string[] => {
                const children = currentEdges
                    .filter(e => e.source === parentId)
                    .map(e => e.target);

                let descendants = [...children];
                children.forEach(childId => {
                    descendants = [...descendants, ...getDescendants(childId, currentEdges)];
                });
                return descendants;
            };

            const descendantsToRemove = getDescendants(node.id, edges);

            // Remove nodes and edges
            setNodes(nds => nds.filter(n => !descendantsToRemove.includes(n.id)));
            setEdges(eds => eds.filter(e => !descendantsToRemove.includes(e.source) && !descendantsToRemove.includes(e.target)));

            // Update expanded state
            setExpandedNodes(prev => {
                const next = new Set(prev);
                next.delete(node.id);
                descendantsToRemove.forEach(id => next.delete(id));
                return next;
            });

            // Re-layout slightly to fix positions if needed (optional, but good for cleanup)
            // For now, simpler is better: just remove.

        } else {
            // --- EXPAND LOGIC ---

            // Determine which flow/ID to look up
            const lookupId = BRIDGE_NODES[node.id] || node.id;

            let newEdges: Edge[] = [];
            let newNodes: Node[] = [];

            // Helper to search in a flow
            const findChildren = (flow: any, sourceId: string) => {
                const relevantEdges = flow.edges.filter((e: Edge) => e.source === sourceId);
                const targetIds = relevantEdges.map((e: Edge) => e.target);
                const relevantNodes = flow.nodes.filter((n: Node) => targetIds.includes(n.id));
                return { edges: relevantEdges, nodes: relevantNodes };
            };

            // Search in ALL flows for children
            Object.values(careerFlows).forEach(flow => {
                const result = findChildren(flow, lookupId);
                if (lookupId !== node.id && result.edges.length > 0) {
                    const remappedEdges = result.edges.map((e: Edge) => ({
                        ...e,
                        id: `e-${node.id}-${e.target}`, // New unique ID
                        source: node.id // Connect to the actual clicked node
                    }));
                    newEdges = [...newEdges, ...remappedEdges];
                } else {
                    newEdges = [...newEdges, ...result.edges];
                }
                newNodes = [...newNodes, ...result.nodes];
            });

            if (newNodes.length > 0) {
                const uniqueNewNodes = newNodes.filter(n => !nodes.some(existing => existing.id === n.id));
                const updatedNodes = [...nodes, ...uniqueNewNodes];
                const updatedEdges = [...edges, ...newEdges];

                const layouted = getLayoutedElements(updatedNodes, updatedEdges);
                setNodes(layouted.nodes);
                setEdges(layouted.edges);
                setExpandedNodes(prev => new Set(prev).add(node.id));

                setTimeout(() => fitView({ duration: 800, minZoom: 0.5 }), 200);
            } else {
                toast({
                    title: "Reached the end!",
                    description: "This is a final node. Check details in the panel.",
                });
            }
        }

    }, [nodes, edges, expandedNodes, setNodes, setEdges, fitView]);

    // Handle AI Search
    const handleAISearch = async () => {
        if (!searchQuery.trim()) return;

        setIsGenerating(true);
        try {
            const context = activeTab === 'class10' ? "Class 10 Student" : "Class 12 Student";
            const result = await getCustomCareerPath(searchQuery, context);

            if (result && result.nodes) {
                // Transform AI result to React Flow format
                const aiNodes: Node[] = result.nodes.map((n: any, idx: number) => ({
                    id: n.id,
                    type: n.type === 'role' || n.type === 'outcome' ? 'careerNode' : 'degreeNode',
                    position: { x: 0, y: 0 },
                    data: {
                        label: n.label,
                        subtitle: n.type,
                        description: n.description,
                        icon: n.icon || '✨',
                        salary: n.salary,
                        demand: n.demand
                    }
                }));

                const aiEdges: Edge[] = [];
                for (let i = 0; i < aiNodes.length - 1; i++) {
                    aiEdges.push({
                        id: `e-${i}-${i + 1}`,
                        source: aiNodes[i].id,
                        target: aiNodes[i + 1].id,
                        animated: true,
                        style: { stroke: '#10b981', strokeWidth: 2 },
                        markerEnd: { type: MarkerType.ArrowClosed }
                    });
                }

                // Layout
                const layouted = getLayoutedElements(aiNodes, aiEdges, 'LR');
                setNodes(layouted.nodes);
                setEdges(layouted.edges);
                setExpandedNodes(new Set()); // Reset mapping state

                toast({
                    title: "Path Generated",
                    description: `Showing career path for ${searchQuery}`,
                });
                setTimeout(() => fitView({ duration: 800 }), 100);
            }
        } catch (error) {
            toast({
                title: "Generation Failed",
                description: "Could not generate path. Please try again.",
                variant: "destructive"
            });
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full h-full">
            {/* Controls Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 border rounded-xl p-3 shadow-sm">

                {/* Toggles */}
                <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg flex items-center">
                    <button
                        onClick={() => setActiveTab('class10')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'class10' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        🎓 After Class 10
                    </button>
                    <button
                        onClick={() => setActiveTab('class12')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'class12' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        🏛️ After Class 12
                    </button>
                </div>

                {/* AI Search */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-[300px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="e.g. Space Biologist, AI Ethicist"
                            className="pl-9 bg-slate-50 dark:bg-slate-800 border-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAISearch()}
                        />
                    </div>
                    <Button
                        size="icon"
                        onClick={handleAISearch}
                        disabled={isGenerating}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg"
                    >
                        {isGenerating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    </Button>
                </div>
            </div>

            {/* Main Canvas */}
            <div className="h-[600px] w-full border rounded-xl bg-slate-50 dark:bg-slate-950 overflow-hidden relative group shadow-inner">

                {/* Dynamic Indicator */}
                <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-black/90 backdrop-blur border px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm text-xs font-medium text-emerald-600">
                    <Zap className="h-3 w-3 fill-emerald-600" />
                    Dynamic Explorer Active
                </div>

                <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <Button size="icon" variant="secondary" onClick={() => fitView({ duration: 800 })} className="h-8 w-8">
                        <Maximize className="h-4 w-4" />
                    </Button>
                </div>

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeClick={onNodeClick}
                    nodeTypes={nodeTypes as any}
                    fitView
                    attributionPosition="bottom-right"
                    className="bg-slate-50 dark:bg-slate-950"
                >
                    <Background gap={20} size={1} color="#94a3b8" className="opacity-20" />
                </ReactFlow>

                {/* Info Panel Integration */}
                <SmartInsightsPanel
                    nodeData={selectedNodeData}
                    onClose={() => setSelectedNodeData(null)}
                />
            </div>

            {/* Legend / Tip */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Click nodes to expand
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Type dream career for custom path
                </div>
            </div>
        </div>
    );
}

export function DynamicCareerFlow(props: { courseName: string, stream: string }) {
    return (
        <ReactFlowProvider>
            <CareerFlowContent {...props} />
        </ReactFlowProvider>
    );
}
