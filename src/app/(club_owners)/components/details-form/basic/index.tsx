'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { clubDetailsSchema, type ClubDetailsType } from '~/lib/zod';

import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Switch } from '~/components/ui/switch';

import type { Club } from '~/types';

import { AiOutlineLoading } from 'react-icons/ai';

interface Props {
  serverDetails: Partial<Club>;
}

import { updateClubBasicDetails } from '~/lib/supabase/clubs';
import toast from 'react-hot-toast';

const ClubBasicDetails = ({ serverDetails }: Props) => {
  console.log(serverDetails);
  const form = useForm<ClubDetailsType>({
    resolver: zodResolver(clubDetailsSchema),
    defaultValues: {
      club_name: serverDetails.club_name,
      description: serverDetails.description,
      founding_year: serverDetails.founding_year,
      is_public: serverDetails.is_public,
      members: [],
    },
  });

  const onSubmit = async (values: ClubDetailsType) => {
    console.log(values);
    try {
      await updateClubBasicDetails(serverDetails.club_id!, values);
      toast.success('Updated Successfully');
    } catch (error) {
      toast.error('Failed to update club details');
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
          <FormField
            control={form.control}
            name='club_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Club Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Club Name'
                    {...field}
                    className='max-w-sm'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Details about the club'
                    rows={10}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can use markdown to style your description.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='founding_year'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Founding Year</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='2013'
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    className='max-w-xs'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='is_public'
            render={({ field }) => (
              <FormItem className='flex w-fit flex-row items-center justify-between gap-4 rounded-lg border p-3'>
                <FormLabel>Public</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='!my-4'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <AiOutlineLoading className='animate-spin text-xl' />
            ) : (
              'Update Details'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ClubBasicDetails;
