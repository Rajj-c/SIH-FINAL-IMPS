'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
    GraduationCap,
    Heart,
    MapPin,
    Languages,
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    Sparkles,
    Loader2
} from 'lucide-react';
import { ParentOnboardingData } from '@/lib/types';

interface ParentOnboardingProps {
    onComplete: (data: ParentOnboardingData) => Promise<void>;
    onSkip?: () => void;
    loading?: boolean;
}

const INTERESTS_OPTIONS = [
    { id: 'mathematics', label: 'Mathematics & Numbers', icon: '🔢' },
    { id: 'science', label: 'Science & Experiments', icon: '🔬' },
    { id: 'technology', label: 'Technology & Computers', icon: '💻' },
    { id: 'arts', label: 'Arts & Creativity', icon: '🎨' },
    { id: 'music', label: 'Music & Dance', icon: '🎵' },
    { id: 'sports', label: 'Sports & Physical Activity', icon: '⚽' },
    { id: 'reading', label: 'Reading & Writing', icon: '📚' },
    { id: 'business', label: 'Business & Entrepreneurship', icon: '💼' },
    { id: 'social', label: 'Social Service & Helping Others', icon: '🤝' },
    { id: 'nature', label: 'Nature & Environment', icon: '🌱' },
    { id: 'language', label: 'Languages & Communication', icon: '🗣️' },
    { id: 'mechanical', label: 'Building & Fixing Things', icon: '🔧' }
];

const INDIAN_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

