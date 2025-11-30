'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { sendPasswordReset } from '@/lib/firebase/auth';
import { Loader2, ArrowLeft, Mail, KeyRound, CheckCircle, Heart } from 'lucide-react';

const formSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }),
});

export default function ParentForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            await sendPasswordReset(values.email);
            setSubmitted(true);
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: (error as Error).message || 'An unexpected error occurred.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    }

    if (submitted) {
        return (
            <div className="w-full max-w-md mx-auto">
                <Card className="border-0 shadow-xl bg-white/50 backdrop-blur-sm dark:bg-gray-800/50">
                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="h-8 w-8 text-emerald-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-emerald-700">Check Your Email</CardTitle>
                        <CardDescription className="text-base mt-2">
                            We've sent a password reset link to your email address.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center pb-6">
                        <p className="text-sm text-muted-foreground mb-6">
                            Click the link in the email to reset your password. If you don't see it, check your spam folder.
                        </p>
                        <Button asChild className="w-full h-11 bg-emerald-600 hover:bg-emerald-700">
                            <Link href="/parent-zone/login">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Parent Login
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-full mb-4">
                    <Heart className="h-6 w-6 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold font-headline tracking-tight text-gray-900 dark:text-gray-100">Reset Password</h2>
                <p className="text-muted-foreground mt-2">We'll help you get back to your account</p>
            </div>

            <Card className="border-0 shadow-xl bg-white/50 backdrop-blur-sm dark:bg-gray-800/50">
                <CardContent className="pt-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input className="pl-10" type="email" placeholder="parent@example.com" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full h-11 text-base bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending Link...
                                    </>
                                ) : (
                                    <>
                                        Send Reset Link
                                        <KeyRound className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center border-t bg-gray-50/50 dark:bg-gray-900/50 p-6">
                    <Link href="/parent-zone/login" className="flex items-center text-sm font-medium text-muted-foreground hover:text-emerald-600 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Parent Login
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
