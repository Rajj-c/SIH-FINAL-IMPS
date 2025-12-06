import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, GraduationCap, BookOpen, Trophy, Star, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Types ---
export type CareerNodeData = {
    label: string;
    type: 'course' | 'job' | 'exam' | 'milestone';
    description?: string;
    salary?: string;
    duration?: string;
    status?: 'locked' | 'available' | 'selected' | 'completed';
    onSelect?: () => void;
    // Legacy props
    subtitle?: string;
    icon?: React.ReactNode;
};

// --- Helper Components ---
const NodeIcon = ({ type }: { type: CareerNodeData['type'] }) => {
    switch (type) {
        case 'course': return <GraduationCap className="h-5 w-5 text-blue-500" />;
        case 'job': return <Briefcase className="h-5 w-5 text-green-500" />;
        case 'exam': return <BookOpen className="h-5 w-5 text-orange-500" />;
        case 'milestone': return <Trophy className="h-5 w-5 text-yellow-500" />;
        default: return <Star className="h-5 w-5" />;
    }
};

// --- Legacy Nodes (Restored for Backward Compatibility) ---
export const StartNode = memo(({ data }: NodeProps<any>) => (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
        <div className="flex">
            <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
                {data.icon}
            </div>
            <div className="ml-2">
                <div className="text-lg font-bold">{data.label}</div>
                <div className="text-gray-500">{data.subtitle}</div>
            </div>
        </div>
        <Handle type="source" position={Position.Bottom} className="w-16 !bg-stone-500" />
    </div>
));

export const StreamNode = memo(({ data }: NodeProps<any>) => (
    <div className={cn(
        "px-4 py-2 shadow-md rounded-md bg-white border-2 transition-all duration-300",
        data.isRecommended ? "border-primary ring-4 ring-primary/20 scale-105" : "border-blue-500"
    )}>
        {data.isRecommended && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap z-10">
                Suggested Path
            </div>
        )}
        <Handle type="target" position={Position.Top} className="w-16 !bg-blue-500" />
        <div className="flex">
            <div className="rounded-full w-12 h-12 flex justify-center items-center bg-blue-100">
                {data.icon}
            </div>
            <div className="ml-2">
                <div className="text-lg font-bold">{data.label}</div>
                <div className="text-gray-500">{data.subtitle}</div>
            </div>
        </div>
        <Handle type="source" position={Position.Bottom} className="w-16 !bg-blue-500" />
    </div>
));

export const DegreeNode = memo(({ data }: NodeProps<any>) => (
    <div className={cn(
        "px-4 py-2 shadow-md rounded-md bg-white border-2 transition-all duration-300",
        data.isRecommended ? "border-primary ring-4 ring-primary/20 scale-105" : "border-green-500"
    )}>
        {data.isRecommended && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap z-10">
                Suggested
            </div>
        )}
        <Handle type="target" position={Position.Top} className="w-16 !bg-green-500" />
        <div className="flex">
            <div className="rounded-full w-12 h-12 flex justify-center items-center bg-green-100">
                {data.icon}
            </div>
            <div className="ml-2">
                <div className="text-lg font-bold">{data.label}</div>
                <div className="text-gray-500">{data.salary}</div>
            </div>
        </div>
        <Handle type="source" position={Position.Bottom} className="w-16 !bg-green-500" />
    </div>
));

// --- New Universal Career Node ---
export const CareerNode = memo(({ data, selected }: NodeProps<any>) => {
    const isSelected = data.status === 'selected' || selected;
    const isCompleted = data.status === 'completed';

    return (
        <div className="relative group">
            {/* Input Handle */}
            <Handle type="target" position={Position.Top} className="!bg-muted-foreground !w-3 !h-3" />

            <Card
                className={cn(
                    "w-64 transition-all duration-300 border-2 shadow-sm hover:shadow-md cursor-pointer",
                    isSelected ? "border-primary ring-2 ring-primary/20" : "border-border",
                    data.isRecommended ? "border-primary ring-4 ring-primary/20 scale-105" : "",
                    isCompleted ? "bg-green-50 border-green-500" : "bg-card"
                )}
                onClick={data.onSelect}
            >
                <CardHeader className="p-3 pb-1">
                    <div className="flex justify-between items-start">
                        <Badge variant="outline" className={cn(
                            "mb-1 capitalize",
                            data.type === 'job' && "bg-green-100 text-green-800 border-green-200",
                            data.type === 'exam' && "bg-orange-100 text-orange-800 border-orange-200",
                            data.type === 'course' && "bg-blue-100 text-blue-800 border-blue-200"
                        )}>
                            {data.type || 'Career'}
                        </Badge>
                        {isCompleted && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                        {data.isRecommended && (
                            <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5 h-5">Suggested</Badge>
                        )}
                    </div>
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                        <NodeIcon type={data.type} />
                        <span className="truncate" title={data.label}>{data.label}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-1 text-xs text-muted-foreground">
                    {data.description && <p className="line-clamp-2 mb-2">{data.description}</p>}

                    <div className="flex flex-wrap gap-2 mt-2">
                        {data.salary && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground font-medium">
                                💰 {data.salary}
                            </span>
                        )}
                        {data.duration && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground font-medium">
                                ⏱️ {data.duration}
                            </span>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Output Handle */}
            <Handle type="source" position={Position.Bottom} className="!bg-muted-foreground !w-3 !h-3" />
        </div>
    );
});

export default CareerNode;
