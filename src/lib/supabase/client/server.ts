/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use server';

import { auth } from '@clerk/nextjs';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

import type { Database } from '~/types/database';

import { env } from '~/env';

const createSupabaseServerClient = async () => {
  const cookieStore = cookies();
  const { getToken } = auth();
  const supabaseAccessToken = await getToken({
    template: 'supabase',
  });

  const global = supabaseAccessToken && {
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    },
  };

  const supabase = createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      ...global,
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
  return supabase;
};

export default createSupabaseServerClient;
