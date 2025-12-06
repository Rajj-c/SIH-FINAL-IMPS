'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, GraduationCap, ArrowRight } from 'lucide-react';
import { College } from '@/lib/types';

interface NearbyCollegesProps {
    colleges: College[];
    userState?: string;
}

export function NearbyColleges({ colleges, userState }: NearbyCollegesProps) {
    // Filter colleges by user's state if available, otherwise show top colleges
    const filteredColleges = userState
        ? colleges.filter((c) => c.state === userState).slice(0, 3)
        : colleges.slice(0, 3);

    if (filteredColleges.length === 0) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-headline flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    {userState ? `Colleges in ${userState}` : 'Top Government Colleges'}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {filteredColleges.map((college) => (
                    <div
                        key={college.id}
                        className="flex gap-4 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                        <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                                src={college.imageUrl}
                                alt={college.name}
                                fill
                                className="object-cover"
                                data-ai-hint="college building"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm mb-1 truncate">{college.name}</h4>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                                <MapPin className="h-3 w-3" />
                                {college.district !== 'Unknown' ? college.district : 'Nearby'}
                                {college.state !== 'Unknown' ? `, ${college.state}` : ''}
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {college.courses.slice(0, 2).map((course) => (
                                    <Badge key={course} variant="secondary" className="text-xs">
                                        {course}
                                    </Badge>
                                ))}
                                {college.courses.length > 2 && (
                                    <Badge variant="secondary" className="text-xs">
                                        +{college.courses.length - 2}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <Button asChild variant="outline" className="w-full">
                    <Link href="/colleges">
                        View All Colleges <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}
