'use server';

/**
 * @fileOverview This file defines a Genkit flow for finding relevant colleges for a given career path.
 *
 * The flow takes a career path name and a list of available colleges and returns a filtered list of colleges
 * that are relevant to that career path.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { colleges as allCollegesData } from '@/lib/data';
import type { College } from '@/lib/types';


const FindCollegesForCareerPathInputSchema = z.object({
  careerPathName: z.string().describe('The name of the career path the student is interested in (e.g., "Bachelor of Technology (B.Tech)").'),
  studentLocation: z.string().optional().describe("The student's location (e.g., city or district) to prioritize nearby colleges if provided."),
  availableColleges: z.string().describe('A JSON string representing the list of all available colleges to search through. Each college object should have a name and a list of courses offered.'),
  classLevel: z.enum(['10', '12']).optional().describe("The student's class level (optional)."),
});
export type FindCollegesForCareerPathInput = z.infer<typeof FindCollegesForCareerPathInputSchema>;

const FindCollegesForCareerPathOutputSchema = z.object({
  suggestedColleges: z.array(
    z.object({
      id: z.string().describe('The unique ID of the college.'),
      name: z.string().describe('The name of the suggested college.'),
      courses: z.array(z.string()).describe('The list of relevant courses offered by the college.'),
      reasoning: z.string().describe('A brief explanation of why this college is a good match for the chosen career path.'),
    })
  ).describe('A list of suggested colleges relevant to the career path.'),
});
export type FindCollegesForCareerPathOutput = z.infer<typeof FindCollegesForCareerPathOutputSchema>;

export async function findCollegesForCareerPath(
  input: Omit<FindCollegesForCareerPathInput, 'availableColleges'>
): Promise<FindCollegesForCareerPathOutput> {

  // Determine class level filter; default to 'after_10th' if not provided
  const classLevelFilter = input.classLevel ? (input.classLevel === '10' ? 'after_10th' : 'after_12th') : 'after_10th';
  let relevantColleges = allCollegesData.filter(c => c.level === classLevelFilter);

  // If student location is provided, create a prioritized list of colleges
  let collegesForPrompt = [...relevantColleges];
  if (input.studentLocation) {
    const studentDistrict = input.studentLocation.toLowerCase();
    const nearby = relevantColleges.filter(c => c.district.toLowerCase().includes(studentDistrict));
    const others = relevantColleges.filter(c => !c.district.toLowerCase().includes(studentDistrict));
    // Put nearby colleges first in the list sent to the AI
    collegesForPrompt = [...nearby, ...others];
  }

  const flowInput: FindCollegesForCareerPathInput = {
    ...input,
    availableColleges: JSON.stringify(collegesForPrompt.map(c => ({ id: c.id, name: c.name, district: c.district, state: c.state, courses: c.courses })).slice(0, 100)), // Increased limit to cover all current colleges
  };
  return findCollegesForCareerPathFlow(flowInput);
}

const findCollegesPrompt = ai.definePrompt({
  name: 'findCollegesForCareerPathPrompt',
  input: { schema: FindCollegesForCareerPathInputSchema },
  output: { schema: FindCollegesForCareerPathOutputSchema },
  prompt: `You are an expert career counselor in India. Your task is to help a student find relevant **Government Colleges ONLY** based on their chosen career path. Do NOT recommend private colleges.

You will be given:
1. The name of a career path (e.g., "B.Tech Computer Science", "MBBS", "Diploma in Fashion Design").
2. An optional student location (district).
3. A JSON list of available colleges with their offered courses.
4. The student's class level.

Your goal is to identify up to 3 colleges from the list that are the best fit for the specified career path.

Instructions:
- **Analyze the Career Path**: Understand the core field (e.g., "Computer Science", "Medical", "Commerce").
- **Semantic Matching**: Match the career path to the "courses" array in the provided JSON.
    - **Exact matches are rare.** Look for semantic equivalents.
    - "B.Tech Computer Science" should match "B.Tech in Computer Science", "B.E. Computer Science", or "Computer Science Engineering".
    - "MBBS" should match "Bachelor of Medicine and Bachelor of Surgery".
    - "Diploma in..." should match colleges offering "Diploma" or "Polytechnic" courses in that field.
    - "Design" should match "B.Des", "Fashion Design", etc.
- **Location Priority**: If a student's location is provided, you MUST prioritize colleges from that district first.
- **Reasoning**: For each suggested college, explicitly state WHICH course matched the career path.

Student's Chosen Career Path: {{{careerPathName}}}
Student's Location: {{#if studentLocation}}{{{studentLocation}}}{{else}}Any (Nationwide){{/if}}
Student's Class Level: {{{classLevel}}}
Available Colleges JSON:
{{{availableColleges}}}

Provide your response in the specified JSON output format.
`,
});

const findCollegesForCareerPathFlow = ai.defineFlow(
  {
    name: 'findCollegesForCareerPathFlow',
    inputSchema: FindCollegesForCareerPathInputSchema,
    outputSchema: FindCollegesForCareerPathOutputSchema,
  },
  async (input) => {
    const { output } = await findCollegesPrompt(input);
    return output!;
  }
);
