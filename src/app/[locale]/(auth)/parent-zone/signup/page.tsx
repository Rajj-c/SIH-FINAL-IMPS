'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { signUp } from '@/lib/firebase/auth';
import { Loader2, CheckCircle, User, Mail, Lock, ArrowRight, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getAuthErrorMessage } from '@/lib/auth-errors';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PhoneLoginForm } from '@/components/auth/PhoneLoginForm';
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  mobile: z.string().regex(/^[0-9]{10}$/, { message: 'Please enter a valid 10-digit mobile number.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export default function ParentSignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await signUp({ ...values, userType: 'parent' });
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Sign Up Failed',
        description: getAuthErrorMessage(error),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md mx-auto">
        <Card className="border-0 shadow-xl bg-white/50 backdrop-blur-sm dark:bg-gray-800/50">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-emerald-700">Verify Your Email</CardTitle>
            <CardDescription className="text-base mt-2">
              We've sent a verification link to your email address. Please check your inbox to activate your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-6">
            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-sm text-yellow-800 mb-6">
              <strong className="block mb-1">⚠️ Important</strong>
              If you don't see the email, please check your spam or junk folder.
            </div>
            <Button asChild className="w-full h-11 bg-emerald-600 hover:bg-emerald-700">
              <Link href="/parent-zone/login">
                Back to Parent Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-full mb-4">
          <Heart className="h-6 w-6 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold font-headline tracking-tight text-gray-900 dark:text-gray-100">Create Parent Account</h2>
        <p className="text-muted-foreground mt-2">Join our community of proactive parents</p>
      </div>

      <Card className="border-0 shadow-xl bg-white/50 backdrop-blur-sm dark:bg-gray-800/50">
        <CardContent className="pt-6">
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="phone">Phone</TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="Sunil Kumar" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-muted-foreground text-sm">+91</span>
                            <Input className="pl-10" placeholder="9876543210" maxLength={10} {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" type="password" placeholder="••••••••" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full h-11 text-base mt-2 bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="phone">
              <PhoneLoginForm isSignup={true} userType="parent" />
            </TabsContent>
          </Tabs>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <GoogleLoginButton />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t bg-gray-50/50 dark:bg-gray-900/50 p-6">
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/parent-zone/login" className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
