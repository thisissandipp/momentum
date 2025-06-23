import { createClient } from './supabase/server-client';
import { type AuthError } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

export const signInWithGoogle = async (): Promise<AuthError | void> => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/callback`,
    },
  });

  if (error) return error;
  if (data.url) redirect(data.url);
};
