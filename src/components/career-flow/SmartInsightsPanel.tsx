'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, IndianRupee, GraduationCap, Briefcase, BookOpen, Building2, Award, Map, ExternalLink, Target, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { additionalColleges } from '@/lib/new-colleges';
import { LearningRoadmapModal } from './LearningRoadmapModal';
import Link from 'next/link';

interface SmartInsightsPanelProps {
    nodeData: any;
    onClose: () => void;
}

export function SmartInsightsPanel({ nodeData, onClose }: SmartInsightsPanelProps) {
    const [showCollegeModal, setShowCollegeModal] = useState(false);
    const [showRoadmapModal, setShowRoadmapModal] = useState(false);

    if (!nodeData) return null;

    // Mock data generators
    const scholarshipCount = Math.floor(Math.random() * 4) + 1;

    // Filter relevant colleges (mock logic: just pick 3 random ones for demo, or filter if possible)
    // In a real app, we would filter by course name matching nodeData.label
    const relevantColleges = additionalColleges.slice(0, 5);
    const collegeCount = relevantColleges.length;

    const getDemandColor = (demand: string) => {
        const d = demand?.toLowerCase() || '';
        if (d.includes('very high') || d.includes('explosive')) return 'bg-green-100 text-green-700 border-green-200';
        if (d.includes('high') || d.includes('growing')) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        if (d.includes('stable') || d.includes('moderate')) return 'bg-blue-100 text-blue-700 border-blue-200';
        return 'bg-gray-100 text-gray-700 border-gray-200';
    };

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '100%', opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed inset-y-0 right-0 z-50 w-full md:w-[400px] bg-white dark:bg-slate-950 border-l shadow-2xl flex flex-col"
                >
                    {/* Header */}
                    <div className="p-4 border-b flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                                {nodeData.icon || '🎓'}
                            </div>
                            <div>
                                <h2 className="font-bold text-lg leading-tight">{nodeData.label}</h2>
                                <p className="text-xs text-muted-foreground">{nodeData.subtitle || 'Career Path'}</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-200 dark:hover:bg-slate-800">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-6">
                            {/* Mentor Whisper Description */}
                            {nodeData.description && (
                                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-2 opacity-10">
                                        <SparklesIcon className="h-12 w-12" />
                                    </div>
                                    <p className="text-sm font-medium text-indigo-900 dark:text-indigo-100 leading-relaxed relative z-10">
                                        "{nodeData.description} Demand is <span className="font-bold">{nodeData.demand?.toLowerCase()}</span> and salaries are competitive."
                                    </p>
                                </div>

                            )}

                            {/* ROI / Value Analysis */}
                            {nodeData.roiAnalysis && (
                                <div className="space-y-2">
                                    <h3 className="text-sm font-semibold flex items-center gap-2">
                                        <Target className="h-4 w-4 text-emerald-600" />
                                        Is it Worth it? (ROI Analysis)
                                    </h3>
                                    <div className="bg-emerald-50/50 dark:bg-emerald-950/10 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                        {nodeData.roiAnalysis}
                                    </div>
                                </div>
                            )}

                            {/* Detailed Salary Trajectory */}
                            {nodeData.salaryInsights && (
                                <div>
                                    <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                                        <Banknote className="h-4 w-4 text-amber-600" />
                                        Salary & Growth Trajectory
                                    </h3>
                                    <div className="bg-white dark:bg-slate-900 border rounded-xl overflow-hidden shadow-sm">
                                        <div className="grid grid-cols-3 divide-x border-b bg-slate-50 dark:bg-slate-950">
                                            <div className="p-2 text-center">
                                                <div className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Entry</div>
                                                <div className="text-xs font-semibold mt-1">{nodeData.salaryInsights.entry}</div>
                                            </div>
                                            <div className="p-2 text-center bg-amber-50/30 dark:bg-amber-950/10">
                                                <div className="text-[10px] uppercase text-amber-600/80 font-bold tracking-wider">Mid-Level</div>
                                                <div className="text-xs font-bold text-amber-700 dark:text-amber-400 mt-1">{nodeData.salaryInsights.mid}</div>
                                            </div>
                                            <div className="p-2 text-center">
                                                <div className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Senior</div>
                                                <div className="text-xs font-semibold mt-1">{nodeData.salaryInsights.senior}</div>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-gradient-to-r from-transparent to-amber-50/50 dark:to-amber-950/20 text-xs text-center text-muted-foreground">
                                            <span className="font-semibold text-amber-600 dark:text-amber-400">Growth Trend:</span> {nodeData.salaryInsights.growth}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Future Prospects */}
                            {(nodeData.futureRole || nodeData.higherEducation) && (
                                <div className="grid gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border">
                                    {nodeData.futureRole && (
                                        <div className="space-y-3">
                                            <div className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                                                <Briefcase className="h-3 w-3 text-primary" />
                                                Career Progression Ladder
                                            </div>

                                            {nodeData.futureRole.includes('->') ? (
                                                <div className="relative pl-1 space-y-1">
                                                    {/* Vertical Line connecting dots */}
                                                    <div className="absolute left-[5.5px] top-3 bottom-5 w-0.5 bg-gradient-to-b from-primary/30 via-primary/20 to-transparent rounded-full" />

                                                    {nodeData.futureRole.split('->').map((role: string, idx: number, arr: string[]) => (
                                                        <motion.div
                                                            key={idx}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: idx * 0.15, duration: 0.4 }}
                                                            className="relative flex items-center gap-3 group"
                                                        >
                                                            {/* Visual Dot */}
                                                            <div className={`h-2.5 w-2.5 rounded-full border-[2px] border-white dark:border-slate-950 z-10 flex-shrink-0 transition-colors duration-300 ${idx === 0 ? 'bg-slate-400 dark:bg-slate-600' :
                                                                    idx === arr.length - 1 ? 'bg-purple-600 ring-4 ring-purple-100 dark:ring-purple-900/30' : 'bg-primary/60'
                                                                }`} />

                                                            {/* Role Card */}
                                                            <div className={`text-sm py-2 px-3 rounded-lg border w-full transition-all duration-300 hover:shadow-sm ${idx === arr.length - 1
                                                                    ? 'bg-gradient-to-r from-purple-50 to-white dark:from-purple-900/20 dark:to-slate-900 border-purple-200 dark:border-purple-800 font-semibold text-purple-900 dark:text-purple-100 shadow-sm'
                                                                    : 'bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                                                                }`}>
                                                                {role.trim()}
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-sm border-l-2 border-primary/30 pl-2 leading-snug text-slate-600 dark:text-slate-300">
                                                    {nodeData.futureRole}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                    {nodeData.higherEducation && (
                                        <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-800">
                                            <div className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                                                <GraduationCap className="h-3 w-3" /> Higher Education Paths
                                            </div>
                                            <p className="text-sm border-l-2 border-blue-400/30 pl-2 leading-snug">
                                                {nodeData.higherEducation}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                <Card className={`p-3 border flex flex-col gap-1 ${getDemandColor(nodeData.demand)}`}>
                                    <div className="flex items-center gap-1.5 text-xs font-medium opacity-80">
                                        <TrendingUp className="h-3.5 w-3.5" />
                                        Demand
                                    </div>
                                    <div className="font-bold text-sm">{nodeData.demand || 'Stable'}</div>
                                </Card>

                                <Card className="p-3 border flex flex-col gap-1 bg-amber-50 text-amber-700 border-amber-200">
                                    <div className="flex items-center gap-1.5 text-xs font-medium opacity-80">
                                        <Banknote className="h-3.5 w-3.5" />
                                        Avg. Salary
                                    </div>
                                    <div className="font-bold text-sm">{nodeData.salary || 'Market Std.'}</div>
                                </Card>
                            </div>

                            {/* Skills Required */}
                            {nodeData.skills && nodeData.skills.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                                        <BookOpen className="h-4 w-4 text-primary" />
                                        Key Skills Required
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {nodeData.skills.map((skill: string, idx: number) => (
                                            <Badge key={idx} variant="secondary" className="font-normal">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Smart Opportunities */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold flex items-center gap-2">
                                    <SparklesIcon className="h-4 w-4 text-purple-500" />
                                    Smart Opportunities
                                </h3>

                                <div className="grid gap-2">
                                    {/* Scholarship Link */}
                                    <div
                                        onClick={() => window.open('https://scholarships.gov.in', '_blank')}
                                        className="flex items-center justify-between p-3 rounded-lg border bg-gradient-to-r from-purple-50 to-white dark:from-purple-950/20 dark:to-slate-950 cursor-pointer hover:shadow-md transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Award className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-sm">{scholarshipCount} Scholarships</div>
                                                <div className="text-xs text-muted-foreground">Click to apply on NSP</div>
                                            </div>
                                        </div>
                                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                                    </div>

                                    {/* College Modal Trigger */}
                                    <div
                                        onClick={() => setShowCollegeModal(true)}
                                        className="flex items-center justify-between p-3 rounded-lg border bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/20 dark:to-slate-950 cursor-pointer hover:shadow-md transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Building2 className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-sm">{collegeCount} Nearby Colleges</div>
                                                <div className="text-xs text-muted-foreground">Click to view details here</div>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full">
                                            <ArrowRightIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Top Companies */}
                            {nodeData.companies && (
                                <div>
                                    <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                                        <Briefcase className="h-4 w-4 text-primary" />
                                        Top Recruiters
                                    </h3>
                                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border text-sm">
                                        {nodeData.companies}
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    {/* Footer Actions */}
                    <div className="p-4 border-t bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm space-y-3">
                        {nodeData.learningPath && (
                            <Button
                                type="button"
                                className="w-full gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/20"
                                size="lg"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setShowRoadmapModal(true);
                                }}
                            >
                                <Map className="h-4 w-4" />
                                View Learning Roadmap
                            </Button>
                        )}
                        <Button variant="outline" onClick={onClose} className="w-full">Close Panel</Button>
                    </div>
                </motion.div>
            </AnimatePresence >

            {/* College Details Modal */}
            < Dialog open={showCollegeModal} onOpenChange={setShowCollegeModal} >
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Top Colleges for {nodeData.label}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 mt-4">
                        {relevantColleges.map((college) => (
                            <div key={college.id} className="flex gap-4 p-4 border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                <div className="h-24 w-24 flex-shrink-0 rounded-lg bg-slate-100 overflow-hidden">
                                    <img src={college.imageUrl} alt={college.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg">{college.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-2">{college.district}, {college.state}</p>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <Badge variant="outline">{college.type}</Badge>
                                        <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                                            Avg Pkg: {college.averagePackage || 'N/A'}
                                        </Badge>
                                    </div>
                                    <p className="text-sm line-clamp-2 text-muted-foreground">{college.about}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog >

            {/* Learning Roadmap Modal */}
            < LearningRoadmapModal
                isOpen={showRoadmapModal}
                onClose={() => setShowRoadmapModal(false)
                }
                careerName={nodeData.label}
                steps={nodeData.learningPath || []}
            />
        </>
    );
}

function SparklesIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" />
            <path d="M9 5H5" />
            <path d="M19 19v4" />
            <path d="M15 21h4" />
        </svg>
    )
}

function ArrowRightIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}
