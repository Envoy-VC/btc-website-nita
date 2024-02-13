'use server';

import createSupabaseServerClient from '../client/server';

export const getClubForOwner = async (owner_id: string) => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase.from('clubs').select('*').eq('owner_id', owner_id);

  if (res.error) {
    throw res.error;
  }

  const club = res.data.at(0);

  return club ?? null;
};
