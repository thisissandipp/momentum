import { earlyFeedback, InsertEarlyFeedback } from '@/db/schema';
import { NextResponse, type NextRequest } from 'next/server';
import { db } from '@/db';
import { z } from 'zod';

const bodySchema = z.object({
  moodRating: z.string(),
  feedback: z.string(),
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: parsed.error.message }, { status: 400 });
    }

    const { moodRating, feedback } = parsed.data;

    await db.insert(earlyFeedback).values({ moodRating, feedback } satisfies InsertEarlyFeedback);
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    console.error('Unknown error', error);
    return NextResponse.json(
      { message: 'Internal server error while saving your feedback' },
      { status: 500 },
    );
  }
}
