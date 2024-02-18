import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { HiOutlineExternalLink } from 'react-icons/hi';
import { getImageLink, formatRange } from '~/lib/utils';
import type { Event } from '~/types';

interface Props {
  event: Event;
}

const EventCard = ({ event }: Props) => {
  return (
    <Link
      href={`/events/${event.event_id}`}
      className='flex flex-col gap-2 rounded-xl p-2'
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
      }}
    >
      <Image
        src={getImageLink(event.event_image) ?? ''}
        width={500}
        height={300}
        alt='Event'
        className='aspect-video w-full rounded-lg object-cover'
      />
      <div className='flex flex-row items-center justify-between gap-2'>
        <div className='flex flex-col'>
          <span className='text-lg font-semibold text-neutral-700'>
            {event.event_name}
          </span>
          <span className='text-sm text-neutral-500'>Venue: {event.venue}</span>
        </div>

        <div className='flex flex-col items-end justify-end'>
          <span className='font-semibold text-neutral-600'>
            {formatRange(event.start_datetime, event.end_datetime)}
          </span>
          <div className='flex flex-row items-center gap-2 text-sm text-neutral-500'>
            View Page
            <Link href={`/events/${event.event_id}`}>
              <HiOutlineExternalLink className='font-neutral-400 text-sm' />
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
