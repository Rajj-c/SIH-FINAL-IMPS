'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink, Clock } from 'lucide-react';
import { governmentExams } from '@/lib/data/government-exams';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function ExamCalendar() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Calendar className="h-6 w-6 text-primary" />
                        Exam Calendar 2025
                    </h2>
                    <p className="text-muted-foreground">Upcoming government exams and key dates</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {governmentExams.map((exam) => (
                    <Card key={exam.id} className="hover:shadow-md transition-shadow border-l-4 border-l-primary">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <Badge variant="outline" className="mb-2">{exam.category}</Badge>
                                <Badge className={exam.mode === 'Online' ? 'bg-green-500' : 'bg-orange-500'}>
                                    {exam.mode}
                                </Badge>
                            </div>
                            <CardTitle className="text-lg">{exam.name}</CardTitle>
                            <CardDescription className="line-clamp-1" title={exam.fullForm}>
                                {exam.fullForm}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> Exam Date:
                                    </span>
                                    <span className="font-medium text-foreground">{exam.examDate}</span>
                                </div>
                                <div className="flex items-center justify-between text-muted-foreground">
                                    <span>Apply By:</span>
                                    <span className="font-medium text-foreground">{exam.applicationDate}</span>
                                </div>
                                <div className="flex items-center justify-between text-muted-foreground">
                                    <span>Eligibility:</span>
                                    <span className="font-medium text-foreground truncate max-w-[120px]" title={exam.eligibility}>
                                        {exam.eligibility}
                                    </span>
                                </div>

                                <Button asChild variant="outline" size="sm" className="w-full mt-2">
                                    <Link href={exam.website} target="_blank" rel="noopener noreferrer">
                                        Visit Official Site <ExternalLink className="ml-2 h-3 w-3" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
