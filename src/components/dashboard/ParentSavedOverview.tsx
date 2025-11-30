import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bookmark } from 'lucide-react';
import Link from 'next/link';

interface Props {
    savedCollegesCount: number;
    savedCareerPathsCount: number;
}

export function ParentSavedOverview({ savedCollegesCount, savedCareerPathsCount }: Props) {
    const total = savedCollegesCount + savedCareerPathsCount;

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Bookmark className="h-5 w-5" />
                    <div>
                        <CardTitle>Saved Items</CardTitle>
                        <CardDescription>{total} items tracked</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Colleges</span>
                        <span className="font-bold text-orange-500">{savedCollegesCount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Career Paths</span>
                        <span className="font-bold text-blue-500">{savedCareerPathsCount}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
