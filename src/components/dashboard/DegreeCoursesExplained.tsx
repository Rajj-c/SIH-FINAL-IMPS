'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GraduationCap, Search, ChevronDown, ChevronUp, TrendingUp, DollarSign, Award, Clock } from 'lucide-react';
import { degreeCourses, type DegreeCourse } from '@/lib/degree-courses-data';
import Link from 'next/link';

interface DegreeCoursesExplainedProps {
    recommendedStreams?: string[];
}

export function DegreeCoursesExplained({ recommendedStreams }: DegreeCoursesExplainedProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'govt-exams' | 'high-demand'>('all');

    // Filter courses
    let filteredCourses = degreeCourses;

    if (searchQuery) {
        filteredCourses = filteredCourses.filter(course =>
            course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.whatYouLearn.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    if (selectedFilter === 'govt-exams') {
        filteredCourses = filteredCourses.filter(course => course.goodForGovtExams);
    } else if (selectedFilter === 'high-demand') {
        filteredCourses = filteredCourses.filter(course => course.localDemandRating === 'High');
    }

    // Show recommended courses first if available
    const displayCourses = [...filteredCourses].sort((a, b) => {
        if (recommendedStreams) {
            const aMatch = recommendedStreams.some(stream =>
                a.requiredStream.some(req => req.toLowerCase().includes(stream.toLowerCase()))
            );
            const bMatch = recommendedStreams.some(stream =>
                b.requiredStream.some(req => req.toLowerCase().includes(stream.toLowerCase()))
            );
            if (aMatch && !bMatch) return -1;
            if (!aMatch && bMatch) return 1;
        }
        return 0;
    }).slice(0, 6); // Show top 6 courses

    const toggleExpand = (courseId: string) => {
        setExpandedCourse(expandedCourse === courseId ? null : courseId);
    };

    return (
        <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                        <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <CardTitle>Degree Courses Explained</CardTitle>
                        <CardDescription>Simple explanations for popular courses</CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Search and Filters */}
                <div className="space-y-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant={selectedFilter === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedFilter('all')}
                        >
                            All Courses
                        </Button>
                        <Button
                            variant={selectedFilter === 'govt-exams' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedFilter('govt-exams')}
                        >
                            <Award className="h-3 w-3 mr-1" />
                            Good for Govt Exams
                        </Button>
                        <Button
                            variant={selectedFilter === 'high-demand' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedFilter('high-demand')}
                        >
                            <TrendingUp className="h-3 w-3 mr-1" />
                            High Demand
                        </Button>
                    </div>
                </div>

                {/* Course Cards */}
                <div className="space-y-3">
                    {displayCourses.length > 0 ? (
                        displayCourses.map((course) => (
                            <div
                                key={course.id}
                                className="border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
                            >
                                {/* Course Header */}
                                <div
                                    className="p-4 cursor-pointer hover:bg-secondary/50 transition-colors"
                                    onClick={() => toggleExpand(course.id)}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-start gap-3 flex-1">
                                            <span className="text-3xl">{course.icon}</span>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-sm mb-1">{course.shortName}</h4>
                                                <p className="text-xs text-muted-foreground line-clamp-1">
                                                    {course.name}
                                                </p>
                                                <div className="flex flex-wrap gap-1.5 mt-2">
                                                    <Badge variant="outline" className="text-xs">
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        {course.duration}
                                                    </Badge>
                                                    <Badge
                                                        variant="secondary"
                                                        className={
                                                            course.difficulty === 'Easy'
                                                                ? 'bg-green-100 text-green-700'
                                                                : course.difficulty === 'Medium'
                                                                    ? 'bg-yellow-100 text-yellow-700'
                                                                    : 'bg-red-100 text-red-700'
                                                        }
                                                    >
                                                        {course.difficulty}
                                                    </Badge>
                                                    {course.goodForGovtExams && (
                                                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                                                            <Award className="h-3 w-3 mr-1" />
                                                            Govt Exams
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {expandedCourse === course.id ? (
                                            <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                                        )}
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {expandedCourse === course.id && (
                                    <div className="px-4 pb-4 space-y-3 border-t bg-secondary/20">
                                        <div className="pt-3">
                                            <h5 className="text-xs font-semibold mb-1">What You Learn:</h5>
                                            <p className="text-xs text-muted-foreground">{course.whatYouLearn}</p>
                                        </div>

                                        <div>
                                            <h5 className="text-xs font-semibold mb-1.5">Job Opportunities:</h5>
                                            <div className="flex flex-wrap gap-1.5">
                                                {course.jobOpportunities.slice(0, 4).map((job, idx) => (
                                                    <Badge key={idx} variant="outline" className="text-xs">
                                                        {job}
                                                    </Badge>
                                                ))}
                                                {course.jobOpportunities.length > 4 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{course.jobOpportunities.length - 4} more
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="p-2 bg-background rounded border">
                                                <p className="text-xs text-muted-foreground mb-0.5">Avg. Salary</p>
                                                <p className="text-xs font-semibold flex items-center gap-1">
                                                    <DollarSign className="h-3 w-3 text-green-500" />
                                                    {course.avgSalaryRange}
                                                </p>
                                            </div>
                                            <div className="p-2 bg-background rounded border">
                                                <p className="text-xs text-muted-foreground mb-0.5">Local Demand</p>
                                                <Badge
                                                    variant="secondary"
                                                    className={
                                                        course.localDemandRating === 'High'
                                                            ? 'bg-green-100 text-green-700'
                                                            : course.localDemandRating === 'Medium'
                                                                ? 'bg-yellow-100 text-yellow-700'
                                                                : 'bg-gray-100 text-gray-700'
                                                    }
                                                >
                                                    {course.localDemandRating}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">
                                                <span className="font-semibold">Fees:</span> {course.approxFees}
                                            </p>
                                            {course.goodForGovtExams && (
                                                <p className="text-xs text-blue-600">
                                                    ✓ Eligible for: {course.govtExamsEligible.slice(0, 3).join(', ')}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-sm text-muted-foreground py-8">
                            No courses found matching your search
                        </p>
                    )}
                </div>

                {/* View All Link */}
                {displayCourses.length > 0 && (
                    <div className="text-center pt-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/courses">
                                View All {degreeCourses.length} Courses →
                            </Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