export function ParentOnboarding({ onComplete, onSkip, loading = false }: ParentOnboardingProps) {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<Partial<ParentOnboardingData>>({
        childInterests: []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const totalSteps = 5;
    const progress = (step / totalSteps) * 100;

    const handleNext = async () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            await handleComplete();
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleComplete = async () => {
        if (data.childClass && data.location?.state && data.location?.district && data.preferredLanguage) {
            setIsSubmitting(true);
            try {
                await onComplete({
                    childClass: data.childClass,
                    childInterests: data.childInterests || [],
                    location: {
                        state: data.location.state,
                        district: data.location.district,
                        pincode: data.location.pincode
                    },
                    preferredLanguage: data.preferredLanguage,
                    childName: data.childName,
                    completedAt: new Date()
                });
            } catch (error) {
                console.error('Error completing onboarding:', error);
                setIsSubmitting(false);
            }
        }
    };

    const toggleInterest = (interestId: string) => {
        const current = data.childInterests || [];
        const updated = current.includes(interestId)
            ? current.filter(id => id !== interestId)
            : [...current, interestId];
        setData({ ...data, childInterests: updated });
    };

    const canProceed = () => {
        switch (step) {
            case 1:
                return !!data.childClass;
            case 2:
                return (data.childInterests?.length || 0) >= 2;
            case 3:
                return !!data.location?.state && !!data.location?.district;
            case 4:
                return !!data.preferredLanguage;
            case 5:
                return true; // Summary step
            default:
                return false;
        }
    };

    if (isSubmitting || loading) {
        return (
            <div className="w-full max-w-3xl mx-auto px-4">
                <Card className="shadow-2xl border-2 text-center p-8">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-headline">Saving your information...</h2>
                    <p className="text-muted-foreground">Please wait a moment</p>
                </Card>
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto px-4">
            <Card className="shadow-2xl border-2">
                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gradient-to-br from-orange-500 to-rose-500 rounded-lg">
                            <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-headline">Welcome to Parent Zone!</CardTitle>
                            <CardDescription>Let's understand your child's needs</CardDescription>
                        </div>
                    </div>
                    <div className="pt-4">
                        <Progress value={progress} className="h-2" />
                        <p className="text-sm text-muted-foreground mt-2 text-center">
                            Step {step} of {totalSteps}
                        </p>
                    </div>
                </CardHeader>

                <CardContent className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Child's Class */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-6">
                                    <GraduationCap className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold">Which class has your child completed?</h3>
                                    <p className="text-muted-foreground mt-2">This helps us provide age-appropriate guidance</p>
                                </div>

                                <RadioGroup
                                    value={data.childClass}
                                    onValueChange={(value) => setData({ ...data, childClass: value as any })}
                                    className="grid grid-cols-2 md:grid-cols-3 gap-4"
                                >
                                    {['8', '9', '10', '11', '12'].map((cls) => (
                                        <div key={cls}>
                                            <RadioGroupItem
                                                value={cls}
                                                id={`class-${cls}`}
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor={`class-${cls}`}
                                                className="flex flex-col items-center justify-center p-6 border-2 rounded-lg cursor-pointer hover:bg-secondary transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                                            >
                                                <span className="text-3xl font-bold mb-2">{cls}</span>
                                                <span className="text-sm text-muted-foreground">Class {cls}th</span>
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </motion.div>
                        )}

                        {/* Step 2: Child's Interests */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-6">
                                    <Heart className="h-16 w-16 text-rose-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold">What does your child enjoy?</h3>
                                    <p className="text-muted-foreground mt-2">Select at least 2 interests (You can select multiple)</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {INTERESTS_OPTIONS.map((interest) => {
                                        const isSelected = data.childInterests?.includes(interest.id);
                                        return (
                                            <button
                                                key={interest.id}
                                                onClick={() => toggleInterest(interest.id)}
                                                className={`p-4 border-2 rounded-lg text-left transition-all hover:shadow-md ${isSelected
                                                    ? 'border-primary bg-primary/5'
                                                    : 'border-border hover:border-primary/50'
                                                    }`}
                                            >
                                                <div className="flex items-start gap-2">
                                                    <span className="text-2xl">{interest.icon}</span>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium leading-tight">{interest.label}</p>
                                                        {isSelected && (
                                                            <CheckCircle2 className="h-4 w-4 text-primary mt-1" />
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="text-center">
                                    <Badge variant="secondary">
                                        {data.childInterests?.length || 0} selected
                                    </Badge>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Location */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-6">
                                    <MapPin className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold">Where are you located?</h3>
                                    <p className="text-muted-foreground mt-2">This helps us show nearby colleges and opportunities</p>
                                </div>

                                <div className="space-y-4 max-w-md mx-auto">
                                    <div>
                                        <Label htmlFor="state">State *</Label>
                                        <select
                                            id="state"
                                            className="w-full mt-1.5 p-2.5 border rounded-md bg-background"
                                            value={data.location?.state || ''}
                                            onChange={(e) => setData({
                                                ...data,
                                                location: { ...data.location, state: e.target.value, district: '' }
                                            })}
                                        >
                                            <option value="">Select State</option>
                                            {INDIAN_STATES.map(state => (
                                                <option key={state} value={state}>{state}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <Label htmlFor="district">District *</Label>
                                        <Input
                                            id="district"
                                            placeholder="Enter your district"
                                            value={data.location?.district || ''}
                                            onChange={(e) => setData({
                                                ...data,
                                                location: { state: data.location?.state || '', district: e.target.value, pincode: data.location?.pincode }
                                            })}
                                            className="mt-1.5"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="pincode">Pincode (Optional)</Label>
                                        <Input
                                            id="pincode"
                                            placeholder="Enter pincode"
                                            value={data.location?.pincode || ''}
                                            onChange={(e) => setData({
                                                ...data,
                                                location: { state: data.location?.state || '', district: data.location?.district || '', pincode: e.target.value }
                                            })}
                                            className="mt-1.5"
                                            maxLength={6}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Preferred Language */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-6">
                                    <Languages className="h-16 w-16 text-green-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold">Preferred Language</h3>
                                    <p className="text-muted-foreground mt-2">Choose your preferred language for resources</p>
                                </div>

                                <RadioGroup
                                    value={data.preferredLanguage}
                                    onValueChange={(value) => setData({ ...data, preferredLanguage: value as any })}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto"
                                >
                                    {[
                                        { value: 'English', label: 'English', icon: '🇬🇧' },
                                        { value: 'Hindi', label: 'हिंदी (Hindi)', icon: '🇮🇳' },
                                        { value: 'Regional', label: 'Regional Language', icon: '🗣️' }
                                    ].map((lang) => (
                                        <div key={lang.value}>
                                            <RadioGroupItem
                                                value={lang.value}
                                                id={`lang-${lang.value}`}
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor={`lang-${lang.value}`}
                                                className="flex flex-col items-center justify-center p-6 border-2 rounded-lg cursor-pointer hover:bg-secondary transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                                            >
                                                <span className="text-4xl mb-3">{lang.icon}</span>
                                                <span className="font-medium">{lang.label}</span>
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </motion.div>
                        )}

                        {/* Step 5: Summary & Optional Name */}
                        {step === 5 && (
                            <motion.div
                                key="step5"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-6">
                                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold">Almost Done!</h3>
                                    <p className="text-muted-foreground mt-2">Review your information</p>
                                </div>

                                <div className="space-y-4 max-w-md mx-auto">
                                    <div className="p-4 bg-secondary/50 rounded-lg">
                                        <p className="text-sm text-muted-foreground">Child's Class</p>
                                        <p className="font-semibold">Class {data.childClass}th</p>
                                    </div>

                                    <div className="p-4 bg-secondary/50 rounded-lg">
                                        <p className="text-sm text-muted-foreground">Interests ({data.childInterests?.length})</p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {data.childInterests?.map(id => {
                                                const interest = INTERESTS_OPTIONS.find(i => i.id === id);
                                                return (
                                                    <Badge key={id} variant="secondary">
                                                        {interest?.icon} {interest?.label}
                                                    </Badge>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="p-4 bg-secondary/50 rounded-lg">
                                        <p className="text-sm text-muted-foreground">Location</p>
                                        <p className="font-semibold">{data.location?.district}, {data.location?.state}</p>
                                    </div>

                                    <div className="p-4 bg-secondary/50 rounded-lg">
                                        <p className="text-sm text-muted-foreground">Preferred Language</p>
                                        <p className="font-semibold">{data.preferredLanguage}</p>
                                    </div>

                                    <div className="pt-4">
                                        <Label htmlFor="childName">Child's Name (Optional)</Label>
                                        <Input
                                            id="childName"
                                            placeholder="Enter your child's name"
                                            value={data.childName || ''}
                                            onChange={(e) => setData({ ...data, childName: e.target.value })}
                                            className="mt-1.5"
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">
                                            This helps us personalize the experience
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>

                <CardFooter className="flex justify-between border-t pt-6">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={step === 1}
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>

                    <div className="flex gap-2">
                        {onSkip && step === 1 && (
                            <Button variant="ghost" onClick={onSkip}>
                                Skip for now
                            </Button>
                        )}
                        <Button
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className="bg-gradient-to-r from-orange-500 to-rose-500"
                        >
                            {step === totalSteps ? (
                                <>
                                    Complete <CheckCircle2 className="h-4 w-4 ml-2" />
                                </>
                            ) : (
                                <>
                                    Next <ChevronRight className="h-4 w-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
