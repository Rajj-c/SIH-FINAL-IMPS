'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, BookOpen, ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { useChat } from '@/hooks/use-chat';

interface SmartGuidanceProps {
    recommendedCourse?: {
        name: string;
        stream: string;
    };
}

export function SmartGuidance({ recommendedCourse }: SmartGuidanceProps) {
    const { sendMessage, toggleChat, isOpen } = useChat();

    const handleQuestionClick = (question: string) => {
        if (!isOpen) {
            toggleChat();
        }
        // Small delay to allow chat window to open
        setTimeout(() => {
            sendMessage(question);
        }, 300);
    };

    const suggestedQuestions = recommendedCourse ? [
        `What's the difference between ${recommendedCourse.name} and other similar courses?`,
        `How do I prepare for entrance exams for ${recommendedCourse.name}?`,
        `What are the best government colleges for ${recommendedCourse.name}?`,
        `What skills should I develop for ${recommendedCourse.stream} stream?`,
    ] : [
        "What can I do after Science in 12th?",
        "Which stream is best for me?",
        "What's the difference between B.Tech and B.E.?",
        "How do I prepare for JEE?",
    ];

    return (
        <div className="space-y-6">
            {/* CareerMitra AI Chat Integration */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageCircle className="h-6 w-6 text-primary" />
                        Ask CareerMitra AI
                    </CardTitle>
                    <CardDescription>
                        Get personalized answers to your career questions
                        {recommendedCourse && ` about ${recommendedCourse.name}`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-6 border-2 border-dashed rounded-lg text-center bg-secondary/20">
                        <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
                        <p className="text-muted-foreground mb-4">
                            Click the CareerMitra chatbot button in the bottom-right corner to start chatting with AI
                        </p>
                        <Badge variant="outline" className="mb-2">💬 Available 24/7</Badge>
                    </div>
                </CardContent>
            </Card>

            {/* Suggested Questions */}
            <Card>
                <CardHeader>
                    <CardTitle>Suggested Questions</CardTitle>
                    <CardDescription>Common questions students ask about {recommendedCourse?.stream || 'career planning'}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {suggestedQuestions.map((question, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleQuestionClick(question)}
                                className="p-3 border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer active:scale-95"
                            >
                                <p className="text-sm flex items-center justify-between">
                                    {question}
                                    <MessageCircle className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Resources */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-6 w-6" />
                        Helpful Resources
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Card className="border-2">
                            <CardContent className="pt-6">
                                <h4 className="font-semibold mb-2">Study Materials</h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Free e-books and study guides for entrance exams
                                </p>
                                <Button asChild variant="outline" size="sm" className="w-full">
                                    <Link href="/resources">
                                        View Resources <ExternalLink className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-2">
                            <CardContent className="pt-6">
                                <h4 className="font-semibold mb-2">College Finder</h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Search for government colleges near you
                                </p>
                                <Button asChild variant="outline" size="sm" className="w-full">
                                    <Link href="/colleges">
                                        Find Colleges <ExternalLink className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-2">
                            <CardContent className="pt-6">
                                <h4 className="font-semibold mb-2">Timeline Tracker</h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Important admission and exam deadlines
                                </p>
                                <Button asChild variant="outline" size="sm" className="w-full">
                                    <Link href="/timeline">
                                        View Timeline <ExternalLink className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
