import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '~/types/database';

import { env } from '~/env';

export const createSupabaseClient = (token?: string) => {
  const supabase = createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      cookies: {},
    }
  );
  return supabase;
};
