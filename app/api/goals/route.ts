import { NextResponse, type NextRequest } from 'next/server';
import { currentUser } from '@/lib/current-user';
import { checkpoints, goals } from '@/db/schema';
import type { InsertGoal } from '@/db/types';
import { asc, desc, eq } from 'drizzle-orm';
import { Goal } from '@/types';
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

export type CreateGoalBody = z.infer<typeof bodySchema>;

export async function POST(req: NextRequest): Promise<NextResponse> {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const rawBody = await req.json();

  // Sanitize targetDate if it's a string before parsing it.
  // This is to ensure that the date is in the correct format.
  if (rawBody.targetDate && typeof rawBody.targetDate === 'string') {
    rawBody.targetDate = new Date(rawBody.targetDate);
  }

  const parsed = bodySchema.safeParse(rawBody);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.message }, { status: 400 });
  }

  const { title, domain, targetDate, emoji, whyReason, currentState } = parsed.data;
  const newGoal = await db
    .insert(goals)
    .values({
      title,
      domain,
      targetDate: new Date(targetDate),
      emoji,
      whyReason,
      currentState,
      userId: user.id,
    } satisfies InsertGoal)
    .returning();

  return NextResponse.json({ goal: newGoal[0] }, { status: 201 });
}

// Return [Goal] with [Checkpoint]s added.
export async function GET(): Promise<NextResponse> {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const allGoals = await db.query.goals.findMany({
    where: eq(goals.userId, user.id),
    orderBy: desc(goals.createdAt),
    with: {
      checkpoints: {
        orderBy: asc(checkpoints.createdAt),
      },
    },
  });

  return NextResponse.json({ goals: allGoals satisfies Goal[] });
}
