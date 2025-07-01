import { createClient } from '@/lib/supabase/server-client';
import { getBrowserTimezone } from '@/lib/timezone';
import type { InsertUser, User } from '@/db/types';
import { NextResponse } from 'next/server';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    let currentUser: User | null = null;

    if (data.user) {
      const { user } = data;
      // ensure whether the user already exists in DB
      const existingUsers = await db.select().from(users).where(eq(users.id, user.id)).limit(1);

      // push the user information to the users table, if it wasn't already
      if (existingUsers.length === 0) {
        await db.insert(users).values({
          id: user.id,
          displayName: user.user_metadata['full_name'] as string,
          email: user.email!,
          emailConfirmed: user.user_metadata['email_verified'] as boolean,
          imageUrl: user.user_metadata['avatar_url'] || user.user_metadata['picture'],
          timezone: getBrowserTimezone(),
        } satisfies InsertUser);
      } else {
        currentUser = existingUsers[0];
      }
    }

    if (!error) {
      // Check if the onboarding is completed for the user.
      if (currentUser && !currentUser.onboardingCompleted) {
        next = '/onboarding/goal';
      }

      const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development';
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/error`);
}
