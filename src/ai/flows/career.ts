import { ai } from '../genkit';
import { z } from 'genkit';

export const generateCareerPath = ai.defineFlow({
    name: 'generateCareerPath',
    inputSchema: z.object({
        query: z.string(),
        context: z.string().optional(),
    }),
    outputSchema: z.object({
        nodes: z.array(z.object({
            id: z.string(),
            label: z.string(),
            type: z.enum(['degree', 'industry', 'role', 'outcome']),
            description: z.string(),
            salary: z.string().optional(),
            demand: z.string().optional(),
            icon: z.string().optional(),
        }))
    }),
}, async (input) => {
    const { output } = await ai.generate({
        prompt: `
      You are a career counselor. The user is interested in: "${input.query}".
      Context: "${input.context || 'Class 12 Student'}".
      
      Generate a sequential career path with 3-5 steps (Nodes).
      The steps should logically flow from Education -> Industry -> Job Role -> Career Outcome.
      
      For each node, provide:
      - id: unique string (e.g., 'degree-ai')
      - label: short title (e.g., 'B.Tech AI')
      - type: one of 'degree', 'industry', 'role', 'outcome'
      - description: 1 sentence explanation
      - salary: estimated range (e.g., '10-20 LPA') - only for role/outcome
      - demand: 'High', 'Medium', 'Low' - only for role/outcome
      - icon: a relevant emoji
    `,
        output: {
            schema: z.object({
                nodes: z.array(z.object({
                    id: z.string(),
                    label: z.string(),
                    type: z.enum(['degree', 'industry', 'role', 'outcome']),
                    description: z.string(),
                    salary: z.string().optional(),
                    demand: z.string().optional(),
                    icon: z.string().optional(),
                }))
            })
        }
    });

    if (!output) {
        throw new Error('Failed to generate career path');
    }

    return output;
});
