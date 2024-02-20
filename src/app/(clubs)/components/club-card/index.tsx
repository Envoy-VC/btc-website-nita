import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { HiOutlineExternalLink } from 'react-icons/hi';
import { getImageLink } from '~/lib/utils';

import type { Club } from '~/types';

interface Props {
  club: Club;
}

const ClubCard = ({ club }: Props) => {
  return (
    <div>
      <Link
        href={`/clubs/${club.club_id}`}
        className='flex flex-col gap-2 rounded-xl p-2'
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
        }}
      >
        <Image
          src={
            getImageLink(club.cover_photo_url) ??
            `/api/og?title=${club.club_name}`
          }
          width={500}
          height={300}
          alt='Event'
          className='aspect-video w-full rounded-lg object-cover'
        />
        <div className='flex flex-row items-center justify-between gap-2'>
          <div className='flex flex-col'>
            <span className='text-lg font-semibold text-neutral-700'>
              {club.club_name}
            </span>
            <span className='text-sm text-neutral-500'>
              Founding Year: {club.founding_year}
            </span>
          </div>

          <div className='flex flex-col items-end justify-end'>
            <span className='font-semibold text-neutral-600'>
              {club.category}
            </span>
            <div className='flex flex-row items-center gap-2 text-sm text-neutral-500'>
              View Page
              <Link href={`/clubs/${club.club_id}`}>
                <HiOutlineExternalLink className='font-neutral-400 text-sm' />
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ClubCard;
