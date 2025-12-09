'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Unlock, UserCheck, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { saveMentorshipRequest } from '@/lib/firebase/database';

interface MentorLockCardProps {
    currentScore: number;
    requiredScore?: number;
}

export function MentorLockCard({ currentScore, requiredScore = 75 }: MentorLockCardProps) {
    const isLocked = currentScore < requiredScore;
    const progress = Math.min((currentScore / requiredScore) * 100, 100);

    // Form State
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        course: '',
        noClarity: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await saveMentorshipRequest({
                name: formData.name,
                mobile: formData.mobile,
                email: formData.email,
                topic: formData.course,
                noClarity: formData.noClarity
            });
        } catch (error) {
            console.error("Failed to save request:", error);
        }

        const subject = encodeURIComponent(`Mentorship Request: ${formData.name}`);
        const bodyContent = `
Name: ${formData.name}
Mobile: ${formData.mobile}
Email: ${formData.email}
Query/Interest: ${formData.noClarity ? "I have no clarity on what to choose. Need guidance." : formData.course}

------------------------------------------------
Sent from Digital Guidance Platform Dashboard
        `.trim();

        const body = encodeURIComponent(bodyContent);

        // Open Mail Client
        window.location.href = `mailto:rajeshwarcn@gmail.com?subject=${subject}&body=${body}`;

        // Show success UI (and close after delay)
        setIsSubmitted(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsSubmitted(false); // Reset for next time
            setFormData({ name: '', mobile: '', email: '', course: '', noClarity: false });
        }, 3000);
    };

    return (
        <Card className={`relative overflow-hidden border-2 transition-all duration-300 ${isLocked ? 'border-slate-200 bg-slate-50 opacity-90' : 'border-purple-200 bg-gradient-to-br from-purple-50 to-white shadow-xl'}`}>

            {/* Background Decorations for Unlocked State */}
            {!isLocked && (
                <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                    <Sparkles className="w-32 h-32 text-purple-600" />
                </div>
            )}

            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-headline flex items-center gap-2">
                        {isLocked ? (
                            <div className="p-2 bg-slate-200 rounded-full">
                                <Lock className="w-5 h-5 text-slate-500" />
                            </div>
                        ) : (
                            <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                                <Unlock className="w-5 h-5" />
                            </div>
                        )}
                        <span>Personal Mentorship</span>
                    </CardTitle>
                    {!isLocked && <div className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full border border-purple-200 animate-pulse">UNLOCKED</div>}
                </div>
                <CardDescription>
                    {isLocked
                        ? "Unlock 1-on-1 guidance from industry experts."
                        : "You've earned it! Connect with a mentor today."}
                </CardDescription>
            </CardHeader>

            <CardContent>
                {isLocked ? (
                    <div className="space-y-4">
                        <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
                            <Lock className="w-12 h-12 text-slate-300 mb-2" />
                            <h3 className="font-bold text-slate-700">Content Locked</h3>
                            <p className="text-sm text-muted-foreground max-w-xs">
                                Achieve a Career Readiness Score of <span className="font-bold text-primary">{requiredScore}</span> to unlock this premium feature.
                            </p>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between text-xs font-medium text-slate-600">
                                <span>Progress to Unlock</span>
                                <span>{Math.round(currentScore)} / {requiredScore}</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                            <p className="text-[10px] text-muted-foreground text-center pt-1">
                                {requiredScore - Math.round(currentScore)} more points to go!
                            </p>
                        </div>

                        <Button disabled className="w-full bg-slate-200 text-slate-400 border-slate-200">
                            <Lock className="w-4 h-4 mr-2" /> Locked
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-start gap-3 bg-white/50 p-3 rounded-lg border border-purple-100">
                            <div className="bg-purple-100 p-2 rounded-full shrink-0">
                                <UserCheck className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-purple-900">Your Personal Guide Awaits</h4>
                                <p className="text-xs text-purple-700 mt-1">
                                    Get personalized career advice, roadmap reviews, and resume tips from a verified mentor.
                                </p>
                            </div>
                        </div>

                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-200 group">
                                    <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform" />
                                    Schedule Free Session
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                {isSubmitted ? (
                                    <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center animate-in fade-in zoom-in">
                                        <div className="p-3 bg-green-100 rounded-full">
                                            <CheckCircle2 className="w-12 h-12 text-green-600" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold text-green-800">Opening Email Client...</h3>
                                            <p className="text-sm text-green-600 max-w-xs mx-auto">
                                                Please click <strong>Send</strong> in your email app to complete the request.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <DialogHeader>
                                            <DialogTitle>Book Mentorship Session</DialogTitle>
                                            <DialogDescription>
                                                Fill in your details so our mentors can reach out to you.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleSubmit} className="space-y-4 py-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Full Name</Label>
                                                <Input
                                                    id="name"
                                                    placeholder="Enter your name"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="mobile">Mobile Number</Label>
                                                    <Input
                                                        id="mobile"
                                                        type="tel"
                                                        placeholder="+91..."
                                                        required
                                                        value={formData.mobile}
                                                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email ID</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="you@example.com"
                                                        required
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-3 pt-2 border-t mt-2">
                                                <Label className="text-base font-semibold">What do you need guidance on?</Label>

                                                <div className="space-y-3">
                                                    <div className="flex items-center space-x-2">
                                                        <Input
                                                            id="course"
                                                            placeholder="E.g. B.Tech CS, MBBS, CA..."
                                                            disabled={formData.noClarity}
                                                            value={formData.course}
                                                            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                                            className={formData.noClarity ? "opacity-50 bg-slate-100" : ""}
                                                            required={!formData.noClarity}
                                                        />
                                                    </div>

                                                    <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg border">
                                                        <Checkbox
                                                            id="noClarity"
                                                            checked={formData.noClarity}
                                                            onCheckedChange={(checked) => {
                                                                setFormData(prev => ({
                                                                    ...prev,
                                                                    noClarity: checked === true,
                                                                    course: checked === true ? '' : prev.course
                                                                }))
                                                            }}
                                                        />
                                                        <div className="grid gap-1.5 leading-none">
                                                            <Label
                                                                htmlFor="noClarity"
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                                I have no clarity on what to choose
                                                            </Label>
                                                            <p className="text-[10px] text-muted-foreground">
                                                                Our mentors will help you discover your path.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-4 flex justify-end gap-2">
                                                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                                                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Submit Request</Button>
                                            </div>
                                        </form>
                                    </>
                                )}
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
