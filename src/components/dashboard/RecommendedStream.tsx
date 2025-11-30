'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

interface RecommendedStreamProps {
    stream: 'Science' | 'Commerce' | 'Arts' | null;
    confidence: 'High' | 'Medium' | 'Low';
}

const streamInfo = {
    Science: {
        icon: '🔬',
        color: 'bg-blue-100 text-blue-700 border-blue-300',
        description: 'Perfect for analytical minds who love problem-solving and innovation',
        careers: ['Engineer', 'Doctor', 'Scientist', 'Researcher'],
    },
    Commerce: {
        icon: '💼',
        color: 'bg-green-100 text-green-700 border-green-300',
        description: 'Ideal for those interested in business, finance, and entrepreneurship',
        careers: ['CA', 'Manager', 'Entrepreneur', 'Banker'],
    },
    Arts: {
        icon: '🎨',
        color: 'bg-purple-100 text-purple-700 border-purple-300',
        description: 'Great for creative thinkers passionate about expression and communication',
        careers: ['Designer', 'Journalist', 'Lawyer', 'Artist'],
    },
};

export function RecommendedStream({ stream, confidence }: RecommendedStreamProps) {
    if (!stream) {
        return (
            <Card className="border-2 border-dashed">
                <CardContent className="pt-6 text-center">
                    <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Take the Quiz to Get Personalized Recommendations</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Our aptitude quiz analyzes your strengths and interests to suggest the best stream for you
                    </p>
                    <Button asChild>
                        <Link href="/quiz">
                            Start Quiz <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }

    const info = streamInfo[stream];

    return (
        <Card className={`border-2 ${info.color}`}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-headline flex items-center gap-2">
                        <span className="text-3xl">{info.icon}</span>
                        Your Recommended Stream
                    </CardTitle>
                    <Badge variant={confidence === 'High' ? 'default' : 'secondary'}>
                        {confidence} Confidence
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="text-2xl font-bold mb-2">{stream} Stream</h3>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                </div>

                <div>
                    <p className="text-sm font-semibold mb-2">Popular Career Options:</p>
                    <div className="flex flex-wrap gap-2">
                        {info.careers.map((career) => (
                            <Badge key={career} variant="outline">
                                {career}
                            </Badge>
                        ))}
                    </div>
                </div>

                <Button asChild className="w-full">
                    <Link href="/career-paths">
                        Explore {stream} Career Paths <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}
