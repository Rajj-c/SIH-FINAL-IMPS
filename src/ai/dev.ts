'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/stream-suggestion-from-quiz.ts';
import '@/ai/flows/stream-suggestion-for-parent.ts';
import '@/ai/flows/personalized-college-recommendations.ts';
import '@/ai/flows/find-colleges-for-career-path.ts';
