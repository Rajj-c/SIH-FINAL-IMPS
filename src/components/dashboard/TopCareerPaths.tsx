'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Compass, Clock, TrendingUp } from 'lucide-react';
import { CareerPathNode } from '@/lib/types';

interface TopCareerPathsProps {
    paths: CareerPathNode[];
}

export function TopCareerPaths({ paths }: TopCareerPathsProps) {
    if (paths.length === 0) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-headline flex items-center gap-2">
                    <Compass className="h-5 w-5 text-primary" />
                    Recommended Career Paths
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {paths.slice(0, 3).map((path, idx) => (
                    <div
                        key={idx}
                        className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-semibold">{path.name}</h4>
                                    <Badge variant="secondary" className="text-xs">
                                        {path.type}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    {path.duration && (
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            {path.duration}
                                        </div>
                                    )}
                                    {path.salary && (
                                        <div className="flex items-center gap-1">
                                            <TrendingUp className="h-3 w-3" />
                                            {path.salary}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <Button asChild variant="outline" className="w-full">
                    <Link href="/career-paths">View All Career Paths</Link>
                </Button>
            </CardContent>
        </Card>
    );
}
