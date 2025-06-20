import { NextResponse, type NextRequest } from 'next/server';
import { earlyAccess, InsertEarlyAccess } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { z } from 'zod';

const bodySchema = z.object({
  email: z.string().email({ message: 'Valid email address is required' }),
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: parsed.error.message }, { status: 400 });
    }

    const existingUsers = await db
      .select()
      .from(earlyAccess)
      .where(eq(earlyAccess.email, parsed.data.email));

    if (existingUsers.length > 0) {
      return NextResponse.json({ message: 'You are already signed in' }, { status: 409 });
    }

    await db.insert(earlyAccess).values({ email: parsed.data.email } satisfies InsertEarlyAccess);
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    console.error('Unknown error', error);
    return NextResponse.json(
      { message: 'Internal server error while adding email to early access' },
      { status: 500 },
    );
  }
}
