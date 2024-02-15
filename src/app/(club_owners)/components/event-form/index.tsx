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
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';

import { DateTimePicker } from '~/components/ui/date-time-picker';

import { eventSchema, type EventType } from '~/lib/zod';

const EventForm = () => {
  const form = useForm<EventType>({
    resolver: zodResolver(eventSchema),
  });

  function onSubmit(values: EventType) {
    console.log(values.start_datetime?.toDate('ist').toISOString());
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='start_datetime'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <DateTimePicker {...field} granularity={'minute'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default EventForm;
