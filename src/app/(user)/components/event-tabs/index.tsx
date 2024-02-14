import React from 'react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs';

import { EventCard } from '~/components';

const EventTabs = () => {
  return (
    <div>
      <Tabs defaultValue='upcoming' className='w-full'>
        <TabsList className='max-w-sm'>
          <TabsTrigger value='upcoming'>Upcoming Events</TabsTrigger>
          <TabsTrigger value='past'>Past Events</TabsTrigger>
        </TabsList>
        <TabsContent value='upcoming'>
          <div className='grid w-full gap-4 md:grid-cols-2 2xl:grid-cols-3'>
            <div className='px-1 py-4 font-semibold text-neutral-700'>
              No Upcoming Events
            </div>
            {/* {Array(10)
              .fill(true)
              .map((event, index) => (
                <EventCard key={index} />
              ))} */}
          </div>
        </TabsContent>
        <TabsContent value='past'>
          <div className='grid w-full gap-4 md:grid-cols-2 2xl:grid-cols-3'>
            <div className='px-1 py-4 font-semibold text-neutral-700'>
              No Past Events
            </div>
            {/* {Array(10)
              .fill(true)
              .map((event, index) => (
                <EventCard key={index} />
              ))} */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventTabs;
