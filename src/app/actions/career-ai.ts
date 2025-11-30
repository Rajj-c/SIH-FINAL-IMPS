'use server';

import { generateCareerPath } from '@/ai/flows/career';

export async function getCustomCareerPath(query: string, context: string) {
    try {
        const result = await generateCareerPath({ query, context });
        return result;
    } catch (error) {
        console.error('AI Generation Error:', error);
        // Return mock data if AI fails (fallback for demo)
        return {
            nodes: [
                {
                    id: 'custom-degree',
                    label: 'Specialized Degree',
                    type: 'degree',
                    description: `A specialized degree focusing on ${query}.`,
                    icon: '🎓'
                },
                {
                    id: 'custom-industry',
                    label: 'Emerging Industry',
                    type: 'industry',
                    description: `The industry sector related to ${query}.`,
                    icon: '🚀'
                },
                {
                    id: 'custom-role',
                    label: 'Specialist Role',
                    type: 'role',
                    description: `Professional role in the field of ${query}.`,
                    salary: 'High Growth',
                    demand: 'Rising',
                    icon: '⭐'
                }
            ]
        };
    }
}
