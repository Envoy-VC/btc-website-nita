'use server';

import createSupabaseServerClient from '../client/server';

export const createEventForClub = async (club_id: string) => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase
    .from('events')
    .insert({
      club_id: club_id,
    })
    .select('event_id');

  if (res.error) {
    throw new Error(res.error.message);
  }

  const event = res.data.at(0);

  return event?.event_id ?? null;
};
