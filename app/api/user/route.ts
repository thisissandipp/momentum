import { currentUser } from '@/lib/current-user';
import { NextResponse } from 'next/server';
import { SelectUser } from '@/db/types';

export async function GET(): Promise<NextResponse> {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized or failed to get user from Supabase Auth.' },
        { status: 401 },
      );
    }
    return NextResponse.json({ user: user satisfies SelectUser }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user', error);
    return NextResponse.json(
      { message: 'Internal server error while fetching user' },
      { status: 500 },
    );
  }
}
