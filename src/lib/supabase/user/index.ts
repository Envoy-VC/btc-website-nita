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

export const getUser = async (id: string) => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase.from('users').select('*').eq('id', id);

  if (res.error) {
    throw res.error;
  }

  const user = res.data.at(0);

  return user ?? null;
};

export const updateUserNotifications = async (
  id: string,
  data: Partial<User>
) => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase
    .from('users')
    .update({
      marketing_emails: data.marketing_emails,
      communication_emails: data.communication_emails,
      event_emails: data.event_emails,
      social_emails: data.social_emails,
    })
    .eq('id', id)
    .select();

  if (res.error) {
    throw res.error;
  }

  const user = res.data.at(0);

  return user ?? null;
};
