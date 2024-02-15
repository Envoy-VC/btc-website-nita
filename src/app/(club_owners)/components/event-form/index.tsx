'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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

import { useAuth } from '@clerk/nextjs';

import { CalendarDateTime } from '@internationalized/date';

import { Switch } from '~/components/ui/switch';
import { Textarea } from '~/components/ui/textarea';
import { Input } from '~/components/ui/input';

import CoverImageUpload from './cover';

import { DateTimePicker } from '~/components/ui/date-time-picker';

import { eventSchema, type EventType } from '~/lib/zod';

import { updateEventDetails } from '~/lib/supabase/events';
import { createSupabaseClient } from '~/lib/supabase/client';

import { AiOutlineLoading } from 'react-icons/ai';
import type { Event } from '~/types';
import toast from 'react-hot-toast';

interface Props {
  event_id: string;
  serverDetails: Event;
}

const getCalenderDateTime = (iso_string: string): CalendarDateTime => {
  const date = new Date(iso_string);
  return new CalendarDateTime(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes()
  );
};

const getISOString = (date: CalendarDateTime): string => {
  return date.toDate('ist').toISOString();
};

const EventForm = ({ event_id, serverDetails }: Props) => {
  const { getToken } = useAuth();
  const form = useForm<EventType>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      event_name: serverDetails.event_name,
      venue: serverDetails.venue,
      description: serverDetails.description,
      rules: serverDetails.rules,
      is_public: serverDetails.is_public,
      start_datetime: getCalenderDateTime(serverDetails.start_datetime),
      end_datetime: getCalenderDateTime(serverDetails.end_datetime),
      registration_start_at: getCalenderDateTime(
        serverDetails.registration_start_at
      ),
      registration_end_at: getCalenderDateTime(
        serverDetails.registration_end_at
      ),
      registration_form: serverDetails.registration_form,
      feedback_form: serverDetails.feedback_form,
    },
  });

  const onSubmit = async (values: EventType) => {
    try {
      const supabaseAccessToken = await getToken({
        template: 'supabase',
      });

      const supabase = createSupabaseClient(supabaseAccessToken ?? '');

      const data: Partial<Event> = {
        event_name: values.event_name,
        venue: values.venue,
        description: values.description,
        rules: values.rules,
        is_public: values.is_public,
        start_datetime: getISOString(values.start_datetime!),
        end_datetime: getISOString(values.end_datetime!),
        registration_start_at: getISOString(values.registration_start_at!),
        registration_end_at: getISOString(values.registration_end_at!),
        registration_form: values.registration_form,
        feedback_form: values.feedback_form,
        event_image: serverDetails.event_image,
      };

      if (values.event_image) {
        const imageURI = await supabase.storage
          .from('club_details')
          .upload(
            `${serverDetails.club_id}-event-${event_id}`,
            values.event_image,
            {
              contentType: values.event_image.type,
              upsert: true,
            }
          );
        if (!imageURI.data?.path) {
          console.log(imageURI.error);
          throw new Error('Failed to upload banner');
        }
        // @ts-expect-error outdated types
        data.event_image = `${imageURI.data.fullPath}?${Date.now()}`;
      }

      await updateEventDetails(event_id, data);
      toast.success('Event details updated');
    } catch (error) {
      toast.error('Failed to update event details');
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-1'>
          <FormField
            control={form.control}
            name='event_image'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Event Image{' '}
                  <span className='text-md text-gray-500'>
                    (1200x630 recommended)
                  </span>
                </FormLabel>
                <FormControl>
                  <CoverImageUpload
                    {...field}
                    control={form.control}
                    currentCover={serverDetails.event_image}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex w-full flex-col gap-3 md:flex-row'>
            <FormField
              control={form.control}
              name='event_name'
              render={({ field }) => (
                <FormItem className='w-full max-w-md'>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Event Name'
                      {...field}
                      className='max-w-md'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='venue'
              render={({ field }) => (
                <FormItem className='w-full max-w-md'>
                  <FormLabel>Event Venue</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Event Venue (Meet link, location, etc.)'
                      {...field}
                      className='max-w-sm'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Details about the event'
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
            name='rules'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rules</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Rules for the event'
                    rows={10}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can use markdown to style your rules.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex w-full flex-col gap-4 lg:flex-row'>
            <FormField
              control={form.control}
              name='start_datetime'
              render={({ field }) => (
                <FormItem className='w-full max-w-md'>
                  <FormLabel>Event Start At</FormLabel>
                  <FormControl>
                    <DateTimePicker {...field} granularity={'minute'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='end_datetime'
              render={({ field }) => (
                <FormItem className='w-full max-w-md'>
                  <FormLabel>Event End At</FormLabel>
                  <FormControl>
                    <DateTimePicker {...field} granularity={'minute'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex w-full flex-col gap-4 lg:flex-row'>
            <FormField
              control={form.control}
              name='registration_start_at'
              render={({ field }) => (
                <FormItem className='w-full max-w-md'>
                  <FormLabel>Registrations Start At</FormLabel>
                  <FormControl>
                    <DateTimePicker {...field} granularity={'minute'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='registration_end_at'
              render={({ field }) => (
                <FormItem className='w-full max-w-md'>
                  <FormLabel>Registrations End At</FormLabel>
                  <FormControl>
                    <DateTimePicker {...field} granularity={'minute'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='is_public'
            render={({ field }) => (
              <FormItem className='flex w-fit flex-row items-center justify-between gap-4 rounded-lg p-3'>
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
          <FormField
            control={form.control}
            name='registration_form'
            render={({ field }) => (
              <FormItem className='w-full max-w-md'>
                <FormLabel>Registration Form ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder='eg- bd7ce150-c395-4112-9476-21a3f1eed06b'
                    {...field}
                    className='max-w-md'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='feedback_form'
            render={({ field }) => (
              <FormItem className='w-full max-w-md'>
                <FormLabel>Feedback Form ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder='eg- 32eb9ce8-7b0f-4757-b459-8d6860a237ad'
                    {...field}
                    className='max-w-md'
                  />
                </FormControl>
                <FormMessage />
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

export default EventForm;
