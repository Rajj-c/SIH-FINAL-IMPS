'use server';

/**
 * @fileOverview Generates the next quiz question based on previous answers.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateNextQuestionInputSchema = z.object({
    currentAnswers: z.array(z.object({
        questionId: z.string(),
        questionText: z.string(),
        answer: z.string(),
    })).describe("List of previous questions and the user's answers."),
    classLevel: z.enum(['10', '12']).describe("The student's class level."),
});

export type GenerateNextQuestionInput = z.infer<typeof GenerateNextQuestionInputSchema>;

const GenerateNextQuestionOutputSchema = z.object({
    id: z.string().describe('Unique ID for the new question'),
    question: z.string().describe('The question text'),
    category: z.enum(['aptitude', 'stream', 'preference', 'motivation']).describe('Category of the question'),
    type: z.enum(['text', 'scenario', 'slider', 'flip-card']).describe('Visual type of the question'),
    options: z.array(z.string()).describe('List of answer options (usually 4)'),
    image: z.string().optional().describe('Optional image URL for context'),
    scenarios: z.array(z.object({
        id: z.string(),
        icon: z.string().describe('MUST be a single emoji character like 🔬, 💻, ⚕️, 🎨, etc.'),
        title: z.string(),
        description: z.string(),
        value: z.string(),
    })).optional().describe('Scenario details if type is scenario'),
    flipCards: z.array(z.object({
        id: z.string(),
        front: z.string(),
        back: z.string(),
        value: z.string(),
        icon: z.string().optional().describe('MUST be a single emoji character like 🔬, 💻, ⚕️, 🎨, etc.'),
    })).optional().describe('Flip card details if type is flip-card'),
    sliderConfig: z.object({
        min: z.number(),
        max: z.number(),
        minLabel: z.string(),
        maxLabel: z.string(),
    }).optional().describe('Slider config if type is slider'),
});

export type GenerateNextQuestionOutput = z.infer<typeof GenerateNextQuestionOutputSchema>;

export const generateNextQuestion = ai.defineFlow(
    {
        name: 'generateNextQuestion',
        inputSchema: GenerateNextQuestionInputSchema,
        outputSchema: GenerateNextQuestionOutputSchema,
    },
    async (input) => {
        const { currentAnswers, classLevel } = input;

        const prompt = `
      You are an expert career counselor for Indian students.
      Your task is to generate the NEXT question for a dynamic career assessment quiz.
      
      **Student Profile:**
      - Class Level: ${classLevel}th Grade
      
      **Quiz History:**
      ${JSON.stringify(currentAnswers, null, 2)}
      
      **CRITICAL RULES FOR QUESTION GENERATION:**
      1. **Class Level Context:**
         - **For Class 10:** Focus ONLY on choosing a stream (Science, Commerce, Arts) or broad field. DO NOT ask about specific degrees (B.Tech, MBBS) or job roles that require a degree. Ask about subjects they like, learning styles, and broad interests.
         - **For Class 12:** You CAN ask about specific degrees, career paths, and specialized fields based on their likely stream.
      
      2. **Dynamic Adaptation:**
         - Analyze the previous answers. If the student shows interest in 'Creative Arts', ask a follow-up about specific creative fields (Design vs Writing).
         - If they are ambiguous (e.g., like both Math and Art), ask a question to resolve this conflict (e.g., "Architecture vs Pure Math").
      
      3. **Visual & Interactive:**
         - Prefer 'scenario' or 'flip-card' types for engagement.
         - Use 'slider' for intensity questions (e.g., "How much do you like...").
         - Ensure options are distinct and cover the possibilities.
         - **CRITICAL: For the 'icon' field in scenarios or flipCards, ALWAYS use a SINGLE EMOJI CHARACTER (like 🔬, 💻, ⚕️, 🎨, 📊, etc.). NEVER use icon names, icon codes, or image URLs. Just use the emoji itself.**
      
      4. **Tone:**
         - Friendly, encouraging, and relevant to an Indian student.
      
      **Examples of CORRECT icon usage:**
      - icon: "🔬" (for science/research)
      - icon: "💻" (for technology/computers)
      - icon: "⚕️" (for medical/healthcare)
      - icon: "🎨" (for arts/creative)
      - icon: "📊" (for business/management)
      - icon: "🛠️" (for engineering/technical)
      
      **Examples of INCORRECT icon usage (DO NOT DO THIS):**
      - icon: "chart_line_up" ❌
      - icon: "https://img.icons8.com/..." ❌
      - icon: "microscope" ❌
      
      Generate a single, high-quality question object with proper emoji icons.
    `;

        const result = await ai.generate({
            prompt: prompt,
            output: { schema: GenerateNextQuestionOutputSchema },
        });

        if (!result.output) {
            throw new Error('Failed to generate question');
        }

        return result.output;
    }
);
