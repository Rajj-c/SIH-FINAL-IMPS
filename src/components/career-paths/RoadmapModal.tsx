'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building2, GraduationCap, Briefcase, Lightbulb, BookOpen, Award, MapPin } from "lucide-react";
import { College } from "@/lib/types";
import { getProspectsForCourse } from "@/lib/roadmap-data";

interface RoadmapModalProps {
    isOpen: boolean;
    onClose: () => void;
    college: College;
    courseName: string;
}

export function RoadmapModal({ isOpen, onClose, college, courseName }: RoadmapModalProps) {
    const prospects = getProspectsForCourse(courseName);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 gap-0">
                <div className="p-6 border-b bg-muted/30">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-headline flex items-center gap-2">
                            <Building2 className="h-6 w-6 text-primary" />
                            Roadmap to Future: {courseName}
                        </DialogTitle>
                        <DialogDescription className="text-base mt-2">
                            at <span className="font-semibold text-foreground">{college.name}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-wrap gap-2 mt-4">
                        <Badge variant="secondary" className="flex gap-1">
                            <MapPin size={12} /> {college.district}, {college.state}
                        </Badge>
                        <Badge variant="outline" className="flex gap-1">
                            <Award size={12} /> NIRF Rank: {college.nirfRank}
                        </Badge>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Avg Package: {college.averagePackage}
                        </Badge>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-8">
                        {/* Section 1: College Benefits */}
                        <section>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary">
                                <Award className="h-5 w-5" /> Why this College?
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Placement Stats</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{college.placementRate}%</div>
                                        <p className="text-xs text-muted-foreground">Placement Rate</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Campus Life</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm">{college.hostelAvailable ? 'Hostel Available' : 'Day Scholar'}</p>
                                        <p className="text-xs text-muted-foreground mt-1">Fees: {college.fee}</p>
                                    </CardContent>
                                </Card>
                                <div className="md:col-span-2">
                                    <Card className="bg-primary/5 border-primary/20">
                                        <CardContent className="pt-6">
                                            <p className="italic text-sm text-muted-foreground">"{college.about}"</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </section>

                        <Separator />

                        {/* Section 2: Future Prospects */}
                        <section>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary">
                                <Lightbulb className="h-5 w-5" /> Future Opportunities
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Government Exams */}
                                <Card className="border-l-4 border-l-blue-500">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-base">
                                            <BookOpen className="h-4 w-4 text-blue-500" /> Government Exams
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                                            {prospects.governmentExams.map((exam, i) => (
                                                <li key={i}>{exam}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>

                                {/* Private Jobs */}
                                <Card className="border-l-4 border-l-green-500">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-base">
                                            <Briefcase className="h-4 w-4 text-green-500" /> Private Sector Jobs
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                                            {prospects.privateJobs.map((job, i) => (
                                                <li key={i}>{job}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>

                                {/* Entrepreneurship */}
                                <Card className="border-l-4 border-l-purple-500">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-base">
                                            <Lightbulb className="h-4 w-4 text-purple-500" /> Entrepreneurship
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                                            {prospects.entrepreneurship.map((idea, i) => (
                                                <li key={i}>{idea}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>

                                {/* Higher Education */}
                                <Card className="border-l-4 border-l-orange-500">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-base">
                                            <GraduationCap className="h-4 w-4 text-orange-500" /> Higher Education
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                                            {prospects.higherEducation.map((edu, i) => (
                                                <li key={i}>{edu}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
