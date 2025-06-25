import { createClient } from '@/lib/supabase/server-client';
import { getBrowserTimezone } from '@/lib/timezone';
import type { InsertUser } from '@/db/types';
import { NextResponse } from 'next/server';
import { users } from '@/db/schema';
import { db } from '@/db';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (data.user) {
      const { user } = data;
      // push the user information to the users table
      await db.insert(users).values({
        id: user.id,
        displayName: user.user_metadata['full_name'] as string,
        email: user.email!,
        emailConfirmed: user.user_metadata['email_verified'] as boolean,
        imageUrl: user.user_metadata['avatar_url'] || user.user_metadata['picture'],
        timezone: getBrowserTimezone(),
      } satisfies InsertUser);
    }

    if (!error) {
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
