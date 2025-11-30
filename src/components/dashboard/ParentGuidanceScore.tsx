import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { HandHeart } from 'lucide-react';

interface Props {
    score: number;
    breakdown: {
        quizCompleted: boolean;
        savedItems: number;
        profileComplete: boolean;
        resourcesExplored: number;
    };
}

export function ParentGuidanceScore({ score, breakdown }: Props) {
    return (
        <Card className="border-2">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-orange-500 to-rose-500 rounded-lg">
                        <HandHeart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <CardTitle>Parent Guidance Score</CardTitle>
                        <CardDescription>Your engagement level</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-center">
                    <div className="text-5xl font-bold text-orange-500">{score}</div>
                    <div className="text-sm text-muted-foreground">out of 100</div>
                </div>
                <Progress value={score} className="h-3" />
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>Quiz Completed</span>
                        <span className="font-semibold">{breakdown.quizCompleted ? '30' : '0'}/30</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Saved Items</span>
                        <span className="font-semibold">{Math.min(breakdown.savedItems * 4, 20)}/20</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
