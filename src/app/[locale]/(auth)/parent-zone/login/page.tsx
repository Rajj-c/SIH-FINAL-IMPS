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
import { signIn } from '@/lib/firebase/auth';
import { Loader2, Mail, Lock, ArrowRight, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getAuthErrorMessage } from '@/lib/auth-errors';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PhoneLoginForm } from '@/components/auth/PhoneLoginForm';

import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export default function ParentLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  // const router = useRouter(); // router is not used for push anymore, but might be needed if we add the useEffect. 
  // However, useAuth handles it. I'll comment it out or remove it if unused.
  // Actually, I'll keep it available just in case, or remove if unused.
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await signIn(values.email, values.password);
      toast({
        title: 'Welcome back!',
        description: 'Successfully logged in to your parent account.',
      });
      // router.push('/parent-zone'); // Removed to rely on useAuth
    } catch (error) {
      console.error(error);
      toast({
        title: 'Login Failed',
        description: getAuthErrorMessage(error),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-full mb-4">
          <Heart className="h-6 w-6 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold font-headline tracking-tight text-gray-900 dark:text-gray-100">Parent Login</h2>
        <p className="text-muted-foreground mt-2">Access your child's progress and guidance tools</p>
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
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          <Link
                            href="/parent-zone/forgot-password"
                            className="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
                          >
                            Forgot password?
                          </Link>
                        </div>
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
                  <Button type="submit" className="w-full h-11 text-base bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="phone">
              <PhoneLoginForm isSignup={false} />
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
            Don&apos;t have a parent account?{' '}
            <Link href="/parent-zone/signup" className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors">
              Create one now
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
