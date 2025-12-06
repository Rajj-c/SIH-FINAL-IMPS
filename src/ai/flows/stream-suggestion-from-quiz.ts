'use server';

/**
 * @fileOverview Suggests a suitable academic stream based on quiz results.
 *
 * - suggestStream - A function that suggests a stream based on quiz results.
 * - StreamSuggestionInput - The input type for the suggestStream function.
 * - StreamSuggestionOutput - The return type for the suggestStream function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const StreamSuggestionInputSchema = z.object({
  quizAnswers: z.string().describe("A JSON string containing the user's answers categorized by aptitude, preference, stream, and motivation."),
  classLevel: z.enum(['10', '12']).describe("The student's class level."),
  fixedRecommendations: z.array(z.object({
    courseName: z.string(),
    stream: z.string(),
    personalityType: z.string(),
  })).optional().describe("Deterministic recommendations (Top 3) from the rule-based engine. If provided, the AI MUST align its top recommendations with these."),
});
export type StreamSuggestionInput = z.infer<typeof StreamSuggestionInputSchema>;

const StreamSuggestionOutputSchema = z.object({
  personalityType: z.object({
    type: z.string().describe('The student\'s personality type (e.g., "Analytical Innovator", "Creative Problem-Solver", "Empathetic Leader", "Practical Builder", "Strategic Thinker")'),
    description: z.string().describe('A brief description of this personality type and its strengths'),
    traits: z.array(z.string()).describe('Key personality traits identified from quiz answers (3-5 traits)'),
  }).describe('Discovered personality type based on quiz responses'),

  topCareerPaths: z.array(z.object({
    name: z.string().describe('The career path name (e.g., "B.Tech Computer Science", "MBBS", "Chartered Accountancy")'),
    matchScore: z.number().min(0).max(100).describe('Percentage match score based on student\'s profile (0-100)'),
    category: z.string().describe('Category like "Engineering", "Medical", "Commerce", "Creative", "Vocational"'),
    pros: z.array(z.string()).describe('3-4 advantages of this career path for the student'),
    cons: z.array(z.string()).describe('2-3 challenges or considerations'),
    estimatedSalary: z.string().describe('Starting salary range in LPA (e.g., "4-8 LPA")'),
    growthPotential: z.enum(['High', 'Medium', 'Moderate']).describe('Career growth potential'),
    timeToCareer: z.string().describe('Time to start career (e.g., "4 years", "5.5 years")'),
    topColleges: z.array(z.string()).describe('2-3 top colleges/institutions for this path in India'),
  })).min(3).max(3).describe('Top 3 recommended career paths ranked by match score'),

  emergingFields: z.array(z.object({
    name: z.string().describe('Emerging field name (e.g., "Artificial Intelligence", "Sustainable Energy", "Biotechnology")'),
    relevance: z.string().describe('Why this field is relevant to the student'),
    futureScope: z.string().describe('Future career opportunities in this field'),
  })).max(2).describe('2 emerging fields that align with student interests'),

  learningRoadmap: z.object({
    immediate: z.array(z.string()).describe('Skills or subjects to focus on immediately (next 3-6 months)'),
    shortTerm: z.array(z.string()).describe('Goals for the next 1-2 years'),
    longTerm: z.string().describe('5-10 year career vision based on chosen path'),
  }).describe('Personalized learning and career roadmap'),

  marketInsights: z.object({
    demandTrend: z.enum(['High Demand', 'Growing', 'Stable', 'Declining']).describe('Current job market demand'),
    competitionLevel: z.enum(['High', 'Medium', 'Low']).describe('Competition level in this field'),
    keySkills: z.array(z.string()).describe('3-5 essential skills needed for success'),
    industryTrends: z.string().describe('Current trends and future outlook in the industry'),
  }).describe('Job market and industry insights'),

  overallRecommendation: z.string().describe('A comprehensive summary tying everything together with actionable next steps'),
});
export type StreamSuggestionOutput = z.infer<typeof StreamSuggestionOutputSchema>;

export async function suggestStream(input: StreamSuggestionInput): Promise<StreamSuggestionOutput> {
  return suggestStreamFlow(input);
}

const prompt = ai.definePrompt({
  name: 'streamSuggestionPrompt',
  input: { schema: StreamSuggestionInputSchema },
  output: { schema: StreamSuggestionOutputSchema },
  prompt: `You are an advanced AI career counselor with deep expertise in the Indian education system, personality psychology, and job market trends. Your mission is to provide comprehensive, data-driven career guidance to students.

You will receive quiz answers from a student who has completed either class 10 or class 12. Analyze these answers deeply to understand their:
- **Aptitude**: Logical/analytical, creative, practical, or scientific strengths
- **Preferences**: Learning style, work environment, study habits
- **Motivations**: What drives them (passion, money, security, helping others)
- **Stream Interests**: Engineering, medical, business, creative, or vocational inclinations

**Student's Class Level:** {{{classLevel}}}

{{#if fixedRecommendations}}
**CONSTRAINT - MANDATORY TOP 3 RECOMMENDATIONS:**
The rule-based engine has already determined the best fit. You MUST align your analysis with these specific courses in this exact order:

{{#each fixedRecommendations}}
Recommendation #{{@index}}:
- **Career Path:** {{this.courseName}}
- **Stream:** {{this.stream}}
- **Personality Code:** {{this.personalityType}}
{{/each}}

Your task is to generate the *details* (Pros, Cons, Roadmap, Market Insights) for THESE specific recommendations as your Top 3. Do NOT suggest different paths for the top 3 slots.
{{/if}}

**Quiz Answers:**
{{{quizAnswers}}}

---

## YOUR COMPREHENSIVE ANALYSIS MUST INCLUDE:

### 1. PERSONALITY TYPE DISCOVERY
Identify the student's personality type from these categories:
- **Analytical Innovator**: Logical thinkers who love problem-solving and innovation
- **Creative Visionary**: Artistic minds with strong creative and expressive abilities
- **Empathetic Leader**: People-oriented with strong interpersonal skills
- **Practical Builder**: Hands-on, pragmatic, skilled in execution
- **Strategic Thinker**: Planners who excel in business and management

Provide:
- The personality type name
- Description of this type's strengths
- 3-5 key traits observed from their answers

### 2. TOP 3 CAREER PATHS (Ranked by Match Score)
For **Class 10 students**, suggest streams like:
- Science (PCM) → Engineering, Architecture, etc.
- Science (PCB) → Medical, Pharmacy, etc.
- Commerce → CA, Business, Finance
- Arts/Humanities → Law, Civil Services, Media
- Vocational → Diploma, ITI courses

For **Class 12 students**, suggest specific careers like:
- B.Tech Computer Science, Mechanical, etc.
- MBBS, BDS, B.Pharm, Nursing
- CA, B.Com, BBA, MBA
- Law, Journalism, Design, Media
- Emerging fields: AI/ML, Data Science, Sustainable Energy

For each path provide:
- **Match Score**: 0-100% based on their profile
- **Pros**: 3-4 specific advantages for THIS student
- **Cons**: 2-3 realistic challenges
- **Starting Salary**: LPA range in India
- **Growth Potential**: High/Medium/Moderate
- **Time to Career**: Years of study needed
- **Top Colleges**: 2-3 prestigious institutions in India

### 3. EMERGING FIELDS (2 fields)
Suggest cutting-edge fields relevant to their interests:
- Artificial Intelligence & Machine Learning
- Sustainable Energy & Climate Tech
- Biotechnology & Genetic Engineering
- Blockchain & Web3
- Space Technology
- Cybersecurity
- Data Science & Analytics

Explain WHY each field suits them and future opportunities.

### 4. LEARNING ROADMAP
Create a personalized roadmap:
- **Immediate (3-6 months)**: Skills to build now
- **Short-term (1-2 years)**: Academic and skill goals
- **Long-term (5-10 years)**: Career vision

### 5. MARKET INSIGHTS
Provide realistic job market data:
- **Demand Trend**: High Demand/Growing/Stable/Declining
- **Competition Level**: High/Medium/Low
- **Key Skills**: 3-5 essential skills for success
- **Industry Trends**: Current and future outlook

### 6. OVERALL RECOMMENDATION
Synthesize everything into actionable advice. Be encouraging but realistic.

---

**IMPORTANT GUIDELINES:**
- Be specific to the Indian education and job market
- Use actual college names (IITs, NITs, AIIMS, etc.)
- **CRITICAL CONSTRAINT**: You must **ONLY** recommend **Government/Public** colleges/universities (e.g., IITs, NITs, IIMs, AIIMS, Central Universities like DU, BHU, JNU).
- **DO NOT** recommend private universities (e.g., NO Christ University, NO Symbiosis, NO Manipal, NO Amity, NO VIT, NO private colleges).
- Provide realistic salary ranges based on 2024-2025 data
- Consider affordability and accessibility
- Be culturally sensitive and practical
- Base EVERYTHING on the quiz answers - no generic advice

Generate your comprehensive analysis now.`,
});

const suggestStreamFlow = ai.defineFlow(
  {
    name: 'suggestStreamFlow',
    inputSchema: StreamSuggestionInputSchema,
    outputSchema: StreamSuggestionOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
