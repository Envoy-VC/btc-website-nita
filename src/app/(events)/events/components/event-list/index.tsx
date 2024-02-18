'use client';

import React from 'react';
import type { Event } from '~/types';

import { EventCard } from '~/components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

import { HiOutlineFilter } from 'react-icons/hi';
import {
  HiOutlineSortAscending,
  HiOutlineSortDescending,
} from 'react-icons/hi';
import { Input } from '~/components/ui/input';

import Fuse from 'fuse.js';

interface Props {
  serverDetails: Event[];
}

const EventList = ({ serverDetails }: Props) => {
  const [events, setEvents] = React.useState(serverDetails);
  const [filterVal, setFilterVal] = React.useState<string>('none');

  const onFilterByName = (name: string) => {
    if (name === '') {
      setEvents(serverDetails);
      return;
    }

    const events = serverDetails;

    const fuse = new Fuse(events, {
      includeScore: true,
      keys: [
        {
          name: 'event_name',
          weight: 0.7,
        },
        {
          name: 'venue',
          weight: 0.4,
        },
        {
          name: 'event_description',
          weight: 0.2,
        },
      ],
    });

    const result = fuse.search(name);

    result.sort((a, b) => (a.score ?? 0) - (b.score ?? 0));

    const filteredEvents = result.map((res) => res.item);

    setEvents(filteredEvents);
  };

  const onFilterChanged = (value: string) => {
    setFilterVal(value);
    if (value === 'none') {
      setEvents(serverDetails);
      return;
    }

    const events = serverDetails;

    if (value === 'start_datetime_asc') {
      events.sort((a, b) => {
        return (
          new Date(a.start_datetime).getTime() -
          new Date(b.start_datetime).getTime()
        );
      });
    } else if (value === 'start_datetime_desc') {
      events.sort((a, b) => {
        return (
          new Date(b.start_datetime).getTime() -
          new Date(a.start_datetime).getTime()
        );
      });
    } else if (value === 'end_datetime_asc') {
      events.sort((a, b) => {
        return (
          new Date(a.end_datetime).getTime() -
          new Date(b.end_datetime).getTime()
        );
      });
    } else if (value === 'end_datetime_desc') {
      events.sort((a, b) => {
        return (
          new Date(b.end_datetime).getTime() -
          new Date(a.end_datetime).getTime()
        );
      });
    }

    setEvents([...events]);
  };
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col justify-between gap-4 md:flex-row'>
        <Input
          placeholder='Search events by name'
          className='w-full max-w-96'
          onChange={(e) => onFilterByName(e.target.value)}
        />

        <div className='flex flex-row items-center gap-2'>
          <HiOutlineFilter className='text-lg' />
          <Select
            onValueChange={(val) => onFilterChanged(val)}
            value={filterVal}
          >
            <SelectTrigger className='w-[10rem]'>
              <SelectValue placeholder='Filter by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='none'>None</SelectItem>
              <SelectItem value='start_datetime_asc' className='px-3 py-1'>
                <div className='flex !w-full !flex-row items-center justify-start gap-1'>
                  <HiOutlineSortAscending className='mt-1 text-lg' />
                  Start Date
                </div>
              </SelectItem>
              <SelectItem value='start_datetime_desc' className='px-3 py-1'>
                <div className='flex !w-full !flex-row items-center justify-start gap-1'>
                  <HiOutlineSortDescending className='mt-1 text-lg' />
                  Start Date
                </div>
              </SelectItem>
              <SelectItem value='end_datetime_asc' className='px-3 py-1'>
                <div className='flex !w-full !flex-row items-center justify-start gap-1'>
                  <HiOutlineSortAscending className='mt-1 text-lg' />
                  End Date
                </div>
              </SelectItem>
              <SelectItem value='end_datetime_desc' className='px-3 py-1'>
                <div className='flex !w-full !flex-row items-center justify-start gap-1'>
                  <HiOutlineSortDescending className='mt-1 text-lg' />
                  End Date
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {events.map((event) => (
          <EventCard event={event} key={event.event_id} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
