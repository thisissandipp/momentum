import { storyResponses } from '@/db/schema';
import { NextResponse } from 'next/server';
import { db } from '@/db';

export async function GET(): Promise<NextResponse> {
  const responses = await db.select().from(storyResponses);
  return NextResponse.json({ count: responses.length }, { status: 200 });
}
