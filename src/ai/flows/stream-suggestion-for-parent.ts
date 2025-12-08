/**
 * @fileOverview Suggests a suitable academic stream for a student based on their parent's answers.
 *

 */

'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ParentStreamSuggestionInputSchema = z.object({
  parentAnswers: z.string().describe("A JSON string containing the parent's answers to questions about their child's education and career."),
});
export type ParentStreamSuggestionInput = z.infer<typeof ParentStreamSuggestionInputSchema>;

const ParentStreamSuggestionOutputSchema = z.object({
  suggestedPath: z.string().describe('The suggested academic stream or path for the student (e.g., "Engineering via Science stream", "Commerce with a focus on CA", "Vocational Training in technical skills").'),
  reasoning: z.string().describe('A detailed explanation of why this path is suitable, based on the parent\'s expectations, investment comfort, child\'s perceived strengths, and other factors from the quiz.'),
  nextSteps: z.array(z.string()).describe('A list of actionable next steps the parent and child can take (e.g., "Explore diploma courses in your city", "Prepare for science-stream entrance exams", "Consult with a career counselor about creative fields").'),

  // Fee and Cost Information
  estimatedCosts: z.object({
    tuitionFeeRange: z.string().describe('Annual tuition fee range in Indian Rupees, e.g., "Rs 50,000 - Rs 2,00,000 per year"'),
    totalCostEstimate: z.string().describe('Total cost for the complete course duration, e.g., "Rs 2,00,000 - Rs 8,00,000 for full course (4 years)"'),
    governmentCollegeFee: z.string().optional().describe('Typical fee range for government colleges for this path, e.g., "Rs 20,000 - Rs 50,000 per year"'),
    privateCollegeFee: z.string().optional().describe('Typical fee range for private colleges for this path, e.g., "Rs 1,50,000 - Rs 5,00,000 per year"'),
    additionalExpenses: z.array(z.string()).describe('List of additional expenses to consider, e.g., ["Hostel: Rs 50,000-Rs 1,00,000/year", "Books & Materials: Rs 10,000-Rs 20,000/year", "Exam fees: Rs 5,000-Rs 15,000"]'),
  }).describe('Comprehensive cost breakdown for the suggested educational path'),

  // Scholarship Information
  scholarshipOpportunities: z.array(z.object({
    name: z.string().describe('Name of scholarship program'),
    eligibility: z.string().describe('Brief eligibility criteria'),
    amount: z.string().describe('Scholarship amount or benefit, e.g., "Up to Rs 50,000 per year" or "100% tuition fee waiver"'),
    website: z.string().describe('Official website URL for the scholarship, e.g., "https://scholarships.gov.in" or "https://kcmf.org"'),
  })).describe('Relevant scholarship opportunities for this path').optional(),

  // College Recommendations
  recommendedColleges: z.array(z.object({
    name: z.string().describe('College/Institution name'),
    type: z.string().describe('Type: Government, Private, Government-Aided, Autonomous'),
    estimatedFee: z.string().describe('Fee range per year, e.g., "Rs 30,000-Rs 50,000/year"'),
    location: z.string().describe('City, State'),
    courses: z.string().describe('Relevant courses offered, e.g., "B.Tech CSE, B.Tech ECE"'),
    facilities: z.string().describe('Key facilities, e.g., "Hostel, Library, Labs, Placement Cell"'),
    highlights: z.string().describe('Notable achievements or features, e.g., "NAAC A+ accredited, 80% placement rate"'),
    website: z.string().describe('Official college website URL, e.g., "https://www.college.edu.in"'),
  })).describe('2-3 example colleges that fit the budget and location preferences').optional(),
});
export type ParentStreamSuggestionOutput = z.infer<typeof ParentStreamSuggestionOutputSchema>;

