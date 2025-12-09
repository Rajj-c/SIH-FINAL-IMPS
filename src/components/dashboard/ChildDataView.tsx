'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfile } from '@/lib/types';
import { GraduationCap, Compass, Map, Coins, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect, useState } from 'react';
import { getSavedColleges, getSavedCareerPaths } from '@/lib/firebase/database';
import { College, CareerPathNode } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

interface ChildDataViewProps {
    childProfile: UserProfile;
}

export function ChildDataView({ childProfile }: ChildDataViewProps) {
    const [colleges, setColleges] = useState<College[]>([]);
    const [paths, setPaths] = useState<CareerPathNode[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (!childProfile.uid) return;
            try {
                const [fetchedColleges, fetchedPaths] = await Promise.all([
                    getSavedColleges(childProfile.uid),
                    getSavedCareerPaths(childProfile.uid)
                ]);
                setColleges(fetchedColleges);
                setPaths(fetchedPaths);
            } catch (error) {
                console.error("Failed to fetch child data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [childProfile]);

    if (loading) {
        return <Skeleton className="h-[400px] w-full rounded-xl" />;
    }

    return (
        <div className="space-y-6">
            <Card className="bg-gradient-to-r from-primary/5 to-transparent border-l-4 border-l-primary/50">
                <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-2 font-headline">Synced with {childProfile.name}</h3>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>Class {childProfile.classLevel}</span>
                        <span>•</span>
                        <span>{colleges.length} Saved Colleges</span>
                        <span>•</span>
                        <span>{paths.length} Career Goals</span>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Saved Colleges */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-primary" />
                            Saved Colleges
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {colleges.length > 0 ? (
                            <div className="space-y-4">
                                {colleges.slice(0, 3).map((college) => (
                                    <div key={college.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                                        <div>
                                            <h4 className="font-semibold">{college.name}</h4>
                                            <p className="text-sm text-muted-foreground">{college.district}, {college.state}</p>
                                            {college.fee && (
                                                <Badge variant="outline" className="mt-1 text-xs">
                                                    <Coins className="mr-1 h-3 w-3" />
                                                    {college.fee}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {colleges.length > 3 && (
                                    <p className="text-sm text-muted-foreground text-center pt-2">
                                        +{colleges.length - 3} more saved
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                <GraduationCap className="h-10 w-10 mx-auto mb-2 opacity-20" />
                                <p>No colleges saved yet.</p>
                            </div>
                        )}
                        {colleges.length > 0 && (
                            <div className="mt-4 pt-4 border-t">
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href={`/parent-zone/financial-tools?child=${childProfile.uid}`}>
                                        <Coins className="mr-2 h-4 w-4" />
                                        Compare Fees
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Career Paths */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Compass className="h-5 w-5 text-amber-500" />
                            Career Goals
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {paths.length > 0 ? (
                            <div className="space-y-4">
                                {paths.slice(0, 3).map((path) => (
                                    <div key={path.name} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                                        <div>
                                            <h4 className="font-semibold">{path.name}</h4>
                                            <Badge variant="secondary" className="mt-1 text-xs">{path.type}</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                <Compass className="h-10 w-10 mx-auto mb-2 opacity-20" />
                                <p>No career paths saved yet.</p>
                            </div>
                        )}
                        {paths.length > 0 && (
                            <div className="mt-4 pt-4 border-t">
                                <Button variant="ghost" className="w-full text-muted-foreground" disabled>
                                    View Full Roadmap (Coming Soon)
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
