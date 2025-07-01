import { NextResponse, type NextRequest } from 'next/server';
import { habitArchitectPrompt } from '@/lib/prompts';
import { currentUser } from '@/lib/current-user';
import { google } from '@ai-sdk/google';
import { habitSchema } from '@/types';
import { generateObject } from 'ai';
import { z } from 'zod';

const bodySchema = z.object({
  domain: z.string(),
  oneYearGoal: z.string().min(15, 'Minimum 15 charaters are required'),
  currentState: z.string().min(15, 'Minimum 15 charaters are required'),
});

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const parsed = bodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.message }, { status: 400 });
  }

  const { domain, oneYearGoal, currentState } = parsed.data;

  const result = await generateObject({
    model: google('gemini-2.0-flash'),
    schema: z.array(habitSchema),
    prompt: habitArchitectPrompt(domain, oneYearGoal, currentState),
  });

  return NextResponse.json({ habits: result.object }, { status: 200 });
}
