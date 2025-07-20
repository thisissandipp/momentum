import { type NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@/lib/current-user';
import { InsertGoal } from '@/db/types';
import { and, eq } from 'drizzle-orm';
import { goals } from '@/db/schema';
import { db } from '@/db';
import { z } from 'zod';

const uuidSchema = z.string().uuid();

const bodySchema = z.object({
  title: z.string().optional(),
  domain: z.string().optional(),
  targetDate: z.date().optional(),
  emoji: z.string().optional(),
  whyReason: z.string().optional(),
  currentState: z.string().optional(),
});

export type UpdateGoalBody = z.infer<typeof bodySchema>;

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Check for goal id and validate type
  const { id } = await params;
  const parsed = uuidSchema.safeParse(id);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.message }, { status: 400 });
  }

  // Check for body and validate type, and there's at least one field to update.
  const body = await req.json();
  // Sanitize targetDate if it's a string before parsing it.
  // This is to ensure that the date is in the correct format.
  if (body.targetDate && typeof body.targetDate === 'string') {
    body.targetDate = new Date(body.targetDate);
  }
  const parsedBody = bodySchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json({ message: parsedBody.error.message }, { status: 400 });
  }

  const updateData = parsedBody.data;
  const hasUpdate = Object.values(updateData).some((value) => value !== undefined);

  if (!hasUpdate) {
    return NextResponse.json({ message: 'OK' }, { status: 200 });
  }

  const [existingGoal] = await db.select().from(goals).where(eq(goals.id, parsed.data));

  if (!existingGoal || existingGoal.userId !== user.id) {
    return NextResponse.json({ message: 'Not Found' }, { status: 404 });
  }

  // Update it
  const [updatedGoal] = await db
    .update(goals)
    .set({ ...updateData, updatedAt: new Date() } satisfies Partial<InsertGoal>)
    .where(and(eq(goals.id, parsed.data), eq(goals.userId, user.id)))
    .returning();

  return NextResponse.json({ goal: updatedGoal }, { status: 201 });
}
