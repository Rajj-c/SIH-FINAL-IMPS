import React, { useCallback, useMemo, useState } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    Handle,
    Position,
    NodeProps,
    Edge,
    Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CareerPathNode, College } from '@/lib/types';
import { Briefcase, GraduationCap, School, Building2 } from 'lucide-react';
import { colleges } from '@/lib/data';
import { RoadmapModal } from './RoadmapModal';

interface CareerNodeData extends Record<string, unknown> {
    label: string;
    type: string;
    icon: string;
    isSelected?: boolean;
    isExpanded?: boolean;
    hasChildren?: boolean;
    originalNode?: CareerPathNode;
    college?: College; // For college nodes
    courseName?: string; // For college nodes to know which course they are linked to
}

// Custom Node Component
const CareerNode = ({ data }: NodeProps) => {
    const typedData = data as CareerNodeData;
    const Icon = typedData.icon === 'school' ? School : typedData.icon === 'degree' ? GraduationCap : typedData.icon === 'college' ? Building2 : Briefcase;

    return (
        <div className={`px-4 py-2 shadow-md rounded-md bg-card border-2 min-w-[150px] text-center transition-all hover:scale-105 ${typedData.isSelected ? 'border-primary' : 'border-border'} relative group`}>
            <Handle type="target" position={Position.Top} className="w-3 h-3 bg-muted-foreground" />
            <div className="flex flex-col items-center gap-2">
                <div className={`p-2 rounded-full ${typedData.type === 'Stream' ? 'bg-blue-100 text-blue-600' : typedData.type === 'Degree' ? 'bg-green-100 text-green-600' : typedData.type === 'College' ? 'bg-orange-100 text-orange-600' : 'bg-purple-100 text-purple-600'}`}>
                    <Icon size={16} />
                </div>
                <div>
                    <div className="font-bold text-sm max-w-[180px] truncate" title={typedData.label}>{typedData.label}</div>
                    <div className="text-xs text-muted-foreground">{typedData.type}</div>
                </div>
            </div>
            {typedData.hasChildren && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-background border rounded-full p-0.5 shadow-sm">
                    {typedData.isExpanded ? (
                        <div className="w-4 h-4 flex items-center justify-center text-xs font-bold text-muted-foreground">-</div>
                    ) : (
                        <div className="w-4 h-4 flex items-center justify-center text-xs font-bold text-primary">+</div>
                    )}
                </div>
            )}
            <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-muted-foreground" />
        </div>
    );
};

const nodeTypes = {
    careerNode: CareerNode,
};

interface RoadmapGraphProps {
    data: CareerPathNode[];
    onNodeClick: (node: CareerPathNode) => void;
}

// Helper to check if a college offers a course (fuzzy match)
const offersCourse = (college: College, courseName: string) => {
    const normalizedCourse = courseName.toLowerCase().replace(/\(.*\)/, '').trim();
    return college.courses.some(c => c.toLowerCase().includes(normalizedCourse));
};

