import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { ScrollArea } from '~/components/ui/scroll-area';

const UpcomingEvents = () => {
  return (
    <Card className='col-span-4 w-full'>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className='pl-2'>
        <ScrollArea className='flex max-h-96 flex-col gap-2 px-4'>
          <div className='py-4 font-semibold text-neutral-700'>
            No upcoming events
          </div>
          {/* {Array(16)
            .fill(true)
            .map((event, index) => (
              <EventPill key={`event-${index}`} />
            ))} */}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const EventPill = () => {
  return (
    <div className='flex flex-row items-center justify-between gap-3 rounded-lg p-1 shadow-sm'>
      <div className='flex flex-row items-center gap-3'>
        <div className='aspect-video w-[96px] rounded-md bg-gray-100'></div>
        <div className='flex flex-col font-medium'>
          <div className='font-semibold text-neutral-800'>InsightX</div>
          <div className='text-sm  text-neutral-500'>
            visvesvaraya Auditorium
          </div>
        </div>
      </div>
      <div className='text-sm text-neutral-700'>14th Jan</div>
    </div>
  );
};

export default UpcomingEvents;
