import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { HiOutlineExternalLink } from 'react-icons/hi';
import { EventImage } from '~/assets';

const EventCard = () => {
  return (
    <Link
      href='/'
      className='flex flex-col gap-2 rounded-xl p-2'
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
      }}
    >
      <Image
        src={EventImage.src}
        width={500}
        height={300}
        alt='Event'
        className='aspect-video w-full rounded-lg object-cover'
      />
      <div className='flex flex-row items-center justify-between gap-2'>
        <div className='flex flex-col'>
          <span className='text-lg font-semibold text-neutral-700'>
            InsightX
          </span>
          <span className='text-sm text-neutral-500'>
            by Entrepreneurship Cell
          </span>
        </div>

        <div className='flex flex-col items-end justify-end'>
          <span className='font-semibold text-neutral-600'>Jan 14-18</span>
          <div className='flex flex-row items-center gap-2 text-sm text-neutral-500'>
            400+ attendees
            <Link href='/'>
              <HiOutlineExternalLink className='font-neutral-400 text-sm' />
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