// Helper to transform tree data to React Flow nodes/edges
const transformData = (nodes: CareerPathNode[], expandedNodeIds: Set<string>) => {
    const flowNodes: Node[] = [];
    const flowEdges: Edge[] = [];
    let idCounter = 0;

    // Map to store generated IDs for nodes to ensure consistent edge connections
    const nodeIds = new Map<string, string>();

    const traverse = (node: CareerPathNode, parentId: string | null, x: number, y: number, level: number) => {
        // Use a consistent ID based on the node name if possible, or fallback to counter
        const currentId = `node-${idCounter++}`;
        nodeIds.set(node.name, currentId);

        // Determine icon based on level/type (simplified logic)
        let icon = 'briefcase';
        if (level === 0) icon = 'school'; // Stream
        else if (level === 1) icon = 'degree'; // Degree

        const isExpanded = expandedNodeIds.has(node.name);
        const hasChildren = (node.children && node.children.length > 0) || (level === 1); // Degree nodes always have "potential" children (colleges)

        flowNodes.push({
            id: currentId,
            type: 'careerNode',
            position: { x, y },
            data: {
                label: node.name,
                type: node.type,
                icon: icon,
                originalNode: node,
                isExpanded: isExpanded,
                hasChildren: hasChildren
            },
        });

        if (parentId) {
            flowEdges.push({
                id: `edge-${parentId}-${currentId}`,
                source: parentId,
                target: currentId,
                animated: true,
                style: { stroke: 'hsl(var(--primary))' },
            });
        }

        if (isExpanded) {
            // Case 1: Standard Children (Sub-courses)
            if (node.children && node.children.length > 0) {
                const childrenCount = node.children.length;
                const width = childrenCount * 250;
                let startX = x - width / 2 + 125;

                node.children.forEach((child, index) => {
                    traverse(child, currentId, startX + index * 250, y + 200, level + 1);
                });
            }
            // Case 2: College Nodes (for Degree/Diploma level)
            else if (level === 1 || level === 2) { // Assuming level 1/2 are courses
                const relevantColleges = colleges.filter(c => offersCourse(c, node.name)).slice(0, 5); // Limit to top 5 to prevent clutter

                if (relevantColleges.length > 0) {
                    const width = relevantColleges.length * 250;
                    let startX = x - width / 2 + 125;

                    relevantColleges.forEach((college, index) => {
                        const collegeId = `college-${college.id}-${idCounter++}`;
                        flowNodes.push({
                            id: collegeId,
                            type: 'careerNode',
                            position: { x: startX + index * 250, y: y + 200 },
                            data: {
                                label: college.name,
                                type: 'College',
                                icon: 'college',
                                college: college,
                                courseName: node.name,
                                hasChildren: false
                            }
                        });

                        flowEdges.push({
                            id: `edge-${currentId}-${collegeId}`,
                            source: currentId,
                            target: collegeId,
                            animated: true,
                            style: { stroke: '#f97316', strokeDasharray: '5,5' }, // Used hex code for orange-500
                        });
                    });
                }
            }
        }
    };

    // Start traversal for each root node (Stream)
    nodes.forEach((node, index) => {
        // Center the root nodes
        traverse(node, null, index * 500, 0, 0);
    });

    return { flowNodes, flowEdges };
};

export default function RoadmapGraph({ data, onNodeClick }: RoadmapGraphProps) {
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
    const [selectedCollege, setSelectedCollege] = useState<{ college: College, courseName: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { flowNodes: initialNodes, flowEdges: initialEdges } = useMemo(() => transformData(data, expandedNodes), [data, expandedNodes]);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    // Sync local state with computed nodes/edges when data or expansion changes
    React.useEffect(() => {
        const { flowNodes, flowEdges } = transformData(data, expandedNodes);
        setNodes(flowNodes);
        setEdges(flowEdges);
    }, [data, expandedNodes, setNodes, setEdges]);

    const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        const nodeData = node.data as CareerNodeData;

        if (nodeData.college && nodeData.courseName) {
            // Handle College Click -> Open Modal
            setSelectedCollege({ college: nodeData.college, courseName: nodeData.courseName });
            setIsModalOpen(true);
        } else if (nodeData.originalNode) {
            const originalNode = nodeData.originalNode;
            onNodeClick(originalNode);

            // Toggle expansion
            setExpandedNodes(prev => {
                const next = new Set(prev);
                if (next.has(originalNode.name)) {
                    next.delete(originalNode.name);
                } else {
                    next.add(originalNode.name);
                }
                return next;
            });

            // Highlight selected node
            setNodes((nds) =>
                nds.map((n) => ({
                    ...n,
                    data: {
                        ...n.data,
                        isSelected: n.id === node.id,
                    },
                }))
            );
        }
    }, [onNodeClick, setNodes]);

    return (
        <>
            <div className="h-[600px] w-full border rounded-lg bg-slate-50 dark:bg-slate-900">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeClick={handleNodeClick}
                    nodeTypes={nodeTypes}
                    fitView
                    attributionPosition="bottom-right"
                >
                    <Controls />
                    <MiniMap />
                    <Background gap={12} size={1} />
                </ReactFlow>
            </div>

            {selectedCollege && (
                <RoadmapModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    college={selectedCollege.college}
                    courseName={selectedCollege.courseName}
                />
            )}
        </>
    );
}

