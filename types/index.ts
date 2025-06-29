import { z } from 'zod';

export const habitSchema = z.object({
  habit: z.string().describe('What to do (e.g. Morning 2 km run).'),
  category: z.string().describe('Habit category: Yes/No, Quantitative etc.'),
  fallback: z.string().optional().describe('Optional easier version.'),
  reward: z.string().describe('Instant boost message.'),
});

export type Habit = z.infer<typeof habitSchema>;
