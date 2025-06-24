'use server';

import { createClient } from './supabase/server-client';
import { type AuthError } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const signInWithGoogle = async (): Promise<AuthError | void> => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/callback?next=/dashboard`,
    },
  });

  if (error) return error;
  if (data.url) redirect(data.url);
};

export const logOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
};
