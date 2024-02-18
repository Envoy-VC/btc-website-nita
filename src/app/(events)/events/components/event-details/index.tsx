import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Separator } from '~/components/ui/separator';
import { MarkdownRenderer } from '~/components';

import { Button } from '~/components/ui/button';

import { getImageLink } from '~/lib/utils';

import type { Event } from '~/types';
import { formatDate } from '~/lib/utils';

import { HiOutlineClipboardList } from 'react-icons/hi';

interface Props {
  event: Event;
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

const EventDetails = ({ event }: Props) => {
  return (
    <div className='flex w-full flex-col gap-8 pb-12'>
      <div className='mx-auto w-full max-w-screen-xl lg:my-4'>
        <div className='eventCardShadow flex flex-col gap-8 rounded-lg sm:mx-4 lg:flex-row-reverse lg:border'>
          <div className='w-full basis-1/2'>
            <AspectRatio ratio={1.904} className=''>
              <Image
                src={
                  getImageLink(event.event_image) ??
                  'https://placehold.co/1200x300@3x.png?text=Cover+Image+\n(1200x300)'
                }
                className='w-full rounded-[0px] object-cover lg:rounded-r-lg'
                alt={`${event.event_name} Cover Image`}
                fill
              />
            </AspectRatio>
          </div>
          <div className='mx-3 flex w-full basis-1/2 flex-col justify-center gap-4 lg:px-6'>
            <h1 className='text-2xl font-semibold text-neutral-700 md:text-3xl lg:text-4xl'>
              {event.event_name}
            </h1>
            <div className='flex flex-col'>
              <div className='flex flex-row gap-2 font-semibold text-secondary'>
                Venue:
                <p className='text-neutral-700'>{event.venue}</p>
              </div>
              <div className='flex flex-row gap-2 font-semibold text-secondary'>
                Event Start At:
                <p className='text-neutral-700'>
                  {formatDate(event.start_datetime)}
                </p>
              </div>
              <div className='flex flex-row gap-2 font-semibold text-secondary'>
                Event End At:
                <p className='text-neutral-700'>
                  {formatDate(event.end_datetime)}
                </p>
              </div>
              <Button asChild className='my-4 w-fit'>
                <Link
                  href={`/forms/${event.registration_form}`}
                  className='flex w-fit items-center justify-center gap-2'
                >
                  <HiOutlineClipboardList className='text-xl' />
                  Register
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='mx-auto flex w-full max-w-screen-xl flex-col gap-16 p-2'>
        <div className='flex flex-col gap-3'>
          <SectionHeader title='About Event' />
          <p className='whitespace-pre-line  rounded-lg p-2 text-neutral-600'>
            <MarkdownRenderer content={event.description} />
          </p>
        </div>

        <div className='flex flex-col gap-3'>
          <SectionHeader title='Rules' />
          <p className='whitespace-pre-line rounded-lg p-2 text-neutral-600'>
            <MarkdownRenderer content={event.rules} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
