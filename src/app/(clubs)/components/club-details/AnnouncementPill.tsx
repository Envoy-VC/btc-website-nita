import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { MarkdownRenderer } from '~/components';

const AnnouncementPill = () => {
  return (
    <Card>
      <CardHeader className='my-0 py-2'>
        <CardTitle className='flex flex-col items-start justify-between gap-3 text-xl font-semibold text-neutral-700 md:flex-row md:items-center'>
          <div className='flex flex-row items-center gap-2'>
            <HiOutlineSpeakerphone className='text-2xl' />
            Announcement Title
          </div>
          <div className='text-sm font-semibold text-neutral-600'>
            26th Jan 2024, 12:00 PM
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className='my-0 flex flex-col items-start justify-between gap-2 pb-2 md:flex-row md:items-end'>
        <p className=''>
          <MarkdownRenderer
            content='
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi veritatis facere asperiores odit illum sunt voluptatem in quas iste quos incidunt, possimus ex numquam perferendis maxime ullam quis omnis laudantium?'
          />
        </p>
      </CardContent>
    </Card>
  );
};

export default AnnouncementPill;
