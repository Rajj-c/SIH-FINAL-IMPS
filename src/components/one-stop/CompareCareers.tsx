'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { X, Plus, TrendingUp, Clock, GraduationCap, IndianRupee, Target } from 'lucide-react';
import type { Course } from '@/lib/courses-database';

interface CompareCareersProps {
    recommendedCourse: Course;
    availableCourses: Course[];
}

export function CompareCareers({ recommendedCourse, availableCourses }: CompareCareersProps) {
    const [selectedCourses, setSelectedCourses] = useState<Course[]>([recommendedCourse]);

    const handleAddCourse = (course: Course) => {
        if (selectedCourses.length < 3 && !selectedCourses.find(c => c.id === course.id)) {
            setSelectedCourses([...selectedCourses, course]);
        }
    };

    const handleRemoveCourse = (courseId: string) => {
        if (courseId !== recommendedCourse.id) { // Can't remove recommended
            setSelectedCourses(selectedCourses.filter(c => c.id !== courseId));
        }
    };

    const remainingSlots = 3 - selectedCourses.length;
    const selectableCourses = availableCourses.filter(
        course => !selectedCourses.find(c => c.id === course.id)
    );

    return (
        <div className="space-y-6">
            {/* Selection Area */}
            <Card>
                <CardHeader>
                    <CardTitle>Select Careers to Compare</CardTitle>
                    <CardDescription>
                        Compare up to 3 careers side-by-side. Your recommended course is locked in slot 1.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Current Selections */}
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        {[0, 1, 2].map(slotIdx => {
                            const course = selectedCourses[slotIdx];
                            const isRecommended = slotIdx === 0;

                            return (
                                <div
                                    key={slotIdx}
                                    className={`p-4 border-2 rounded-lg ${course ? 'border-primary bg-primary/5' : 'border-dashed border-muted-foreground/30'
                                        }`}
                                >
                                    {course ? (
                                        <div>
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-3xl">{course.icon}</span>
                                                    <div>
                                                        <p className="font-semibold text-sm">{course.name}</p>
                                                        {isRecommended && (
                                                            <Badge variant="default" className="text-xs">Recommended</Badge>
                                                        )}
                                                    </div>
                                                </div>
                                                {!isRecommended && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                        onClick={() => handleRemoveCourse(course.id)}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                            <p className="text-xs text-muted-foreground">{course.duration}</p>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <div className="text-center text-muted-foreground">
                                                <Plus className="h-8 w-8 mx-auto mb-1" />
                                                <p className="text-xs">Empty Slot</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Available Courses */}
                    {remainingSlots > 0 && (
                        <div>
                            <h4 className="font-semibold mb-3">
                                Available {recommendedCourse.stream.charAt(0).toUpperCase() + recommendedCourse.stream.slice(1)} Careers ({selectableCourses.length})
                            </h4>
                            <div className="grid md:grid-cols-3 gap-3">
                                {selectableCourses.map(course => (
                                    <Card
                                        key={course.id}
                                        className="border cursor-pointer hover:border-primary hover:shadow-md transition-all"
                                        onClick={() => handleAddCourse(course)}
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-2xl">{course.icon}</span>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-sm">{course.name}</p>
                                                    <p className="text-xs text-muted-foreground">{course.duration}</p>
                                                </div>
                                            </div>
                                            <Button size="sm" variant="outline" className="w-full">
                                                <Plus className="h-4 w-4 mr-1" />
                                                Add to Compare
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Comparison Table */}
            {selectedCourses.length >= 2 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Detailed Comparison</CardTitle>
                        <CardDescription>Side-by-side analysis of your selected careers</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[200px]">Feature</TableHead>
                                        {selectedCourses.map(course => (
                                            <TableHead key={course.id} className="text-center">
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className="text-2xl">{course.icon}</span>
                                                    <span className="font-semibold">{course.name}</span>
                                                    {course.id === recommendedCourse.id && (
                                                        <Badge variant="default" className="text-xs">Recommended</Badge>
                                                    )}
                                                </div>
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                Duration
                                            </div>
                                        </TableCell>
                                        {selectedCourses.map(course => (
                                            <TableCell key={course.id} className="text-center">{course.duration}</TableCell>
                                        ))}
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="font-medium">Eligibility</TableCell>
                                        {selectedCourses.map(course => (
                                            <TableCell key={course.id} className="text-center text-sm">{course.eligibility}</TableCell>
                                        ))}
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-sm">Rs.</span>
                                                Avg Salary
                                            </div>
                                        </TableCell>
                                        {selectedCourses.map(course => (
                                            <TableCell key={course.id} className="text-center font-semibold text-green-600">
                                                {course.avgSalary}
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="h-4 w-4" />
                                                Top Salary
                                            </div>
                                        </TableCell>
                                        {selectedCourses.map(course => (
                                            <TableCell key={course.id} className="text-center font-semibold text-green-700">
                                                {course.topSalary}
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="h-4 w-4" />
                                                Job Demand
                                            </div>
                                        </TableCell>
                                        {selectedCourses.map(course => (
                                            <TableCell key={course.id} className="text-center">
                                                <Badge variant={course.demand === 'Very High' ? 'default' : 'secondary'}>
                                                    {course.demand}
                                                </Badge>
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <Target className="h-4 w-4" />
                                                Difficulty
                                            </div>
                                        </TableCell>
                                        {selectedCourses.map(course => (
                                            <TableCell key={course.id} className="text-center">
                                                {'⭐'.repeat(course.difficulty)}
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="font-medium">Entrance Exams</TableCell>
                                        {selectedCourses.map(course => (
                                            <TableCell key={course.id} className="text-center text-sm">
                                                {course.entranceExams.join(', ')}
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <GraduationCap className="h-4 w-4" />
                                                Top Colleges
                                            </div>
                                        </TableCell>
                                        {selectedCourses.map(course => (
                                            <TableCell key={course.id} className="text-sm">
                                                <ul className="list-disc list-inside text-left">
                                                    {course.topColleges.slice(0, 3).map((college, idx) => (
                                                        <li key={idx}>{college}</li>
                                                    ))}
                                                </ul>
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="font-medium">Career Paths</TableCell>
                                        {selectedCourses.map(course => (
                                            <TableCell key={course.id} className="text-sm">
                                                <div className="flex flex-wrap gap-1">
                                                    {course.careers.slice(0, 3).map((career, idx) => (
                                                        <Badge key={idx} variant="outline" className="text-xs">
                                                            {career}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="font-medium">Skills Required</TableCell>
                                        {selectedCourses.map(course => (
                                            <TableCell key={course.id} className="text-sm">
                                                <div className="flex flex-wrap gap-1">
                                                    {course.skills.slice(0, 3).map((skill, idx) => (
                                                        <Badge key={idx} variant="secondary" className="text-xs">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
