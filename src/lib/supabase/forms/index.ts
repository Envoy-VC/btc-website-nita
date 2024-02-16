'use server';

import createSupabaseServerClient from '../client/server';

import type { Form } from '~/types';

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

export const getFormDetails = async (form_id: string) => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase.from('forms').select('*').eq('form_id', form_id);

  if (res.error) {
    throw new Error(res.error.message);
  }

  const form = res.data.at(0);

  return form ?? null;
};

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

export const getFormsForClub = async (club_id: string) => {
  const supabase = await createSupabaseServerClient();
  const res = await supabase.from('forms').select('*').eq('club_id', club_id);

  if (res.error) {
    throw new Error(res.error.message);
  }

  return res.data;
};
