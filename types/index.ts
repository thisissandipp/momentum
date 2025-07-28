import { z } from 'zod';

export type User = {
  id: string;
  email: string;
  displayName: string;
  emailConfirmed: boolean;
  imageUrl: string | null;
  timezone: string | null;
  onboardingCompleted: boolean;
  appPreferences: unknown;
  createdAt: Date;
  updatedAt: Date;
  lastActiveAt: Date;
};

export type Goal = {
  id: string;
  title: string;
  whyReason: string | null;
  currentState: string | null;
  domain: string;
  targetDate: Date | null;
  emoji: string | null;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  checkpoints: Checkpoint[];
};

export type Checkpoint = {
  id: string;
  objective: string;
  createdAt: Date;
  updatedAt: Date;
  isCompleted: boolean;
};

export const habitSchema = z.object({
  habit: z.string().describe('What to do (e.g. Morning 2 km run).'),
  category: z.string().describe('Habit category: Yes/No, Quantitative etc.'),
  fallback: z.string().optional().describe('Optional easier version.'),
  reward: z.string().describe('Instant boost message.'),
});

export type Habit = z.infer<typeof habitSchema>;
