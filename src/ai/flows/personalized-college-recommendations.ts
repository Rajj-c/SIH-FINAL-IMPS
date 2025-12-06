'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing personalized college recommendations to students.
 *
 * The flow takes student profile data, quiz results, and location as input, and returns a list of recommended nearby government colleges.
 *
 * @module src/ai/flows/personalized-college-recommendations
 *
 * @exported
 * - `PersonalizedCollegeRecommendationsInput`: The input type for the personalized college recommendations flow.
 * - `PersonalizedCollegeRecommendationsOutput`: The output type for the personalized college recommendations flow.
 * - `getPersonalizedCollegeRecommendations`: A function that triggers the personalized college recommendations flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the input schema
const PersonalizedCollegeRecommendationsInputSchema = z.object({
  name: z.string().describe('The name of the student.'),
  age: z.number().describe('The age of the student.'),
  classLevel: z.string().describe('The current class level of the student (e.g., 10, 12).'),
  stream: z.string().describe('The academic stream chosen by the student (e.g., Science, Arts, Commerce).'),
  quizResults: z.record(z.string()).describe('The results of the aptitude quiz taken by the student, categorized by interests, skills, and personality.'),
  location: z.string().describe('The location of the student.'),
  savedColleges: z.array(z.string()).optional().describe('List of college names the student has saved.'),
  savedCareerPaths: z.array(z.string()).optional().describe('List of career paths the student has saved.'),
});

export type PersonalizedCollegeRecommendationsInput = z.infer<
  typeof PersonalizedCollegeRecommendationsInputSchema
>;

// Define the output schema
const PersonalizedCollegeRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      collegeName: z.string().describe('The name of the recommended college.'),
      relevanceScore: z.number().describe('A numerical score (1-10) indicating the relevance of the college to the student, based on their profile and quiz results.'),
      reasoning: z.string().describe('A brief explanation for why this college is a good match.'),
      coursesOffered: z.array(z.string()).describe('A list of relevant courses offered by the college.'),
      eligibilityCriteria: z.string().describe('The eligibility criteria for admission to the college.'),
      facilities: z.array(z.string()).describe('A list of notable facilities available at the college.'),
      distance: z.string().describe('The approximate distance of the college from the student\'s location.'),
    })
  ).describe('A list of personalized college recommendations for the student.'),
});

export type PersonalizedCollegeRecommendationsOutput = z.infer<
  typeof PersonalizedCollegeRecommendationsOutputSchema
>;

// Define the flow function
export async function getPersonalizedCollegeRecommendations(
  input: PersonalizedCollegeRecommendationsInput
): Promise<PersonalizedCollegeRecommendationsOutput> {
  return personalizedCollegeRecommendationsFlow(input);
}

const personalizedCollegeRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedCollegeRecommendationsPrompt',
  input: { schema: PersonalizedCollegeRecommendationsInputSchema },
  output: { schema: PersonalizedCollegeRecommendationsOutputSchema },
  prompt: `You are a personalized college recommendation system for students in India.

  Based on the student's profile data, quiz results, and location, provide a list of 3 personalized **Government College** recommendations. Do NOT recommend private colleges.

  Critically analyze the quiz results to understand the student's aptitude and interests. The recommendations must be strongly aligned with the quiz results. For example, if a student shows a strong aptitude for 'logic and experiments', recommend colleges known for their science and technology programs.

  Prioritize nearby government colleges. For each recommendation, provide a relevance score from 1-10 and a brief reasoning for your choice.

  Student Name: {{{name}}}
  Age: {{{age}}}
  Class Level: {{{classLevel}}}
  Stream: {{{stream}}}
  Quiz Results:
  - Interests: {{{quizResults.interests}}}
  - Skills: {{{quizResults.skills}}}
  - Personality: {{{quizResults.personality}}}
  Location: {{{location}}}
  Saved Colleges: {{#if savedColleges}}{{{savedColleges}}}{{else}}None{{/if}}
  Saved Career Paths: {{#if savedCareerPaths}}{{{savedCareerPaths}}}{{else}}None{{/if}}

  Format the output as a JSON object with a "recommendations" array. Each object in the array should have the following fields:
  - collegeName
  - relevanceScore
  - reasoning
  - coursesOffered
  - eligibilityCriteria
  - facilities
  - distance`,
});

const personalizedCollegeRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedCollegeRecommendationsFlow',
    inputSchema: PersonalizedCollegeRecommendationsInputSchema,
    outputSchema: PersonalizedCollegeRecommendationsOutputSchema,
  },
  async input => {
    const { output } = await personalizedCollegeRecommendationsPrompt(input);
    return output!;
  }
);
