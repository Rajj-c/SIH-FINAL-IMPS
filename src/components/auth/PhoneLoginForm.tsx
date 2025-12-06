'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { Loader2, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "../ui/input-otp"

const phoneSchema = z.object({
    phoneNumber: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
});

const otpSchema = z.object({
    otp: z.string().length(6, { message: 'OTP must be 6 digits.' }),
});

export function PhoneLoginForm({ isSignup = false, userType }: { isSignup?: boolean; userType?: 'student' | 'parent' }) {
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [isLoading, setIsLoading] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const { toast } = useToast();
    const { startPhoneLogin, completePhoneLogin, setupRecaptcha } = useAuth();
    const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);

    useEffect(() => {
        // Initialize Recaptcha on mount
        const verifier = setupRecaptcha('recaptcha-container');
        setRecaptchaVerifier(verifier);
    }, [setupRecaptcha]);

    const phoneForm = useForm<z.infer<typeof phoneSchema>>({
        resolver: zodResolver(phoneSchema),
        defaultValues: {
            phoneNumber: '',
        },
    });

    const otpForm = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: '',
        },
    });

    async function onPhoneSubmit(values: z.infer<typeof phoneSchema>) {
        if (!recaptchaVerifier) return;
        setIsLoading(true);
        try {
            // Format phone number to E.164 format (assuming India +91 for now, or user enters it)
            // Basic check: if it doesn't start with +, add +91
            let formattedPhone = values.phoneNumber;
            if (!formattedPhone.startsWith('+')) {
                formattedPhone = `+91${formattedPhone}`;
            }

            const result = await startPhoneLogin(formattedPhone, recaptchaVerifier);
            setConfirmationResult(result);
            setStep('otp');
            toast({
                title: 'OTP Sent',
                description: `We sent a verification code to ${formattedPhone}`,
            });
        } catch (error: any) {
            console.error(error);

            let errorMessage = error.message || 'Please check the phone number and try again.';
            let errorTitle = 'Failed to send OTP';

            if (error.code === 'auth/billing-not-enabled') {
                errorTitle = 'Invalid Phone Number';
                errorMessage = 'Please enter your correct mobile number.';
            }

            toast({
                title: errorTitle,
                description: errorMessage,
                variant: 'destructive',
            });
            // Reset recaptcha if it failed, as it might be consumed
            if (recaptchaVerifier) {
                recaptchaVerifier.clear();
                const newVerifier = setupRecaptcha('recaptcha-container');
                setRecaptchaVerifier(newVerifier);
            }
        } finally {
            setIsLoading(false);
        }
    }

    async function onOtpSubmit(values: z.infer<typeof otpSchema>) {
        if (!confirmationResult) return;
        setIsLoading(true);
        try {
            if (isSignup && userType) {
                sessionStorage.setItem('signup_user_type', userType);
            }
            await completePhoneLogin(confirmationResult, values.otp, isSignup);
            toast({
                title: 'Verified!',
                description: "Successfully logged in.",
            });
            // Redirect is handled by useAuth
        } catch (error: any) {
            console.error(error);
            toast({
                title: 'Invalid OTP',
                description: 'The code you entered is incorrect. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <div id="recaptcha-container"></div>

            {step === 'phone' ? (
                <Form {...phoneForm}>
                    <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
                        <FormField
                            control={phoneForm.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                className="pl-10"
                                                placeholder="9876543210"
                                                type="tel"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending OTP...
                                </>
                            ) : (
                                <>
                                    Send OTP
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            ) : (
                <Form {...otpForm}>
                    <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4" autoComplete="off">
                        {/* Hidden inputs to trick browser autofill */}
                        <input type="text" name="fake_username" style={{ display: 'none' }} aria-hidden="true" />
                        <input type="password" name="fake_password" style={{ display: 'none' }} aria-hidden="true" />

                        <FormField
                            control={otpForm.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter Verification Code</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field} autoFocus>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Verify & Login
                                    <CheckCircle2 className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            className="w-full"
                            onClick={() => setStep('phone')}
                            disabled={isLoading}
                        >
                            Change Phone Number
                        </Button>
                    </form>
                </Form>
            )}
        </div>
    );
}
