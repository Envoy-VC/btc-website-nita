import React from 'react';

import type { Club } from '~/types';

import { AspectRatio } from '~/components/ui/aspect-ratio';
import Image from 'next/image';
import { getImageLink } from '~/lib/utils';
import { MarkdownRenderer } from '~/components';

interface Props {
  club: Club;
}
const ClubDetails = ({ club }: Props) => {
  return (
    <div className='flex w-full flex-col gap-8'>
      <AspectRatio ratio={4} className='w-full'>
        <Image
          src={getImageLink(club.banner_image_url) ?? ''}
          width={1200}
          height={400}
          alt={`${club.club_name} Banner`}
          className='h-full w-full object-cover'
        />
      </AspectRatio>
      <div className='mx-auto flex w-full max-w-screen-xl flex-col gap-16 border-2 p-2'>
        <div className='flex flex-row items-center gap-4'>
          <Image
            src={getImageLink(club.logo_url) ?? ''}
            width={200}
            height={200}
            alt={`${club.club_name} Logo`}
            className='aspect-square w-full max-w-[6rem] rounded-full object-cover md:max-w-[7rem]'
          />
          <div className='flex flex-col'>
            <h1 className='max-w-3xl text-2xl font-semibold text-neutral-700 md:text-4xl'>
              {club.club_name}
            </h1>
            <div className='font-medium text-neutral-500'>
              Since {club.founding_year}
            </div>
            <span className='font-medium text-neutral-500'>
              Category:{' '}
              <span className='font-semibold text-neutral-700'>
                {club.category}
              </span>
            </span>
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <div className='text-xl font-semibold text-neutral-700'>
            Description
          </div>
          <p className='whitespace-pre-line  text-neutral-600'>
            <MarkdownRenderer content={club.description} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
