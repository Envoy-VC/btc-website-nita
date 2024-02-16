import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

import type { Event } from '~/types';
import { getImageLink, formatDate } from '~/lib/utils';
import { Button } from '~/components/ui/button';

import { HiOutlinePencilAlt } from 'react-icons/hi';

interface Props {
  event: Event;
  test?: string;
}

const EventCard = ({ event }: Props) => {
  return (
    <div className='rounded-xl border border-neutral-100 p-2 shadow-sm'>
      <div className='flex flex-row items-start justify-between gap-3'>
        <div className='flex flex-row items-start gap-3'>
          <Image
            alt={`${event.event_name} Cover Image`}
            src={
              getImageLink(event.event_image) ??
              'https://placehold.co/1200x630@3x.png?text=Cover+Image+\n(1200x630)'
            }
            width={1200}
            height={630}
            className='max-w-[10rem] rounded-lg object-cover'
          />
          <div className='flex flex-col'>
            <div className='text0neutral-700 text-2xl font-semibold'>
              {event.event_name}
            </div>
            <span className='font-semibold text-neutral-700'>
              Venue:{' '}
              <span className='font-medium text-neutral-600'>
                {event.venue}
              </span>
            </span>
            <span className='font-semibold text-neutral-700'>
              Event Start:{' '}
              <span className='font-medium text-neutral-600'>
                {formatDate(event.start_datetime)}
              </span>
            </span>
            <span className='font-semibold text-neutral-700'>
              Event End:{' '}
              <span className='font-medium text-neutral-600'>
                {formatDate(event.end_datetime)}
              </span>
            </span>
          </div>
        </div>
        <div>
          <Button variant='outline' asChild>
            <Link
              href={`/club-dashboard/events/${event.event_id}/edit`}
              className='flex flex-row gap-2'
            >
              <HiOutlinePencilAlt className='text-xl text-neutral-700' />
              Edit
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
