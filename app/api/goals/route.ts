import { NextResponse, type NextRequest } from 'next/server';
import type { Goal, InsertGoal } from '@/db/types';
import { currentUser } from '@/lib/current-user';
import { desc, eq } from 'drizzle-orm';
import { goals } from '@/db/schema';
import { db } from '@/db';
import { z } from 'zod';

const bodySchema = z.object({
  title: z.string(),
  domain: z.string().optional(),
  targetDate: z.date(),
  emoji: z.string().optional(),
  whyReason: z.string().optional(),
  currentState: z.string().optional(),
});

export type CreateGoalsBodySchema = z.infer<typeof bodySchema>;

export async function POST(req: NextRequest): Promise<NextResponse> {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const parsed = bodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.message }, { status: 400 });
  }

  const { title, domain, targetDate, emoji, whyReason, currentState } = parsed.data;
  const newGoal = await db
    .insert(goals)
    .values({
      title,
      domain,
      targetDate,
      emoji,
      whyReason,
      currentState,
      userId: user.id,
    } satisfies InsertGoal)
    .returning();

  return NextResponse.json({ goal: newGoal }, { status: 201 });
}

export async function GET(): Promise<NextResponse> {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userGoals = await db
    .select()
    .from(goals)
    .where(eq(goals.userId, user.id))
    .orderBy(desc(goals.createdAt));

  return NextResponse.json({ goals: userGoals satisfies Goal[] });
}
