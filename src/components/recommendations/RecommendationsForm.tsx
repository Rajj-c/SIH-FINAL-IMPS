'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getPersonalizedCollegeRecommendations, type PersonalizedCollegeRecommendationsOutput, type PersonalizedCollegeRecommendationsInput } from '@/ai/flows/personalized-college-recommendations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles, Loader2, MapPin, Star, GraduationCap, Building, Search, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  age: z.coerce.number().min(14, { message: 'Age must be at least 14.' }).max(25, { message: 'Age must be at most 25.' }),
  classLevel: z.enum(['10', '12']),
  stream: z.enum(['Science', 'Arts', 'Commerce', 'Vocational']),
  location: z.string().min(3, { message: 'Location is required.' }),
});

type Recommendation = PersonalizedCollegeRecommendationsOutput['recommendations'][0];

export default function RecommendationsForm() {
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userProfile } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: 16,
      classLevel: '12',
      stream: 'Science',
      location: '',
    },
  });

  useEffect(() => {
    if (userProfile) {
      form.reset({
        name: userProfile.name,
        classLevel: userProfile.classLevel,
        age: 16, // Age can't be stored in profile yet, so we keep a default
        stream: 'Science',
        location: '',
      });
    }
  }, [userProfile, form]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    // In a real app, this would come from a user profile or quiz state
    const quizResults = {
      interests: values.stream === 'Science' ? 'Physics, Chemistry, Biology' : 'History, Literature, Art',
      skills: values.stream === 'Science' ? 'With logic and experiments' : 'Through creative thinking and new ideas',
      personality: values.stream === 'Science' ? 'A research lab or hospital' : 'An art studio, museum, or library',
    };

    const input: PersonalizedCollegeRecommendationsInput = {
      ...values,
      quizResults,
      savedColleges: [],
      savedCareerPaths: [],
    };

    try {
      const result = await getPersonalizedCollegeRecommendations(input);
      setRecommendations(result.recommendations);
    } catch (e) {
      console.error(e);
      setError('Failed to get recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            AI College Recommendations
          </CardTitle>
          <CardDescription>Fill in your details to get personalized government college recommendations near you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Sunil Kumar" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 17" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="classLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class Level</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} disabled>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your class" />
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
                  name="stream"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Stream</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your stream" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="Arts">Arts</SelectItem>
                          <SelectItem value="Commerce">Commerce</SelectItem>
                           <SelectItem value="Vocational">Vocational</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Location (City/District)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Visakhapatnam" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting Recommendations...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Find My Colleges
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

      <AnimatePresence>
        {recommendations && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-center font-headline">Your Top Recommendations</h2>
            {recommendations.map((rec, index) => (
              <Card key={index} className="overflow-hidden shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="font-headline text-xl flex items-center gap-2"><Building className="h-5 w-5 text-primary"/>{rec.collegeName}</span>
                    <div className="flex items-center gap-1 text-lg font-bold text-amber-500">
                      <Star className="h-5 w-5 fill-amber-500" />
                      <span>{rec.relevanceScore}/10</span>
                    </div>
                  </CardTitle>
                   <CardDescription className="flex items-center text-sm pt-1">
                      <MapPin className="h-4 w-4 mr-1"/>
                      {rec.distance}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-1"><Info className="h-4 w-4 text-secondary-foreground"/> Reasoning</h4>
                    <p className="text-sm text-muted-foreground pl-6">{rec.reasoning}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Relevant Courses</h4>
                    <p className="text-sm text-muted-foreground pl-6">{rec.coursesOffered.join(', ')}</p>
                  </div>
                   <div>
                    <h4 className="font-semibold">Eligibility</h4>
                    <p className="text-sm text-muted-foreground">{rec.eligibilityCriteria}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
