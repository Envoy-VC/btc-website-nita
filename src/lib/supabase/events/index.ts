'use server';

import createSupabaseServerClient from '../client/server';

import type { Event } from '~/types';

export const createEventForClub = async (club_id: string, owner_id: string) => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase
    .from('events')
    .insert({
      club_id: club_id,
      owner_id: owner_id,
    })
    .select('event_id');

  if (res.error) {
    throw new Error(res.error.message);
  }

  const event = res.data.at(0);

  return event?.event_id ?? null;
};

export const getEventDetails = async (event_id: string) => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase
    .from('events')
    .select('*')
    .eq('event_id', event_id);

  if (res.error) {
    throw new Error(res.error.message);
  }

  const event = res.data.at(0);

  return event ?? null;
};

export const updateEventDetails = async (
  event_id: string,
  data: Partial<Event>
) => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase
    .from('events')
    .update(data)
    .eq('event_id', event_id);

  if (res.error) {
    throw new Error(res.error.message);
  }

  return res.data;
};
