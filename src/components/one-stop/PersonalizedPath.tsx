'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ReactFlow, Background, useNodesState, useEdgesState, type Node, type Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { StartNode, StreamNode, DegreeNode, CareerNode } from '@/components/career-flow/CustomNodes';
import { TrendingUp, Clock, GraduationCap, Sparkles, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { Course } from '@/lib/courses-database';
import { colleges } from '@/lib/data';
import { useMemo, useState } from 'react';
import { SmartInsightsPanel } from '@/components/career-flow/SmartInsightsPanel';
import { CollegeDetailsModal } from '@/components/colleges/CollegeDetailsModal';
import { createGenericCollege } from '@/lib/utils';

const nodeTypes = {
    startNode: StartNode,
    streamNode: StreamNode,
    degreeNode: DegreeNode,
    careerNode: CareerNode,
};

interface PersonalizedPathProps {
    recommendedCourse: Course;
    matchScore: number;
    reasons: string[];
    stream: string;
    onExploreMore: () => void;
}

export function PersonalizedPath({
    recommendedCourse,
    matchScore,
    reasons,
    stream,
    onExploreMore
}: PersonalizedPathProps) {
    const [selectedNode, setSelectedNode] = useState<any>(null);

    // Generate filtered flowchart for recommended course
    const { nodes, edges } = useMemo(() => {
        const branchLabel = recommendedCourse.branch
            ? (recommendedCourse.branch.charAt(0).toUpperCase() + recommendedCourse.branch.slice(1))
            : stream;

        const flowNodes: Node[] = [
            {
                id: 'start',
                type: 'startNode',
                position: { x: 300, y: 0 },
                data: {
                    label: `Class ${recommendedCourse.classLevel} Completed`,
                    subtitle: `${stream.charAt(0).toUpperCase() + stream.slice(1)} Stream`,
                    icon: '🎓',
                },
            },
            {
                id: 'branch',
                type: 'streamNode',
                position: { x: 250, y: 150 },
                data: {
                    label: branchLabel,
                    subtitle: `Recommended Path`,
                    duration: recommendedCourse.duration,
                    icon: recommendedCourse.icon,
                    color: '#3b82f6',
                },
            },
            {
                id: 'course',
                type: 'degreeNode',
                position: { x: 250, y: 320 },
                data: {
                    label: recommendedCourse.name,
                    salary: recommendedCourse.avgSalary,
                    demand: recommendedCourse.demand,
                    icon: recommendedCourse.icon,
                    // Pass rich data
                    futureRole: recommendedCourse.futureRole,
                    higherEducation: recommendedCourse.higherEducation,
                    roiAnalysis: recommendedCourse.roiAnalysis,
                    salaryInsights: recommendedCourse.salaryInsights,
                },
            },
            ...recommendedCourse.careers.slice(0, 3).map((career, idx) => ({
                id: `career-${idx}`,
                type: 'careerNode' as const,
                position: { x: idx * 200 + 50, y: 480 },
                data: {
                    label: career,
                    companies: recommendedCourse.topColleges[0] || 'Top Companies',
                    growth: 'Excellent',
                    icon: '💼',
                    // Propagate Parent Course Insights (Contextual)
                    roiAnalysis: recommendedCourse.roiAnalysis,
                    higherEducation: recommendedCourse.higherEducation,
                    // Construct specifics or use parent's if generic
                    salaryInsights: recommendedCourse.salaryInsights || {
                        entry: recommendedCourse.avgSalary,
                        mid: "Market Standard",
                        senior: recommendedCourse.topSalary,
                        growth: "High Potential"
                    }
                },
            })),
        ];

        const flowEdges: Edge[] = [
            { id: 'e1', source: 'start', target: 'branch', animated: true },
            { id: 'e2', source: 'branch', target: 'course' },
            ...recommendedCourse.careers.slice(0, 3).map((_, idx) => ({
                id: `e-career-${idx}`,
                source: 'course',
                target: `career-${idx}`,
            })),
        ];

        return { nodes: flowNodes, edges: flowEdges };
    }, [recommendedCourse, stream]);

    const [flowNodes, setNodes, onNodesChange] = useNodesState(nodes);
    const [flowEdges, setEdges, onEdgesChange] = useEdgesState(edges);

    return (
        <div className="space-y-6">
            <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
                <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-5xl">{recommendedCourse.icon}</span>
                                <div>
                                    <Badge variant="default" className="mb-2">AI Recommended</Badge>
                                    <CardTitle className="text-3xl">{recommendedCourse.fullName}</CardTitle>
                                    <CardDescription className="text-base">{recommendedCourse.description}</CardDescription>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-primary">{matchScore}%</div>
                            <p className="text-sm text-muted-foreground">Match Score</p>
                        </div>
                    </div>
                    <Progress value={matchScore} className="h-3" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" />
                            Why This Fits You:
                        </h4>
                        <div className="grid gap-2">
                            {reasons.map((reason, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-sm">
                                    <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                    <span>{reason}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t">
                        <div className="text-center p-3 bg-secondary/50 rounded-lg">
                            <Clock className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">Duration</p>
                            <p className="font-semibold">{recommendedCourse.duration}</p>
                        </div>
                        <div className="text-center p-3 bg-secondary/50 rounded-lg">
                            <TrendingUp className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">Avg Salary</p>
                            <p className="font-semibold">{recommendedCourse.avgSalary}</p>
                        </div>
                        <div className="text-center p-3 bg-secondary/50 rounded-lg">
                            <GraduationCap className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">Demand</p>
                            <p className="font-semibold">{recommendedCourse.demand}</p>
                        </div>
                        <div className="text-center p-3 bg-secondary/50 rounded-lg">
                            <TrendingUp className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                            <p className="font-semibold">{recommendedCourse.topSalary}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Your Career Journey</CardTitle>
                    <CardDescription>Visualized path from current stage to career outcomes</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[500px] border rounded-lg overflow-hidden">
                        <ReactFlow
                            nodes={flowNodes}
                            edges={flowEdges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            nodeTypes={nodeTypes as any}
                            onNodeClick={(_, node) => setSelectedNode(node.data)}
                            fitView
                            className="bg-gradient-to-br from-gray-50 to-blue-50"
                        >
                            <Background color="#aaa" gap={16} />
                        </ReactFlow>
                    </div>
                    <SmartInsightsPanel nodeData={selectedNode} onClose={() => setSelectedNode(null)} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Entrance Exams Required</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {recommendedCourse.entranceExams.map((exam, idx) => (
                            <Badge key={idx} variant="secondary" className="text-sm px-3 py-1">
                                {exam}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Top Government Colleges</CardTitle>
                    <CardDescription>
                        Offering {recommendedCourse.fullName}.
                        <span className="text-xs text-muted-foreground ml-2">
                            ({colleges.length} verified govt colleges loaded)
                        </span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                        {recommendedCourse.topColleges.map((collegeName, idx) => {
                            const cleanName = collegeName.trim().toLowerCase();
                            // Robust lookup matching
                            const collegeData = colleges.find(c => c.name.trim().toLowerCase() === cleanName) ||
                                colleges.find(c => c.name.toLowerCase().includes(cleanName)) ||
                                colleges.find(c => cleanName.includes(c.name.toLowerCase())) ||
                                createGenericCollege(collegeName);

                            return (
                                <CollegeDetailsModal
                                    key={idx}
                                    college={collegeData}
                                    trigger={
                                        <div className="flex items-center gap-2 p-3 border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer">
                                            <GraduationCap className="h-5 w-5 text-primary" />
                                            <span className="font-medium">{collegeData.name}</span>
                                        </div>
                                    }
                                />
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-center pt-4">
                <Button size="lg" onClick={onExploreMore} className="w-full md:w-auto">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Explore More Career Options
                </Button>
            </div>
        </div >
    );
}
