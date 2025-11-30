'use server';

/**
 * @fileOverview Recommends resources based on student's quiz results and profile
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { resources } from '@/lib/resources';

const RecommendResourcesInputSchema = z.object({
    quizAnswers: z.record(z.string(), z.string()).describe("Student's quiz answers"),
    classLevel: z.enum(['10', '12']).describe("Student's class level"),
    recommendedStream: z.string().optional().describe("Recommended stream from quiz results (e.g., 'Science - PCM', 'Commerce', 'Arts')"),
});

export type RecommendResourcesInput = z.infer<typeof RecommendResourcesInputSchema>;

const RecommendResourcesOutputSchema = z.object({
    recommendedResourceIds: z.array(z.number()).describe('Array of 4-6 resource IDs that best match the student profile'),
    reasoning: z.string().describe('Brief explanation of why these resources are recommended'),
});

export type RecommendResourcesOutput = z.infer<typeof RecommendResourcesOutputSchema>;

export const recommendResources = ai.defineFlow(
    {
        name: 'recommendResources',
        inputSchema: RecommendResourcesInputSchema,
        outputSchema: RecommendResourcesOutputSchema,
    },
    async (input) => {
        const { quizAnswers, classLevel, recommendedStream } = input;

        // Get all available resources
        const availableResources = resources.map(r => ({
            id: r.id,
            title: r.title,
            category: r.category,
            targetClass: r.targetClass,
            targetStream: r.targetStream,
            tags: r.tags,
            description: r.description.substring(0, 100), // Truncate for token efficiency
        }));

        const prompt = `
      You are an expert career counselor for Indian students.
      Your task is to recommend 4-6 most relevant resources from the available list based on the student's quiz responses and profile.
      
      **Student Profile:**
      - Class Level: ${classLevel}th
      ${recommendedStream ? `- Recommended Stream: ${recommendedStream}` : ''}
      
      **Quiz Responses Summary:**
      ${Object.entries(quizAnswers).slice(0, 5).map(([q, a]) => `Q: ${q}\nA: ${a}`).join('\n\n')}
      
      **Available Resources (${availableResources.length} total):**
      ${JSON.stringify(availableResources, null, 2)}
      
      **Selection Criteria:**
      1. **Relevance to Student's Interests**: Based on quiz answers, identify:
         - For Science students: Recommend JEE/NEET prep, engineering/medical entrance resources
         - For Commerce students: Recommend CA/CS, CUET, business entrance resources
         - For Arts students: Recommend CLAT, design, journalism resources
      
      2. **Class Level Match**: Prioritize resources with matching targetClass
      
      3. **Immediate Needs**:
         - For Class 10: Career guidance, stream selection, board prep
         - For Class 12: Entrance exam prep, scholarships, skill development
      
      4. **Mix of Resource Types**:
         - Include at least 1 entrance exam resource
         - Include at least 1 scholarship/financial aid resource
         - Include at least 1 skill development or YouTube channel
         - Vary between free and paid (if student shows interest in premium resources)
      
      5. **Avoid Redundancy**: Don't recommend multiple resources for the same exam/purpose
      
      **Output Requirements:**
      - Select exactly 4-6 resource IDs
      - Provide a brief 2-3 sentence reasoning explaining why these are recommended
      - Focus on high-impact resources that will genuinely help the student
    `;

        const result = await ai.generate({
            prompt: prompt,
            output: { schema: RecommendResourcesOutputSchema },
        });

        if (!result.output) {
            throw new Error('Failed to generate resource recommendations');
        }

        // Validate that recommended IDs exist
        const validResourceIds = resources.map(r => r.id);
        const validatedIds = result.output.recommendedResourceIds.filter(id =>
            validResourceIds.includes(id)
        );

        return {
            recommendedResourceIds: validatedIds.slice(0, 6), // Ensure max 6
            reasoning: result.output.reasoning,
        };
    }
);
