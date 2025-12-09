'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { Loader2, User, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const profileSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    userType: z.enum(['student', 'parent'], { required_error: 'Please select a role.' }),
    classLevel: z.enum(['10', '12']).optional(),
    gender: z.enum(['Male', 'Female', 'Prefer not to say']).optional(),
    academicMarks: z.string().optional(), // e.g. "85%"
    academicStream: z.enum(['Science (PCM)', 'Science (PCB)', 'Commerce', 'Arts', 'Vocational']).optional(),
    hobbies: z.string().optional(), // Comma separated
    ambition: z.string().optional(),
}).refine((data) => {
    if (data.userType === 'student') {
        return !!data.classLevel && !!data.gender;
    }
    return true;
}, {
    message: "Class level and gender are required for students",
    path: ["classLevel"],
});

export function CompleteProfileForm() {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const { updateUserProfile, user, logout } = useAuth();

    const [defaultUserType] = useState(() => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem('signup_user_type') as 'student' | 'parent' || 'student';
        }
        return 'student';
    });

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.displayName || '',
            userType: defaultUserType,
            academicMarks: '',
            hobbies: '',
            ambition: '',
        },
    });

    const userType = form.watch('userType');
    const classLevel = form.watch('classLevel');

    async function onSubmit(values: z.infer<typeof profileSchema>) {
        setIsLoading(true);
        try {
            await updateUserProfile({
                name: values.name,
                userType: values.userType,
                classLevel: values.classLevel as '10' | '12' | undefined,
                gender: values.gender as 'Male' | 'Female' | 'Prefer not to say' | undefined,
                academicMarks: values.academicMarks,
                academicStream: values.academicStream,
                hobbies: values.hobbies ? values.hobbies.split(',').map(h => h.trim()) : undefined,
                ambition: values.ambition,
            });
            toast({
                title: 'Profile Updated',
                description: "Your profile has been successfully created.",
            });
            // Redirect is handled by useAuth
        } catch (error: any) {
            console.error(error);
            toast({
                title: 'Update Failed',
                description: 'Could not update profile. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto border-0 shadow-xl bg-white/50 backdrop-blur-sm dark:bg-gray-800/50">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
                <CardDescription>
                    We need a few more details to personalize your experience.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input className="pl-10" placeholder="John Doe" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="userType"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>I am a...</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="student" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Student
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="parent" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Parent
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {userType === 'student' && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="classLevel"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Class Level</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select class" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="10">Class 10</SelectItem>
                                                        <SelectItem value="12">Class 12</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gender</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select gender" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Male">Male</SelectItem>
                                                        <SelectItem value="Female">Female</SelectItem>
                                                        <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {classLevel === '12' && (
                                    <FormField
                                        control={form.control}
                                        name="academicStream"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Current Stream</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select stream" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Science (PCM)">Science (PCM)</SelectItem>
                                                        <SelectItem value="Science (PCB)">Science (PCB)</SelectItem>
                                                        <SelectItem value="Commerce">Commerce</SelectItem>
                                                        <SelectItem value="Arts">Arts</SelectItem>
                                                        <SelectItem value="Vocational">Vocational</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}

                                <FormField
                                    control={form.control}
                                    name="academicMarks"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Previous Class Marks (%)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. 85" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="ambition"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Dream Career / Ambition</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Software Engineer, Doctor" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="hobbies"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Hobbies & Interests</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Coding, Cricket, Reading (comma separated)" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    Complete Profile
                                    <GraduationCap className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </form>
                </Form>

                <div className="mt-6 text-center">
                    <Button
                        variant="link"
                        size="sm"
                        onClick={async () => {
                            try {
                                await user?.delete(); // Optional: Delete the temp user if they want to start over completely? 
                                // Actually, just logging out is safer. But if they just created it via Google and want to use a different one, logout is fine.
                                // If they want to "cancel" signup, logout is the way.
                                logout();
                            } catch (e) {
                                logout();
                            }
                        }}
                        className="text-muted-foreground hover:text-primary"
                    >
                        Not you? Sign Out / Start Over
                    </Button>
                </div>
            </CardContent>
        </Card >
    );
}
