import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { MarkdownRenderer } from '~/components';
import AnnouncementPill from './AnnouncementPill';
import SocialLinkPill from './SocialLinkPill';

import { Separator } from '~/components/ui/separator';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { ScrollArea } from '~/components/ui/scroll-area';

import { getImageLink } from '~/lib/utils';

import { HiExternalLink } from 'react-icons/hi';

import type { Club } from '~/types';
import { Button } from '~/components/ui/button';
import ClubEvents from './ClubEvents';
interface Props {
  club: Club;
}

const SectionHeader = ({
  title,
  children,
}: React.PropsWithChildren & { title: string }) => {
  return (
    <>
      <div className='flex w-full flex-row items-center justify-between gap-3'>
        <h3 className='flex flex-row items-center gap-2 px-2 text-2xl font-bold text-primary md:text-2xl'>
          {title}
        </h3>
        {children}
      </div>
      <Separator />
    </>
  );
};

const ClubDetails = ({ club }: Props) => {
  return (
    <div className='flex w-full flex-col gap-8 pb-12'>
      <AspectRatio ratio={4} className='w-full'>
        <Image
          src={getImageLink(club.banner_image_url) ?? ''}
          width={1200}
          height={400}
          alt={`${club.club_name} Banner`}
          className='h-full w-full object-cover'
        />
      </AspectRatio>
      <div className='mx-auto flex w-full max-w-screen-xl flex-col gap-16 p-2'>
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
          <SectionHeader title='About' />
          <p className='whitespace-pre-line  rounded-lg bg-gray-50 p-2 text-neutral-600'>
            <MarkdownRenderer content={club.description} />
          </p>
        </div>

        <div className='flex flex-col gap-8 lg:flex-row'>
          <div className='w-full basis-3/5'>
            <div className='flex flex-col gap-4 rounded-lg border p-3'>
              <SectionHeader title='Announcements'>
                <Button variant='outline' size='sm'>
                  View All
                </Button>
              </SectionHeader>
              <ScrollArea className='h-[20rem] rounded-md'>
                <div className='flex flex-col gap-3'>
                  <div className='py-8 text-center text-lg font-medium text-neutral-700'>
                    No announcements yet.
                  </div>
                  {/* {Array(6)
                    .fill(true)
                    .map((ele, idx) => (
                      <AnnouncementPill key={idx} />
                    ))} */}
                </div>
              </ScrollArea>
            </div>
          </div>
          <div className='w-full basis-2/5'>
            <div className='flex h-full flex-col gap-3 rounded-lg border p-3'>
              <SectionHeader title='Socials' />
              <div className='flex flex-col'>
                {club.website !== '' && (
                  <div className='flex flex-row items-center gap-2 font-semibold text-neutral-700'>
                    Website:
                    <Link href={club.website}>
                      <div className='flex flex-row items-center gap-2 font-medium text-neutral-600 underline'>
                        {club.website}
                        <HiExternalLink className='text-lg' />
                      </div>
                    </Link>
                  </div>
                )}
                {club.email !== '' && (
                  <div className='flex flex-row items-center gap-2 font-semibold text-neutral-700'>
                    E-mail:
                    <Link href={`mailto:${club.email}`}>
                      <div className='flex flex-row items-center gap-2 font-medium text-neutral-600 underline'>
                        {club.email}
                        <HiExternalLink className='text-lg' />
                      </div>
                    </Link>
                  </div>
                )}
              </div>
              <div className='flex flex-row flex-wrap gap-2 py-2'>
                {(club.social_media_links as { link: string }[]).map((link) => (
                  <SocialLinkPill link={link.link} key={link.link} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <SectionHeader title='Events'>
            <Button variant='outline' size='sm'>
              View All
            </Button>
          </SectionHeader>
          <ClubEvents club_id={club.club_id} />
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