export async function suggestStreamForParent(input: ParentStreamSuggestionInput): Promise<ParentStreamSuggestionOutput> {
  return suggestStreamForParentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parentStreamSuggestionPrompt',
  input: { schema: ParentStreamSuggestionInputSchema },
  output: { schema: ParentStreamSuggestionOutputSchema },
  prompt: `You are an expert career counselor for parents in the Indian education system. You are advising a parent who has answered a questionnaire about their child's future.

Your task is to analyze the parent's answers and provide a thoughtful, balanced recommendation for their child's educational path. You must consider the parent's expectations but also emphasize the child's interests and well-being.

**Parent's Quiz Answers:**
{{{parentAnswers}}}

**Analysis and Recommendation Guidelines:**

1.  **Synthesize the Parent's View:** First, understand the parent's perspective. What are their primary goals (e.g., security, high salary, passion)? What is their financial comfort level? How open are they to different locations or career types? What class has the child completed?

2.  **Identify Potential Conflicts:** Look for potential conflicts between the parent's desires and what might be best for the child (e.g., parent wants security, but thinks the child is creative; parent has low investment comfort but wants a high-paying private job for the child). Your reasoning should gently address these.

3.  **Formulate a Suggested Path:** Based on the child's completed class, their perceived strengths, and the parent's answers, suggest a concrete educational path.
    *   Examples for Class 10 pass: "Science stream (PCM) in 11th-12th with a focus on Engineering", "Commerce stream with foundation for CA", "Diploma in technical trade from Polytechnic", "Arts stream with focus on creative design"
    *   Examples for Class 12 pass: "B.Tech in Computer Science via JEE", "MBBS through NEET", "B.Com with CA preparation", "Diploma in Animation and Design", "ITI course in a skilled trade"

4.  **Provide Detailed Reasoning:** Explain *why* you are suggesting this path. Connect it directly to the parent's answers.

5.  **Generate REALISTIC Fee Information:** Based on current Indian education costs (as of 2025-2026), **ALWAYS use "Rs" for currency (never use ₹ symbol)**:
    *   For Government colleges: Most undergraduate courses are Rs 20,000-Rs 1,00,000 per year
    *   For Government colleges: Most undergraduate courses are Rs 20,000-Rs 1,00,000 per year
    *   Engineering: Govt Rs 50,000-Rs 1,00,000/year
    *   Medical: Govt Rs 10,000-Rs 50,000/year
    *   Commerce/Arts: Generally lower, Rs 10,000-Rs 2,00,000/year
    *   Consider additional expenses: Hostel (Rs 50,000-Rs 1,50,000/year), Books (Rs 10,000-Rs 30,000/year), Coaching (Rs 50,000-Rs 2,00,000/year)
    *   Align fee estimates with the parent's stated budget comfort
    *   **CRITICAL: Use "Rs" format, NOT ₹ symbol. Example: "Rs 50,000" not "₹50,000"**

6.  **Suggest Relevant Scholarships:** Based on the path and parent's financial situation, suggest 1-3 real Indian scholarships:
    *   Government: National Scholarship Portal (NSP), Post-Matric Scholarships, Merit-cum-Means
    *   Private: Sitaram Jindal Foundation, K.C. Mahindra Scholarships, JN Tata Endowment
    *   College-specific: Many colleges offer merit scholarships
    *   Use "Rs" for amounts, e.g., "Up to Rs 50,000 per year"
    *   **IMPORTANT: Provide real, working website URLs for each scholarship**

7.  **Recommend 2-3 Example Colleges:** Based on location preference, budget, and suggested path:
    *   **RECOMMEND ONLY GOVERNMENT COLLEGES (State or Central Govt).**
    *   Do NOT recommend private colleges.
    *   Use realistic college names or types (Government Polytechnic, IITs, NITs, State Universities)
    *   Fee format: "Rs 30,000-Rs 50,000/year" (use "Rs", not ₹)
    *   **Include specific details:** courses offered, facilities available, and key highlights/achievements
    *   **IMPORTANT: Provide official college website URLs for each recommended college**

8.  **Suggest Actionable Next Steps:** Provide 2-4 clear, practical next steps.

Your tone should be empathetic, respectful, and encouraging. Provide data-driven financial information to help parents make informed decisions. **IMPORTANT: Always use "Rs" for currency, never ₹ symbol.**`,
});

const suggestStreamForParentFlow = ai.defineFlow(
  {
    name: 'suggestStreamForParentFlow',
    inputSchema: ParentStreamSuggestionInputSchema,
    outputSchema: ParentStreamSuggestionOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
