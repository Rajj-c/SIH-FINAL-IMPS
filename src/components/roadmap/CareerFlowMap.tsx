'use client';

import React, { useCallback, useState, useRef } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    Handle,
    Position,
    Node,
    Edge,
    MarkerType,
    useReactFlow,
    ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import {
    Briefcase,
    Building2,
    BookOpen,
    GraduationCap,
    Lightbulb,
    Trophy,
    Map as MapIcon,
    Zap,
    TrendingUp,
    Award,
    Phone,
    Globe,
    FileText,
    Target,
    Download,
    Share2,
    CheckCircle2,
    RefreshCcw
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { additionalColleges } from '@/lib/new-colleges';
import { getProspectsForCourse } from '@/lib/roadmap-data';
import {
    Sheet,
    SheetContent,
    SheetTitle,
} from "@/components/ui/sheet";
import { allCourses } from '@/lib/courses-database';

// --- DATA: Specific Job Insights ---
const JOB_INSIGHTS_DATA: any = {
    'Software Developer / Engineer': {
        roleDescription: 'Design, build, and maintain software systems. You are the architect of the digital world.',
        demand: 'High & Stable',
        avgSalary: 'Rs. 6-24 LPA',
        roiDescription: 'Safe Bet: Consistent demand across all industries. Continuous learning is required, but burnout is manageable compared to other high-growth tech roles.',
        salary: {
            entry: 'Rs. 6 - 10 LPA',
            entryDesc: '(Junior Dev)',
            mid: 'Rs. 15 - 24 LPA',
            midDesc: '(SDE-2 / Senior)',
            senior: 'Rs. 35 LPA+',
            seniorDesc: '(Staff Engineer)'
        },
        growthTrend: 'Steady Growth (Linear)',
        skills: ['Java/C++', 'System Design', 'Data Structures', 'Database Mgmt'],
        recruiters: ['TCS, Infosys, Microsoft, Amazon, Zoho']
    },
    'Data Scientist / Analyst': {
        roleDescription: 'Extract insights from messy data. Build models to predict the future. High math, high reward.',
        demand: 'Explosive',
        avgSalary: 'Rs. 12-45 LPA',
        roiDescription: 'High Efficiency: High entry barrier (Math/Stats) means less competition at the top. Excellent salary-to-effort ratio once established.',
        salary: {
            entry: 'Rs. 10 - 16 LPA',
            entryDesc: '(Analyst)',
            mid: 'Rs. 25 - 40 LPA',
            midDesc: '(Data Scientist)',
            senior: 'Rs. 70 LPA+',
            seniorDesc: '(Principal DS)'
        },
        growthTrend: 'Exponential (AI Boom)',
        skills: ['Python/R', 'Machine Learning', 'SQL', 'Statistics', 'TensorFlow'],
        recruiters: ['Google, Fractal, Accenture AI, MuSigma']
    },
    'Product Manager': {
        roleDescription: 'Mini-CEO of a product. Bridge the gap between business, tech, and design.',
        demand: 'High',
        avgSalary: 'Rs. 15-50 LPA',
        roiDescription: 'High Risk, High Reward: Requires high emotional intelligence and stress management. Success depends heavily on team performance.',
        salary: {
            entry: 'Rs. 12 - 18 LPA',
            entryDesc: '(APM)',
            mid: 'Rs. 25 - 50 LPA',
            midDesc: '(Product Manager)',
            senior: 'Rs. 80 LPA+',
            seniorDesc: '(CPO / VP)'
        },
        growthTrend: 'Very High (Strategic)',
        skills: ['User Research', 'Agile/Scrum', 'Analytics', 'UX Sense', 'Communication'],
        recruiters: ['Uber, Flipkart, CRED, Atlassian']
    },
    'Chartered Accountant (CA)': {
        roleDescription: 'The backbone of financial integrity. Audit, tax, and strategy for businesses.',
        demand: 'Evergreen',
        avgSalary: 'Rs. 9-25 LPA',
        roiDescription: 'Grueling Entry: The course is extremely tough, but once you clear it, you have job security for life and practically zero recession risk.',
        salary: {
            entry: 'Rs. 9 - 12 LPA',
            entryDesc: '(Fresher CA)',
            mid: 'Rs. 18 - 25 LPA',
            midDesc: '(Manager)',
            senior: 'Rs. 50 LPA+',
            seniorDesc: '(Partner/CFO)'
        },
        growthTrend: 'Stable (Inflation Proof)',
        skills: ['Auditing', 'Taxation', 'Corporate Law', 'Financial Reporting'],
        recruiters: ['Deloitte, EY, KPMG, PwC (Big 4)']
    },
    'Investment Banker': {
        roleDescription: 'Raise capital for companies, manage mergers, and handle acquisitions. The pinnacle of finance.',
        demand: 'Cyclical',
        avgSalary: 'Rs. 25-80 LPA',
        roiDescription: 'Extreme Burnout: You will work 80-100 hour weeks. You effectively sell your youth for money. Only for the incredibly ambitious.',
        salary: {
            entry: 'Rs. 15 - 25 LPA',
            entryDesc: '(Analyst)',
            mid: 'Rs. 40 - 80 LPA',
            midDesc: '(Associate)',
            senior: 'Rs. 1 Cr+',
            seniorDesc: '(MD / Partner)'
        },
        growthTrend: 'Volatile but High Cap',
        skills: ['Financial Modeling', 'Valuation', 'Excel', 'Negotiation'],
        recruiters: ['Goldman Sachs, JP Morgan, Morgan Stanley']
    },
    'Digital Marketing Specialist': {
        roleDescription: 'Grow brands online. Master SEO, social media algorithms, and paid ads.',
        demand: 'Growing',
        avgSalary: 'Rs. 4-15 LPA',
        roiDescription: 'Low Barrier: Easy to start, hard to master. Great for creatives and freelancers. Income scales with your ability to generate results.',
        salary: {
            entry: 'Rs. 3 - 6 LPA',
            entryDesc: '(Executive)',
            mid: 'Rs. 8 - 15 LPA',
            midDesc: '(Strategist)',
            senior: 'Rs. 25 LPA+',
            seniorDesc: '(CMO / Head)'
        },
        growthTrend: 'Fast (Digital Shift)',
        skills: ['SEO/SEM', 'Content Strategy', 'Google Analytics', 'Copywriting'],
        recruiters: ['Ogilvy, Dentsu, Startups, Agencies']
    },
    'Content Writer / Copywriter': {
        roleDescription: 'Voice of the brand. Write compelling narratives that sell and inform.',
        demand: 'Moderate',
        avgSalary: 'Rs. 3-10 LPA',
        roiDescription: 'Portfolio Based: Degrees matter less than your writing samples. High competition from AI, so you must specialize (e.g., Tech/Finance writing).',
        salary: {
            entry: 'Rs. 2.5 - 5 LPA',
            entryDesc: '(Junior Writer)',
            mid: 'Rs. 6 - 10 LPA',
            midDesc: '(Senior Editor)',
            senior: 'Rs. 18 LPA+',
            seniorDesc: '(Content Head)'
        },
        growthTrend: 'Niche Dependent',
        skills: ['Storytelling', 'SEO', 'Editing', 'Research'],
        recruiters: ['Media Houses, Zoho, Freshworks, Agencies']
    },
    // Fallback for general tech
    'DEFAULT_TECH': {
        roleDescription: 'A key role in the technology sector, focusing on innovation and systems.',
        demand: 'High',
        avgSalary: 'Rs. 6-18 LPA',
        roiDescription: 'Solid Path: Technology roles generally offer the best starting salaries and growth prospects in the current market.',
        salary: {
            entry: 'Rs. 5 - 8 LPA',
            entryDesc: '(Entry Level)',
            mid: 'Rs. 12 - 20 LPA',
            midDesc: '(Senior Level)',
            senior: 'Rs. 30 LPA+',
            seniorDesc: '(Principal/Lead)'
        },
        growthTrend: 'Positive',
        skills: ['Technical Proficiency', 'Problem Solving', 'Teamwork'],
        recruiters: ['MNCs, Tech Startups']
    }
};

// --- Moved inside component to access props ---
// See inside CareerFlowMap function


// --- RICH NODES (For Export View) ---
// These nodes render the FULL detail card directly on the canvas

const RichJobNode = ({ data }: any) => {
    // Re-use logic or pass pre-calculated details in 'data.details'
    const details = data.details;

    return (
        <div className="w-[450px] bg-white rounded-2xl border-2 border-indigo-100 shadow-xl overflow-hidden font-sans">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-full backdrop-blur"><Briefcase size={20} /></div>
                    <div>
                        <h3 className="font-bold text-lg leading-tight">{details.title}</h3>
                        <p className="text-indigo-100 text-xs font-medium">Target Career</p>
                    </div>
                </div>
            </div>

            <div className="p-5 space-y-5">
                {/* Quote */}
                <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 text-indigo-900 text-sm italic">
                    "{details.roleDescription}"
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                        <p className="text-xs text-green-600 font-bold flex items-center gap-1"><TrendingUp size={12} /> Demand</p>
                        <p className="text-base font-bold text-green-800">{details.demand}</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                        <p className="text-xs text-orange-600 font-bold flex items-center gap-1"><Award size={12} /> Salary</p>
                        <p className="text-base font-bold text-orange-800">{details.avgSalary}</p>
                    </div>
                </div>

                {/* Salary Ladder */}
                <div className="border rounded-xl overflow-hidden">
                    <div className="grid grid-cols-3 divide-x bg-slate-50 border-b">
                        <div className="p-2 text-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Entry</span>
                            <div className="font-bold text-slate-800 text-xs">{details.salary.entry}</div>
                        </div>
                        <div className="p-2 text-center bg-orange-50/50">
                            <span className="text-[10px] font-bold text-orange-400 uppercase">Mid</span>
                            <div className="font-bold text-orange-800 text-xs">{details.salary.mid}</div>
                        </div>
                        <div className="p-2 text-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Senior</span>
                            <div className="font-bold text-slate-800 text-xs">{details.salary.senior}</div>
                        </div>
                    </div>
                </div>

                {/* ROI */}
                <div className="bg-teal-50 p-3 rounded-lg border border-teal-100">
                    <p className="text-xs font-bold text-teal-700 mb-1">ROI Analysis</p>
                    <p className="text-xs text-teal-800">{details.roiDescription}</p>
                </div>
            </div>

            <Handle type="target" position={Position.Top} className="!bg-slate-500 !w-4 !h-4" />
        </div>
    );
}

const RichCollegeNode = ({ data }: any) => {
    const details = data.details;
    return (
        <div className="w-[400px] bg-white rounded-2xl border-2 border-purple-100 shadow-xl overflow-hidden">
            <div className="bg-purple-600 p-4 text-white flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full"><Building2 size={20} /></div>
                <div>
                    <h3 className="font-bold text-lg">{details.name}</h3>
                    <p className="text-purple-100 text-xs">{details.location}</p>
                </div>
            </div>
            <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-3 rounded-lg border">
                        <p className="text-xs text-slate-500 font-bold uppercase">Cutoff</p>
                        <p className="font-bold text-slate-800">{details.cutoff}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border">
                        <p className="text-xs text-slate-500 font-bold uppercase">Fees</p>
                        <p className="font-bold text-slate-800">{details.fees}</p>
                    </div>
                </div>
                <div className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <span className="font-bold block text-blue-700 mb-1">Eligibility</span>
                    {details.eligibility}
                </div>
            </div>
            <Handle type="target" position={Position.Top} className="!bg-slate-500 !w-4 !h-4" />
            <Handle type="source" position={Position.Bottom} className="!bg-slate-500 !w-4 !h-4" />
        </div>
    )
}

const RichCourseNode = ({ data }: any) => {
    const details = data.details;
    return (
        <div className="w-[350px] bg-white rounded-2xl border-2 border-blue-100 shadow-xl overflow-hidden">
            <div className="bg-blue-600 p-4 text-white text-center">
                <GraduationCap size={40} className="mx-auto mb-2 opacity-80" />
                <h3 className="font-bold text-xl">{details.name}</h3>
                <p className="text-blue-100 text-sm mt-1">{details.duration}</p>
            </div>
            <div className="p-4 text-center">
                <p className="text-slate-600 text-sm">{details.description}</p>
            </div>
            <Handle type="source" position={Position.Bottom} className="!bg-slate-500 !w-4 !h-4" />
        </div>
    )
}

const RichResourceNode = ({ data }: any) => {
    const details = data.details;
    return (
        <div className="w-[350px] bg-white rounded-2xl border-2 border-orange-100 shadow-xl overflow-hidden">
            <div className="bg-orange-500 p-3 text-white flex items-center gap-3">
                <BookOpen size={20} />
                <h3 className="font-bold">Preparation & Exams</h3>
            </div>
            <div className="p-4 space-y-3">
                {details.exams && details.exams.map((e: any, i: number) => (
                    <div key={i} className="flex justify-between items-center text-sm border-b pb-2 last:border-0 last:pb-0">
                        <span className="font-medium text-slate-700">{e.name}</span>
                        <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-xs">{e.date}</span>
                    </div>
                ))}
            </div>
            <Handle type="target" position={Position.Top} className="!bg-slate-500 !w-4 !h-4" />
            <Handle type="source" position={Position.Bottom} className="!bg-slate-500 !w-4 !h-4" />
        </div>
    )
}

// --- Regular Custom Nodes (Same as before) ---
const CustomNode = ({ data, icon: Icon, color, borderColor }: any) => (
    <div className={`relative px-4 py-3 shadow-md rounded-xl border bg-white dark:bg-slate-950 min-w-[200px] hover:shadow-lg transition-all cursor-pointer group ${borderColor}`}>
        <Handle type="target" position={Position.Left} className="w-3 h-3 bg-slate-400 !border-2 !border-white" />
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${data.bgClass} text-white shrink-0`}>
                <Icon size={18} />
            </div>
            <div>
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors max-w-[150px] truncate">
                    {data.label}
                </h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">
                    {data.subLabel || 'Step'}
                </p>
            </div>
        </div>
        <Handle type="source" position={Position.Right} className="w-3 h-3 bg-slate-400 !border-2 !border-white" />
    </div>
);
const CourseNode = (props: any) => <CustomNode {...props} icon={GraduationCap} color="bg-blue-500" borderColor="border-blue-200" />;
const CollegeNode = (props: any) => <CustomNode {...props} icon={Building2} color="bg-purple-500" borderColor="border-purple-200" />;
const ResourceNode = (props: any) => <CustomNode {...props} icon={BookOpen} color="bg-orange-500" borderColor="border-orange-200" />;
const JobNode = (props: any) => <CustomNode {...props} icon={Briefcase} color="bg-green-500" borderColor="border-green-200" />;
const ExamNode = (props: any) => <CustomNode {...props} icon={Trophy} color="bg-red-500" borderColor="border-red-200" />;
const StartupNode = (props: any) => <CustomNode {...props} icon={Lightbulb} color="bg-yellow-500" borderColor="border-yellow-200" />;

const ExploreNode = ({ data }: any) => (
    <div className="relative px-4 py-2 shadow-sm rounded-full border border-primary/50 bg-primary/5 hover:bg-primary/10 hover:scale-105 transition-all cursor-pointer group flex items-center gap-2" title="Click to see other colleges">
        <Handle type="target" position={Position.Left} className="!bg-primary/50 !w-2 !h-2" />
        <RefreshCcw size={14} className="text-primary group-hover:rotate-180 transition-transform duration-500" />
        <span className="text-xs font-semibold text-primary">Explore More Colleges</span>
    </div>
);


const nodeTypes = {
    course: CourseNode,
    college: CollegeNode,
    resource: ResourceNode,
    job: JobNode,
    exam: ExamNode,
    startup: StartupNode,
    explore: ExploreNode,
    // Register Rich Types
    richJob: RichJobNode,
    richCollege: RichCollegeNode,
    richCourse: RichCourseNode,
    richResource: RichResourceNode
};

interface CareerFlowMapProps {
    courseName?: string;
}

export function CareerFlowMap({ courseName = 'B.Tech Computer Science' }: CareerFlowMapProps) {
    const initialNodes: Node[] = [
        {
            id: '1',
            type: 'course',
            position: { x: 50, y: 300 },
            data: {
                label: `Suggested: ${courseName}`,
                subLabel: 'Start Here',
                bgClass: 'bg-blue-500',
                step: 1
            },
        },
    ];

    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [collegePage, setCollegePage] = useState(0);

    // Independent Path View
    const [isPathViewOpen, setIsPathViewOpen] = useState(false);
    const [isolatedNodes, setIsolatedNodes, onIsolatedNodesChange] = useNodesState<Node>([]);
    const [isolatedEdges, setIsolatedEdges, onIsolatedEdgesChange] = useEdgesState<Edge>([]);
    const printRef = useRef<HTMLDivElement>(null);


    // --- Helper for Side Panel Details (Moved Inside for Prop Access) ---
    const getNodeDetails = (node: Node) => {
        const label = node.data.label as string;
        const type = node.type;

        // 1. College Details
        if (type === 'college') {
            const college = additionalColleges.find(c => c.name === label);
            if (college) {
                return {
                    type: 'college',
                    name: college.name,
                    location: `${college.district}, ${college.state}`,
                    cutoff: "85% - 98% (Based on Category)",
                    eligibility: college.eligibility,
                    fees: college.fee,
                    hostelFees: college.hostelFees,
                    contact: college.contactInfo,
                    mapUrl: college.googleMapsUrl,
                    placementStats: {
                        average: "Rs. 8.5 LPA",
                        highest: "Rs. 42 LPA",
                        percentage: "94% Placed"
                    },
                    facilities: ["Advanced AI Labs", "Incubation Center", "Digital Library", "Olympic-size Pool"],
                    roiDescription: "Excellent ROI. Low fees compared to private universities with comparable placement records."
                };
            }
        }

        // 2. Course Details
        if (type === 'course') {
            const looseMatch = courseName.split(' ')[0]; // e.g. "B.Tech"
            const courseData = allCourses.find(c => c.name === courseName || c.name.includes(looseMatch));

            return {
                type: 'course',
                name: label.replace('Suggested: ', ''),
                duration: courseData?.duration || '4 Years',
                eligibility: courseData?.eligibility || '10+2 with PCM',
                description: courseData?.description || 'A comprehensive program designed to build strong careers.',
                topRecruiters: ['Google', 'Microsoft', 'TCS', 'Infosys'], // Could also add to DB
                futureScope: courseData?.futureRole || "High Demand Global Career",
                difficulty: "Moderate to High",
                syllabusHighlights: courseData?.syllabusTopics || [
                    "Core Fundamentals",
                    "Advanced Specialization",
                    "Practical Labs",
                    "Project Work"
                ],
                careerOpportunities: courseData?.careers || [
                    "Software Engineer",
                    "Data Scientist",
                    "System Architect"
                ]
            };
        }

        // 3. Job Details
        if (type === 'job') {
            const key = Object.keys(JOB_INSIGHTS_DATA).find(k => label.includes(k) || k.includes(label));
            const jobData = key ? JOB_INSIGHTS_DATA[key] : JOB_INSIGHTS_DATA['DEFAULT_TECH'];
            return {
                type: 'job',
                title: label,
                ...jobData,
                roleDescription: jobData.roleDescription,
                demand: jobData.demand,
                avgSalary: jobData.avgSalary,
                roiDescription: jobData.roiDescription
            };
        }

        // 4. Resource Details
        if (type === 'resource') {
            // Find current course from DB
            const looseMatch = courseName.split(' ')[0];
            const courseData = allCourses.find(c => c.name === courseName || c.name.includes(looseMatch));

            return {
                type: 'resource',
                title: label,
                exams: courseData?.entranceExams?.map(exam => ({ name: exam, date: 'Check Website' })) || [
                    { name: 'National Level Exam', date: 'April/May' },
                    { name: 'State Level Exam', date: 'May/June' }
                ],
                materials: courseData?.studyResources || [
                    'Standard Textbooks',
                    'Previous Year Papers',
                    'Online Mock Tests'
                ],
                strategy: courseData?.preparationStrategy || "Consistency is key. Focus on core concepts and regular practice.",
                difficulty: "High",
                timeCommitment: "4-6 Hours/Day",
                syllabusHighlights: courseData?.syllabusTopics?.slice(0, 4) || ["Core Subject 1", "Core Subject 2"]
            }
        }

        // Handle 'rich' variants or return generic
        if (node.data.details) return node.data.details;

        return { type: 'generic', title: label };
    };

    const onNodeClick = useCallback((event: any, node: Node) => {
        // --- EXPLORE HANDLER ---
        if (node.type === 'explore') {
            const newPage = collegePage + 1;
            setCollegePage(newPage);

            const looseMatch = courseName.split(' ')[0];
            const allRelevantColleges = additionalColleges
                .filter(c => c.courses.some(course => course.includes(looseMatch)));

            const PAGE_SIZE = 3;
            const totalPages = Math.ceil(Math.max(allRelevantColleges.length, 1) / PAGE_SIZE);
            const wrappedPage = newPage % totalPages;
            const startIdx = wrappedPage * PAGE_SIZE;
            const currentBatch = allRelevantColleges.slice(startIdx, startIdx + PAGE_SIZE);

            const X_OFFSET = 300;
            const parentNode = nodes.find(n => n.id === '1');
            if (!parentNode) return;

            setNodes((nds) => {
                const filtered = nds.filter(n => !n.id.startsWith('col-') && n.type !== 'explore');
                const newColNodes = currentBatch.map((college, index) => ({
                    id: `col-${newPage}-${index}`,
                    type: 'college',
                    position: {
                        x: parentNode.position.x + X_OFFSET,
                        y: 300 + (index - 1) * 150
                    },
                    data: {
                        label: college.name,
                        subLabel: 'Top College',
                        bgClass: 'bg-purple-500',
                        step: 2
                    }
                }));

                const exploreNode = {
                    id: `explore`,
                    type: 'explore',
                    position: {
                        x: parentNode.position.x + X_OFFSET,
                        y: 300 + (currentBatch.length - 1) * 150 + 120
                    },
                    data: { label: 'Explore More' }
                };

                return [...filtered, ...newColNodes, exploreNode];
            });

            setEdges((eds) => {
                const filtered = eds.filter(e => e.source !== '1' || (!e.target.startsWith('col-') && e.target !== 'explore'));
                const newColEdges = currentBatch.map((_, index) => ({
                    id: `e1-col-${newPage}-${index}`,
                    source: '1',
                    target: `col-${newPage}-${index}`,
                    type: 'smoothstep',
                    animated: true,
                    style: { strokeDasharray: '5,5' },
                    markerEnd: { type: MarkerType.ArrowClosed },
                }));

                const exploreEdge = {
                    id: `e1-explore`,
                    source: '1',
                    target: `explore`,
                    type: 'default',
                    animated: false,
                    style: { opacity: 0, pointerEvents: 'none' as const },
                };

                return [...filtered, ...newColEdges, exploreEdge];
            });
            return;
        }

        // --- NORMAL CLICK HANDLER ---
        setSelectedNode(node);
        setIsSheetOpen(true);

        const step = node.data.step as number;
        const hasChildren = edges.some(edge => edge.source === node.id);
        if (hasChildren) return;

        let newNodes: Node[] = [];
        let newEdges: Edge[] = [];
        const X_OFFSET = 300;

        // Expansion logic
        if (step === 1) {
            const looseMatch = courseName.split(' ')[0];
            const allRelevantColleges = additionalColleges
                .filter(c => c.courses.some(course => course.includes(looseMatch)));

            const PAGE_SIZE = 3;
            // Use current state collegePage
            const totalPages = Math.ceil(Math.max(allRelevantColleges.length, 1) / PAGE_SIZE);
            const wrappedPage = collegePage % totalPages;
            const startIdx = wrappedPage * PAGE_SIZE;
            const relevantColleges = allRelevantColleges.slice(startIdx, startIdx + PAGE_SIZE);

            relevantColleges.forEach((college, index) => {
                const yPos = 300 + (index - 1) * 150;
                newNodes.push({
                    id: `col-${collegePage}-${index}`,
                    type: 'college',
                    position: { x: node.position.x + X_OFFSET, y: yPos },
                    data: {
                        label: college.name,
                        subLabel: 'Top College',
                        bgClass: 'bg-purple-500',
                        step: 2
                    }
                });
                newEdges.push({
                    id: `e1-col-${collegePage}-${index}`,
                    source: '1',
                    target: `col-${collegePage}-${index}`,
                    type: 'smoothstep',
                    animated: true,
                    style: { strokeDasharray: '5,5' },
                    markerEnd: { type: MarkerType.ArrowClosed },
                });
            });

            // Always add Explore Node if we have results (or logic to show it only if > 3?)
            // User requested "option called explore more colleges". 
            // It's safer to always show it so they can cycle, or checks length > 3.
            if (allRelevantColleges.length > 3) {
                newNodes.push({
                    id: `explore`,
                    type: 'explore',
                    position: {
                        x: node.position.x + X_OFFSET,
                        y: 300 + (relevantColleges.length - 1) * 150 + 120
                    },
                    data: { label: 'Explore More' }
                });
                newEdges.push({
                    id: `e1-explore`,
                    source: '1',
                    target: `explore`,
                    type: 'default',
                    animated: false,
                    style: { opacity: 0, pointerEvents: 'none' },
                });
            }
        }

        if (step === 2) {
            newNodes.push({
                id: `res-${node.id}`,
                type: 'resource',
                position: { x: node.position.x + X_OFFSET, y: node.position.y },
                data: {
                    label: 'Resources & Exams',
                    subLabel: 'Preparation',
                    bgClass: 'bg-orange-500',
                    step: 3
                }
            });
            newEdges.push({
                id: `e-${node.id}-res`,
                source: node.id,
                target: `res-${node.id}`,
                type: 'smoothstep',
                animated: true,
                style: { strokeDasharray: '5,5' },
                markerEnd: { type: MarkerType.ArrowClosed },
            });
        }

        if (step === 3) {
            const prospects = getProspectsForCourse(courseName);
            const jobs = prospects.privateJobs.slice(0, 3);

            jobs.forEach((job, index) => {
                const yPos = node.position.y + (index - 1) * 120;
                const jobId = `job-${node.id}-${index}`;

                newNodes.push({
                    id: jobId,
                    type: 'job',
                    position: { x: node.position.x + X_OFFSET, y: yPos },
                    data: {
                        label: job,
                        subLabel: 'Career Path',
                        bgClass: 'bg-green-500',
                        step: 4
                    }
                });

                newEdges.push({
                    id: `e-${node.id}-${jobId}`,
                    source: node.id,
                    target: jobId,
                    type: 'smoothstep',
                    animated: true,
                    style: { strokeDasharray: '5,5' },
                    markerEnd: { type: MarkerType.ArrowClosed },
                });
            });
        }

        if (newNodes.length > 0) {
            setNodes((nds) => nds.concat(newNodes));
            setEdges((eds) => eds.concat(newEdges));
        }

    }, [courseName, edges, setNodes, setEdges, collegePage]);


    // --- Path Isolation Logic (UPDATED FOR RICH NODES) ---
    const isolatePath = () => {
        if (!selectedNode) return;

        const pathNodeIds = new Set<string>();
        const pathEdgeIds = new Set<string>();
        const queue = [selectedNode.id];

        while (queue.length > 0) {
            const currId = queue.shift()!;
            pathNodeIds.add(currId);
            const incoming = edges.filter(e => e.target === currId);
            incoming.forEach(e => {
                pathEdgeIds.add(e.id);
                if (!pathNodeIds.has(e.source)) {
                    queue.push(e.source);
                }
            });
        }

        // Get the nodes in correct order (steps 1,2,3,4)
        const rawNodes = nodes.filter(n => pathNodeIds.has(n.id));
        const sortedNodes = rawNodes.sort((a, b) => (a.data.step as number) - (b.data.step as number));

        // Transform to Rich Nodes
        const richNodes = sortedNodes.map((n, i) => {
            // 1. Get full details including data lookups
            const fullDetails = getNodeDetails(n);

            // 2. Map to Rich Type
            let richType = 'richJob';
            if (n.type === 'college') richType = 'richCollege';
            if (n.type === 'resource') richType = 'richResource';
            if (n.type === 'course') richType = 'richCourse';

            return {
                ...n,
                id: `rich-${n.id}`,
                type: richType,
                // 3. Vertical Stack Layout
                position: { x: 250, y: i * 500 }, // Spacing for large cards
                data: {
                    ...n.data,
                    details: fullDetails // Pass resolved details
                },
                draggable: true // Enable dragging for customization
            };
        });

        // Reconnect Edges
        const richEdges = edges
            .filter(e => pathEdgeIds.has(e.id))
            .map(e => ({
                ...e,
                id: `rich-${e.id}`,
                source: `rich-${e.source}`,
                target: `rich-${e.target}`,
                type: 'default', // straight lines often look cleaner for vertical stack
            }));

        setIsolatedNodes(richNodes);
        setIsolatedEdges(richEdges);
        setIsPathViewOpen(true);
    };

    const [isolatedRfInstance, setIsolatedRfInstance] = useState<any>(null);

    const downloadPDF = async () => {
        const element = printRef.current;
        if (!element || !isolatedNodes.length) return;

        // 1. Calculate required dimensions
        const width = 1200; // Wide enough for 450px card + margins
        const height = isolatedNodes.length * 600 + 400; // Vertical stack spacing + padding

        const originalStyle = {
            width: element.style.width,
            height: element.style.height,
        };

        // 2. Expand container
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;

        // 3. Fit View to fill the new container
        if (isolatedRfInstance) {
            await isolatedRfInstance.fitView({ padding: 0.1, duration: 100 });
        }

        // Wait for render/transition
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            const canvas = await html2canvas(element, {
                useCORS: true,
                scale: 2, // High resolution
                backgroundColor: '#f8fafc', // slate-50
                ignoreElements: (element) => element.classList.contains('react-flow__controls')
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`${selectedNode?.data.label || 'Roadmap'}.pdf`);

        } catch (e) {
            console.error("PDF Export Failed", e);
        } finally {
            // Restore styles
            element.style.width = originalStyle.width;
            element.style.height = originalStyle.height;

            // Re-fit view for user
            if (isolatedRfInstance) {
                isolatedRfInstance.fitView({ duration: 0 });
            }
        }
    }

    const details = selectedNode ? getNodeDetails(selectedNode) : null;

    return (
        <div className="flex h-[700px] w-full border rounded-xl bg-slate-50 dark:bg-slate-900 overflow-hidden relative">
            <ReactFlowProvider>
                <div className="flex-1 h-full">
                    <CardHeader className="absolute top-0 left-0 z-10 p-4">
                        <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full border shadow-sm flex items-center gap-2">
                            <Zap className="h-4 w-4 text-green-600 fill-green-600" />
                            <span className="text-sm font-medium text-green-700">Dynamic explorer active</span>
                        </div>
                    </CardHeader >
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onNodeClick={onNodeClick}
                        nodeTypes={nodeTypes}
                        fitView
                    >
                        <Background color="#94a3b8" gap={20} size={1} />
                        <Controls className="!bg-white !border-slate-200 !shadow-sm" />
                    </ReactFlow>
                </div >

                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen} modal={false}>
                    <SheetContent side="right" className="w-[400px] sm:w-[500px] overflow-y-auto p-0 border-l border-slate-200 shadow-xl bg-white">
                        {selectedNode && details && (
                            <>
                                {/* Header */}
                                <div className="p-6 pb-4 border-b bg-white sticky top-0 z-20">
                                    <div className="flex items-start gap-4">
                                        <div className={`p-2.5 rounded-2xl ${selectedNode.data.bgClass} bg-opacity-10 text-slate-800`}>
                                            <Briefcase size={28} className="text-slate-800" />
                                        </div>
                                        <div>
                                            <SheetTitle className="text-xl font-bold text-slate-900 leading-tight">
                                                {details.name || details.title || selectedNode.data.label}
                                            </SheetTitle>
                                            <p className="text-sm text-slate-500 font-medium">Career Path</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 space-y-6">

                                    {/* JOB DETAILS */}
                                    {details.type === 'job' && (
                                        <>
                                            {/* CHOOSE THIS PATH BUTTON */}
                                            <Button
                                                onClick={isolatePath}
                                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-200 py-6 text-lg font-bold rounded-xl flex items-center justify-center gap-2 mb-4 animate-in slide-in-from-right-4 fade-in duration-300"
                                            >
                                                <Target className="w-5 h-5" />
                                                Choose this Path & Export
                                            </Button>

                                            {/* Quote Box */}
                                            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 relative overflow-hidden">
                                                <div className="absolute top-0 right-0 p-2 opacity-10">
                                                    <Zap size={60} />
                                                </div>
                                                <p className="text-indigo-900 text-sm leading-relaxed font-medium">
                                                    &quot;{details.roleDescription}&quot;
                                                </p>
                                            </div>

                                            {/* Demand & Salary */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                                    <p className="text-xs text-green-600 font-semibold mb-1 flex items-center gap-1">
                                                        <TrendingUp size={12} /> Demand
                                                    </p>
                                                    <p className="text-lg font-bold text-green-800">{details.demand}</p>
                                                </div>
                                                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                                                    <p className="text-xs text-orange-600 font-semibold mb-1 flex items-center gap-1">
                                                        <Award size={12} /> Avg. Salary
                                                    </p>
                                                    <p className="text-lg font-bold text-orange-800">{details.avgSalary}</p>
                                                </div>
                                            </div>

                                            {/* Skills */}
                                            <section>
                                                <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3 text-sm">
                                                    <BookOpen className="h-4 w-4 text-slate-500" />
                                                    Key Skills Required
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {details.skills.map((s: string, i: number) => (
                                                        <Badge key={i} className="bg-emerald-100/50 text-emerald-800 hover:bg-emerald-200 border-0 px-3 py-1 font-medium">
                                                            {s}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </section>

                                            {/* ROI */}
                                            <section>
                                                <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3 text-sm">
                                                    <div className="bg-teal-100 p-1 rounded-full"><div className="bg-teal-600 w-2 h-2 rounded-full"></div></div>
                                                    Is it Worth it? (ROI Analysis)
                                                </h4>
                                                <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
                                                    <p className="text-sm text-teal-800 leading-relaxed">
                                                        {details.roiDescription}
                                                    </p>
                                                </div>
                                            </section>

                                            {/* Salary Grid */}
                                            <section>
                                                <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3 text-sm">
                                                    <Award className="h-4 w-4 text-orange-500" />
                                                    Salary & Growth Trajectory
                                                </h4>
                                                <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
                                                    <div className="grid grid-cols-3 divide-x border-b">
                                                        <div className="p-3 text-center bg-slate-50">
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Entry</span>
                                                            <div className="mt-1 font-bold text-slate-800 text-sm">{details.salary.entry}</div>
                                                            <div className="text-[10px] text-slate-500 font-medium leading-tight mt-1">{details.salary.entryDesc}</div>
                                                        </div>
                                                        <div className="p-3 text-center bg-orange-50/30">
                                                            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">Mid-Level</span>
                                                            <div className="mt-1 font-bold text-orange-800 text-sm">{details.salary.mid}</div>
                                                            <div className="text-[10px] text-orange-600 font-medium leading-tight mt-1">{details.salary.midDesc}</div>
                                                        </div>
                                                        <div className="p-3 text-center bg-slate-50">
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Senior</span>
                                                            <div className="mt-1 font-bold text-slate-800 text-sm">{details.salary.senior}</div>
                                                            <div className="text-[10px] text-slate-500 font-medium leading-tight mt-1">{details.salary.seniorDesc}</div>
                                                        </div>
                                                    </div>
                                                    <div className="p-2 text-center bg-yellow-50 text-xs font-semibold text-yellow-700">
                                                        Growth Trend: <span className="text-yellow-800">{details.growthTrend}</span>
                                                    </div>
                                                </div>
                                            </section>

                                            {/* Top Recruiters */}
                                            <section>
                                                <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-2 text-sm">
                                                    <Briefcase className="h-4 w-4 text-slate-500" />
                                                    Top Recruiters
                                                </h4>
                                                <div className="p-3 border rounded-xl text-sm text-slate-600 font-medium">
                                                    {details.recruiters.join(', ')}
                                                </div>
                                            </section>
                                        </>
                                    )}

                                    {/* COLLEGE DETAILS */}
                                    {details.type === 'college' && (
                                        <>
                                            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-purple-900 text-sm italic mb-4">
                                                &quot;Start your journey at one of the region's top institutions known for excellence.&quot;
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-slate-50 p-3 rounded-lg border">
                                                    <p className="text-xs text-muted-foreground uppercase font-bold">Cutoff</p>
                                                    <p className="font-semibold text-slate-900">{details.cutoff}</p>
                                                </div>
                                                <div className="bg-slate-50 p-3 rounded-lg border">
                                                    <p className="text-xs text-muted-foreground uppercase font-bold">Course Fees</p>
                                                    <p className="font-semibold text-slate-900">{details.fees}</p>
                                                </div>
                                            </div>

                                            {/* Placement Stats */}
                                            <section className="bg-green-50 rounded-xl p-4 border border-green-100">
                                                <h4 className="flex items-center gap-2 font-bold text-green-800 mb-3 text-sm">
                                                    <TrendingUp size={16} /> Placement Highlights
                                                </h4>
                                                <div className="grid grid-cols-3 divide-x divide-green-200">
                                                    <div className="text-center px-2">
                                                        <div className="text-xs text-green-600 font-medium uppercase">Avg</div>
                                                        <div className="font-bold text-green-900 text-sm">{details.placementStats?.average || 'N/A'}</div>
                                                    </div>
                                                    <div className="text-center px-2">
                                                        <div className="text-xs text-green-600 font-medium uppercase">Highest</div>
                                                        <div className="font-bold text-green-900 text-sm">{details.placementStats?.highest || 'N/A'}</div>
                                                    </div>
                                                    <div className="text-center px-2">
                                                        <div className="text-xs text-green-600 font-medium uppercase">Placed</div>
                                                        <div className="font-bold text-green-900 text-sm">{details.placementStats?.percentage || 'N/A'}</div>
                                                    </div>
                                                </div>
                                            </section>

                                            <section>
                                                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                                    <FileText size={16} /> Eligibility
                                                </h4>
                                                <p className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
                                                    {details.eligibility}
                                                </p>
                                            </section>

                                            {/* Facilities */}
                                            <section>
                                                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2 text-sm">
                                                    <Building2 size={16} className="text-slate-500" /> Campus Facilities
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {details.facilities?.map((f: string, i: number) => (
                                                        <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200">
                                                            {f}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </section>

                                            <section>
                                                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                                    <Phone size={16} /> Contact & Directions
                                                </h4>
                                                <div className="space-y-3">
                                                    {details.contact.phone && (
                                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                                            <Phone size={14} /> {details.contact.phone}
                                                        </div>
                                                    )}
                                                    {details.contact.website && (
                                                        <div className="flex items-center gap-3 text-sm text-blue-600">
                                                            <Globe size={14} /> <a href={details.contact.website} target="_blank" className="underline">Visit Website</a>
                                                        </div>
                                                    )}
                                                    <Button variant="outline" className="w-full gap-2 mt-2 h-10 border-slate-300" onClick={() => window.open(details.mapUrl, '_blank')}>
                                                        <MapIcon size={16} /> Get Directions
                                                    </Button>
                                                </div>
                                            </section>
                                        </>
                                    )}

                                    {/* COURSE DETAILS */}
                                    {details.type === 'course' && (
                                        <>
                                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-900 text-sm italic mb-4">
                                                &quot;{details.description}&quot;
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                                    <p className="text-xs text-green-700 font-bold uppercase">Duration</p>
                                                    <p className="font-bold text-green-900">{details.duration}</p>
                                                </div>
                                                <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                                                    <p className="text-xs text-orange-700 font-bold uppercase">Difficulty</p>
                                                    <p className="font-bold text-orange-900">{details.difficulty}</p>
                                                </div>
                                            </div>

                                            {/* Syllabus Highlights */}
                                            <section>
                                                <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3 text-sm">
                                                    <BookOpen className="h-4 w-4 text-slate-500" />
                                                    Syllabus Highlights
                                                </h4>
                                                <ul className="grid grid-cols-1 gap-2">
                                                    {details.syllabusHighlights?.map((item: string, i: number) => (
                                                        <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                                                            <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </section>

                                            {/* Career Opportunities */}
                                            <section>
                                                <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3 text-sm">
                                                    <Briefcase className="h-4 w-4 text-slate-500" />
                                                    Career Opportunities
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {details.careerOpportunities?.map((career: string, i: number) => (
                                                        <Badge key={i} className="bg-blue-100/50 text-blue-800 hover:bg-blue-200 border-0 px-3 py-1 font-medium">
                                                            {career}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </section>

                                            <div className="p-4 bg-slate-50 rounded-xl border text-sm text-slate-600">
                                                <span className="font-bold text-slate-800 block mb-1">Future Scope:</span>
                                                {details.futureScope}
                                            </div>
                                        </>
                                    )}

                                    {/* RESOURCE DETAILS */}
                                    {details.type === 'resource' && (
                                        <>
                                            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-orange-900 text-sm italic mb-4">
                                                &quot;Master the fundamentals and crack the toughest exams with these curated resources.&quot;
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                                                    <p className="text-xs text-red-700 font-bold uppercase">Difficulty</p>
                                                    <p className="font-bold text-red-900">{details.difficulty}</p>
                                                </div>
                                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                                    <p className="text-xs text-slate-500 font-bold uppercase">Commitment</p>
                                                    <p className="font-bold text-slate-800">{details.timeCommitment}</p>
                                                </div>
                                            </div>

                                            <section>
                                                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                                    <Trophy size={16} className="text-yellow-600" /> Examination Dates
                                                </h4>
                                                {details.exams.map((e: any, i: number) => (
                                                    <div key={i} className="flex justify-between items-center bg-white p-3 rounded-lg border mb-2 shadow-sm">
                                                        <span className="font-semibold text-slate-800">{e.name}</span>
                                                        <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50">
                                                            {e.date}
                                                        </Badge>
                                                    </div>
                                                ))}
                                            </section>

                                            {/* Study Strategy */}
                                            <section>
                                                <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3 text-sm">
                                                    <Lightbulb className="h-4 w-4 text-slate-500" />
                                                    Pro Study Strategy
                                                </h4>
                                                <div className="bg-yellow-50/50 p-4 rounded-xl border border-yellow-100 text-sm text-yellow-900 leading-relaxed">
                                                    {details.strategy}
                                                </div>
                                            </section>

                                            <section>
                                                <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3 text-sm">
                                                    <BookOpen className="h-4 w-4 text-slate-500" />
                                                    Key Syllabus Topics
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {details.syllabusHighlights?.map((topic: string, i: number) => (
                                                        <Badge key={i} variant="outline" className="bg-white">
                                                            {topic}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </section>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </SheetContent>
                </Sheet>
                {/* PATH ISOLATION DIALOG */}
                <Dialog open={isPathViewOpen} onOpenChange={setIsPathViewOpen}>
                    <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0 overflow-hidden">
                        <DialogHeader className="p-6 pb-2 border-b">
                            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                                <Target className="text-blue-600" /> Your Personalized Roadmap
                            </DialogTitle>
                            <DialogDescription>
                                Secure your future. This document contains verified market insights, salary data, and college details.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex-1 bg-slate-50 relative overflow-y-auto" ref={printRef}>
                            <div className="h-full w-full min-h-[1000px]">
                                <ReactFlowProvider>
                                    <ReactFlow
                                        nodes={isolatedNodes}
                                        edges={isolatedEdges}
                                        onNodesChange={onIsolatedNodesChange}
                                        onEdgesChange={onIsolatedEdgesChange}
                                        onInit={setIsolatedRfInstance}
                                        nodeTypes={nodeTypes}
                                        fitView
                                        minZoom={0.5}
                                    >
                                        <Background color="#cbd5e1" gap={25} />
                                    </ReactFlow>
                                </ReactFlowProvider>
                            </div>
                        </div>

                        <DialogFooter className="p-4 border-t bg-white sticky bottom-0 z-20">
                            <Button variant="outline" onClick={() => setIsPathViewOpen(false)}>Close</Button>
                            <Button onClick={downloadPDF} className="gap-2 bg-blue-600 hover:bg-blue-700">
                                <Download size={16} /> Download Full Roadmap PDF
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </ReactFlowProvider >
        </div >
    );
}
