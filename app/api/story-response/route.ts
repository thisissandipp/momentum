import { NextResponse, type NextRequest } from 'next/server';
import type { InsertStoryResponse } from '@/db/types';
import { storyResponses } from '@/db/schema';
import { db } from '@/db';
import { z } from 'zod';

const storyResponseBodySchema = z.object({
  respondentName: z.string().optional(),
  contactInfo: z.string().optional(),
  response: z.string(),
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const parsed = storyResponseBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: parsed.error.message }, { status: 400 });
    }

    const { respondentName, contactInfo, response } = parsed.data;

    await db
      .insert(storyResponses)
      .values({ respondentName, contactInfo, response } satisfies InsertStoryResponse);
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    console.error('Unknown error', error);
    return NextResponse.json(
      { message: 'Internal server error while saving your feedback' },
      { status: 500 },
    );
  }
}
