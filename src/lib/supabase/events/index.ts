'use server';

import { cache } from 'react';
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
    return null;
  }

  const event = res.data.at(0);

  if (!event) {
    return null;
  }

  return event ?? null;
};

export const getApprovedEventDetails = async (event_id: string) => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase
    .from('events')
    .select('*')
    .eq('event_id', event_id)
    .eq('is_public', true);

  if (res.error) {
    return null;
  }

  const event = res.data.at(0);

  if (!event) {
    return null;
  }

  return event;
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

export const getEventsForClub = cache(async (club_id: string) => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase.from('events').select('*').eq('club_id', club_id);

  if (res.error) {
    return [];
  }

  return res.data;
});

export const deleteEvent = async (event_id: string) => {
  const supabase = await createSupabaseServerClient();
  // delete event image first from storage
  const eventDetails = await getEventDetails(event_id);
  if (eventDetails?.event_image) {
    const fullPath = eventDetails.event_image.split('?')[0]!;
    const path = fullPath.split('/').pop()!;
    await supabase.storage.from('club_details').remove([path]);
  }
  const res = await supabase.from('events').delete().eq('event_id', event_id);

  if (res.error) {
    throw new Error(res.error.message);
  }

  return res.data;
};

export const getAllEvents = cache(async () => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase.from('events').select('*').eq('is_public', true);

  if (res.error) {
    return [];
  }

  return res.data;
});

export const getApprovedEventsForClub = cache(async (club_id: string) => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase
    .from('events')
    .select('*')
    .eq('club_id', club_id)
    .eq('is_public', true);
  // .eq('is_approved', true);

  if (res.error) {
    return [];
  }

  return res.data;
});
