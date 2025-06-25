import { createClient } from '@/lib/supabase/server-client';
import { users } from '@/db/schema';
import { User } from '@/db/types';
import { eq } from 'drizzle-orm';
import { db } from '@/db';

export const currentUser = async (): Promise<User | null> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) return null;

    const [currentUser] = await db.select().from(users).where(eq(users.id, data.user.id)).limit(1);
    return currentUser ?? null;
  } catch (error) {
    console.error('Error fetching current user', error);
    return null;
  }
};
