'use server';

import createSupabaseServerClient from '../client/server';

import { type User } from '~/types';

export const createUser = async (data: User) => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase.from('users').insert(data).select('id');

  if (res.error) {
    throw res.error;
  }

  const user_id = res.data.at(0)?.id;

  if (!user_id) {
    throw new Error('User not created');
  }
  return user_id;
};
