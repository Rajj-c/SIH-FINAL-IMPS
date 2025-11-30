import { memo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { GraduationCap, Briefcase, TrendingUp, Sparkles, Building2 } from 'lucide-react';

// Type definitions for node data
interface StartNodeData extends Record<string, unknown> {
    icon: React.ReactNode;
    label: React.ReactNode;
    subtitle: React.ReactNode;
}

interface StreamNodeData extends Record<string, unknown> {
    icon: React.ReactNode;
    label: React.ReactNode;
    subtitle: React.ReactNode;
    color: string;
    duration?: React.ReactNode;
}

interface DegreeNodeData extends Record<string, unknown> {
    icon: React.ReactNode;
    label: React.ReactNode;
    salary?: React.ReactNode;
    demand?: React.ReactNode;
}

interface CareerNodeData extends Record<string, unknown> {
    icon: React.ReactNode;
    label: React.ReactNode;
    companies?: React.ReactNode;
    salary?: React.ReactNode;
    growth?: React.ReactNode;
}

interface OpportunityNodeData extends Record<string, unknown> {
    icon: React.ReactNode;
    label: React.ReactNode;
    subtitle: React.ReactNode;
}

// Start Node - Entry point (Class 10/12)
export const StartNode = memo(({ data }: NodeProps<Node<StartNodeData>>) => {
    return (
        <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative px-6 py-5 bg-white dark:bg-slate-900 rounded-xl border border-primary/20 shadow-xl min-w-[260px]">
                <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-primary border-2 border-white" />
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                        {data.icon}
                    </div>
                    <div>
                        <div className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                            {data.label}
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">{data.subtitle}</div>
                    </div>
                </div>
                <div className="absolute top-2 right-2">
                    <Sparkles className="h-4 w-4 text-amber-400 opacity-50" />
                </div>
            </div>
        </div>
    );
});
StartNode.displayName = 'StartNode';

// Stream Node - Main branches (Engineering, Medical, etc.)
export const StreamNode = memo(({ data }: NodeProps<Node<StreamNodeData>>) => {
    const borderColor = data.color || '#3b82f6';

    return (
        <div className="relative group">
            <div className="absolute -inset-0.5 rounded-xl blur opacity-20 group-hover:opacity-60 transition duration-500" style={{ background: borderColor }}></div>
            <div className="relative px-5 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl border shadow-lg min-w-[240px] hover:-translate-y-1 transition-transform duration-300" style={{ borderColor: `${borderColor}40` }}>
                <Handle type="target" position={Position.Top} className="w-3 h-3 border-2 border-white" style={{ background: borderColor }} />
                <Handle type="source" position={Position.Bottom} className="w-3 h-3 border-2 border-white" style={{ background: borderColor }} />

                <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center text-2xl shadow-inner" style={{ background: `${borderColor}15` }}>
                        {data.icon}
                    </div>
                    <div className="flex-1">
                        <div className="font-bold text-base text-foreground">{data.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5 font-medium">{data.subtitle}</div>
                        {data.duration && (
                            <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] uppercase tracking-wider font-semibold rounded-full">
                                ⏱️ {data.duration}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});
StreamNode.displayName = 'StreamNode';

// Degree Node - Specific courses/degrees
export const DegreeNode = memo(({ data }: NodeProps<Node<DegreeNodeData>>) => {
    return (
        <div className="px-4 py-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-md min-w-[200px] hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]">
            <Handle type="target" position={Position.Top} className="w-2 h-2 bg-slate-400" />
            <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-slate-400" />

            <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-md text-xl">
                    {data.icon}
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-sm text-foreground leading-tight">{data.label}</div>

                    <div className="mt-2 space-y-1">
                        {data.salary && (
                            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                                <TrendingUp className="h-3 w-3" />
                                {data.salary}
                            </div>
                        )}
                        {data.demand && (
                            <div className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                                <span className={`h-1.5 w-1.5 rounded-full ${data.demand === 'Very High' ? 'bg-red-500' : 'bg-amber-500'}`}></span>
                                Demand: {data.demand}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});
DegreeNode.displayName = 'DegreeNode';

// Career Node - Final career outcomes
export const CareerNode = memo(({ data }: NodeProps<Node<CareerNodeData>>) => {
    return (
        <div className="relative group overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 opacity-100"></div>
            <div className="relative px-4 py-3 border border-emerald-200 dark:border-emerald-800 shadow-lg min-w-[200px] hover:shadow-emerald-100/50 dark:hover:shadow-emerald-900/20 transition-all duration-300 hover:-translate-y-1">
                <Handle type="target" position={Position.Top} className="w-2 h-2 bg-emerald-500" />

                <div className="flex items-start gap-3">
                    <div className="p-2 bg-white dark:bg-slate-950 rounded-full shadow-sm text-xl border border-emerald-100 dark:border-emerald-900">
                        {data.icon}
                    </div>
                    <div className="flex-1">
                        <div className="font-bold text-sm text-emerald-950 dark:text-emerald-50 flex items-center gap-1">
                            {data.label}
                        </div>

                        {data.companies && (
                            <div className="text-[10px] text-emerald-700 dark:text-emerald-300 mt-1 flex items-center gap-1">
                                <Building2 className="h-3 w-3" />
                                <span className="truncate max-w-[120px]">{data.companies}</span>
                            </div>
                        )}

                        <div className="mt-2 flex items-center justify-between">
                            {data.salary && (
                                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                    {data.salary}
                                </div>
                            )}
                            {data.growth && (
                                <div className="px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-[10px] rounded font-medium">
                                    {data.growth} ↗
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
CareerNode.displayName = 'CareerNode';

// Opportunity Node - Govt/Private/Higher Ed options
export const OpportunityNode = memo(({ data }: NodeProps<Node<OpportunityNodeData>>) => {
    return (
        <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-200 to-orange-100 rounded-xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative px-4 py-3 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-amber-800 shadow-sm min-w-[220px] hover:-translate-y-1 transition-transform duration-300">
                <Handle type="target" position={Position.Top} className="w-2 h-2 bg-amber-400" />
                <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-amber-400" />

                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-xl border border-amber-100 dark:border-amber-800">
                        {data.icon}
                    </div>
                    <div>
                        <div className="font-bold text-sm text-foreground">{data.label}</div>
                        <div className="text-xs text-muted-foreground font-medium">{data.subtitle}</div>
                    </div>
                </div>
            </div>
        </div>
    );
});
OpportunityNode.displayName = 'OpportunityNode';
