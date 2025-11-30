'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, GraduationCap, Clock, TrendingUp, Target, BookOpen } from 'lucide-react';
import { allCourses, type Course } from '@/lib/courses-database';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

interface DegreeEncyclopediaProps {
    streamFilter?: string;
}

export function DegreeEncyclopedia({ streamFilter }: DegreeEncyclopediaProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCourses = allCourses.filter(course => {
        const matchesSearch = !searchQuery ||
            course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStream = !streamFilter || course.stream === streamFilter;

        return matchesSearch && matchesStream;
    });

    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                            placeholder="Search degrees... (e.g., B.Tech, MBBS, CA)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 text-base"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Found {filteredCourses.length} {streamFilter && `${streamFilter.charAt(0).toUpperCase() + streamFilter.slice(1)}`} degree(s)
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCourses.map(course => (
                    <Dialog key={course.id}>
                        <DialogTrigger asChild>
                            <Card className="cursor-pointer hover:shadow-lg hover:border-primary transition-all">
                                <CardHeader>
                                    <div className="flex items-start justify-between mb-2">
                                        <span className="text-4xl">{course.icon}</span>
                                        <Badge variant={course.demand === 'Very High' ? 'default' : 'secondary'}>
                                            {course.demand}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-lg">{course.name}</CardTitle>
                                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                            <span>{course.avgSalary}</span>
                                        </div>
                                        <Button variant="outline" size="sm" className="w-full mt-2">
                                            View Details
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-5xl">{course.icon}</span>
                                    <div>
                                        <DialogTitle className="text-2xl">{course.fullName}</DialogTitle>
                                        <DialogDescription>{course.stream.charAt(0).toUpperCase() + course.stream.slice(1)} Stream</DialogDescription>
                                    </div>
                                </div>
                            </DialogHeader>

                            <div className="space-y-4">
                                <p className="text-base">{course.description}</p>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div className="p-3 bg-secondary/50 rounded-lg">
                                        <Clock className="h-5 w-5 mb-1 text-muted-foreground" />
                                        <p className="text-xs text-muted-foreground">Duration</p>
                                        <p className="font-semibold">{course.duration}</p>
                                    </div>
                                    <div className="p-3 bg-secondary/50 rounded-lg">
                                        <TrendingUp className="h-5 w-5 mb-1 text-muted-foreground" />
                                        <p className="text-xs text-muted-foreground">Avg Salary</p>
                                        <p className="font-semibold text-green-600">{course.avgSalary}</p>
                                    </div>
                                    <div className="p-3 bg-secondary/50 rounded-lg">
                                        <Target className="h-5 w-5 mb-1 text-muted-foreground" />
                                        <p className="text-xs text-muted-foreground">Demand</p>
                                        <p className="font-semibold">{course.demand}</p>
                                    </div>
                                    <div className="p-3 bg-secondary/50 rounded-lg">
                                        <BookOpen className="h-5 w-5 mb-1 text-muted-foreground" />
                                        <p className="text-xs text-muted-foreground">Difficulty</p>
                                        <p className="font-semibold">{'⭐'.repeat(course.difficulty)}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-2">Eligibility</h4>
                                    <p className="text-sm text-muted-foreground">{course.eligibility}</p>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-2">Entrance Exams</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {course.entranceExams.map((exam, idx) => (
                                            <Badge key={idx} variant="secondary">{exam}</Badge>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-2">Career Opportunities</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {course.careers.map((career, idx) => (
                                            <Badge key={idx} variant="outline">{career}</Badge>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-2">Skills You'll Learn</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {course.skills.map((skill, idx) => (
                                            <Badge key={idx} variant="secondary">{skill}</Badge>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                                        <GraduationCap className="h-5 w-5" />
                                        Top Government Colleges
                                    </h4>
                                    <ul className="list-disc list-inside space-y-1 text-sm">
                                        {course.topColleges.map((college, idx) => (
                                            <li key={idx}>{college}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-4 border-t">
                                    <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                                        <TrendingUp className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-sm text-blue-900 dark:text-blue-100">Salary Range</p>
                                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                                Average: <strong>{course.avgSalary}</strong> | Top: <strong>{course.topSalary}</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>

            {filteredCourses.length === 0 && (
                <Card>
                    <CardContent className="py-12 text-center">
                        <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">No degrees found matching your search.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
