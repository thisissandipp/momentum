import type { InsertCheckpoint, SelectCheckpoint } from '@/db/types';
import { NextResponse, type NextRequest } from 'next/server';
import { currentUser } from '@/lib/current-user';
import { checkpoints } from '@/db/schema';
import { db } from '@/db';
import { z } from 'zod';

const uuidSchema = z.string().uuid();

const bodySchema = z.object({
  objective: z.string(),
});

export type CreateCheckpointBody = z.infer<typeof bodySchema>;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const parsedId = uuidSchema.safeParse(id);

  if (!parsedId.success) {
    return NextResponse.json({ message: parsedId.error.message }, { status: 400 });
  }

  const rawBody = await req.json();
  const parsed = bodySchema.safeParse(rawBody);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.message }, { status: 400 });
  }

  const { objective } = parsed.data;

  const [newCheckpoint] = await db
    .insert(checkpoints)
    .values({ objective, goalId: parsedId.data } satisfies InsertCheckpoint)
    .returning();

  return NextResponse.json(
    { checkpoint: newCheckpoint satisfies SelectCheckpoint },
    { status: 201 },
  );
}
