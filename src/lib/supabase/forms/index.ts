'use server';

import createSupabaseServerClient from '../client/server';
import { cache } from 'react';

import { getUser } from '../user';

import type { Form } from '~/types';
import type { Json } from '~/types/database';

export const createFormForClub = async (club_id: string, owner_id: string) => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase
    .from('forms')
    .insert({
      club_id: club_id,
      owner_id: owner_id,
    })
    .select('form_id');

  if (res.error) {
    throw new Error(res.error.message);
  }

  const form = res.data.at(0);

  return form?.form_id ?? null;
};

export const getFormDetails = cache(async (form_id: string) => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase.from('forms').select('*').eq('form_id', form_id);

  if (res.error) {
    return null;
  }

  const form = res.data.at(0);

  return form ?? null;
});

export const updateFormDetails = async (
  form_id: string,
  data: Partial<Form>
) => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase.from('forms').update(data).eq('form_id', form_id);

  if (res.error) {
    throw new Error(res.error.message);
  }

  return res.data;
};

export const getFormsForClub = cache(async (club_id: string) => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase.from('forms').select('*').eq('club_id', club_id);

  if (res.error) {
    return [];
  }

  return res.data;
});

export const getFormById = cache(async (id: string) => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase.from('forms').select('*').eq('form_id', id);

  if (res.error) {
    return null;
  }

  const form = res.data.at(0) ?? null;
  if (!form) return null;

  const isActive =
    form.is_public &&
    new Date(form.end_datetime).getTime() > Date.now() &&
    new Date(form.start_datetime).getTime() < Date.now();

  if (isActive) {
    return form;
  } else {
    return null;
  }
});

export const createFormResponse = async (
  form_id: string,
  user_id: string,
  data: object
) => {
  const supabase = await createSupabaseServerClient();
  const user = await getUser(user_id);
  const res = await supabase.from('form_responses').insert({
    user_details: user,
    form_id,
    user_id,
    form_data: data as Json,
  });

  if (res.error) {
    throw new Error(res.error.message);
  }

  return res.data;
};

export const deleteForm = async (form_id: string) => {
  const supabase = await createSupabaseServerClient();
  await supabase.from('form_responses').delete().eq('form_id', form_id);
  const res = await supabase.from('forms').delete().eq('form_id', form_id);

  if (res.error) {
    throw new Error(res.error.message);
  }

  return res.data;
};

export const getFormResponses = async (form_id: string) => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase
    .from('form_responses')
    .select('*')
    .eq('form_id', form_id);

  if (res.error) {
    return [];
  }

  const data = res.data;

  return data;
};

export const getActiveForms = async () => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase
    .from('forms')
    .select('*')
    .gte('end_datetime', new Date().toISOString())
    .lte('start_datetime', new Date().toISOString());

  if (res.error) {
    return [];
  }

  return res.data;
};
