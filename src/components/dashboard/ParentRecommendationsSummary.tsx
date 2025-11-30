import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface Props {
    suggestedPath: string;
    reasoning: string;
    nextSteps: string[];
}

export function ParentRecommendationsSummary({ suggestedPath, reasoning, nextSteps }: Props) {
    return (
        <Card className="border-2">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-orange-500" />
                    <CardTitle>AI Recommendation</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-orange-500 to-rose-500 rounded-lg">
                    <h3 className="text-xl font-bold text-white">{suggestedPath}</h3>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Why this path?</h4>
                    <p className="text-sm text-muted-foreground">{reasoning}</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Next Steps</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        {nextSteps.slice(0, 3).map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
