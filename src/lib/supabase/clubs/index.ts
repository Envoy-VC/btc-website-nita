'use server';

import type { ClubDetailsType } from '~/lib/zod';
import createSupabaseServerClient from '../client/server';
import { env } from '~/env';

export const getClubForOwner = async (owner_id: string) => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase.from('clubs').select('*').eq('owner_id', owner_id);

  if (res.error) {
    throw res.error;
  }

  const club = res.data.at(0);

  return club ?? null;
};
export const updateClubAppearanceDetails = async (
  club_id: string,
  data: {
    logo: string;
    cover_image: string;
    banner_image: string;
  }
) => {
  const supabase = await createSupabaseServerClient();

  const res = await supabase
    .from('clubs')
    .update({
      logo_url: data.logo,
      cover_photo_url: data.cover_image,
      banner_image_url: data.banner_image,
    })
    .eq('club_id', club_id);

  if (res.error) {
    throw new Error(res.error.message);
  }
};

export const updateClubBasicDetails = async (
  club_id: string,
  data: ClubDetailsType
) => {
  const supabase = await createSupabaseServerClient();

  const res = await supabase.from('clubs').update(data).eq('club_id', club_id);

  if (res.error) {
    throw new Error(res.error.message);
  }
};
