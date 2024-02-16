import React from 'react';

import { getEventsForClub } from '~/lib/supabase/events';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs';

import EventCard from '../event-card';

export const revalidate = 1;

interface Props {
  clubId: string;
}

const EventTabs = async ({ clubId }: Props) => {
  const events = await getEventsForClub(clubId);

  const upcomingEvents = events.filter(
    (event) => new Date(event.end_datetime).getTime() > Date.now()
  );

  const pastEvents = events.filter(
    (event) => new Date(event.end_datetime).getTime() < Date.now()
  );

  return (
    <div>
      <Tabs defaultValue='upcoming' className='w-full'>
        <TabsList className='max-w-sm'>
          <TabsTrigger value='upcoming'>Upcoming Events</TabsTrigger>
          <TabsTrigger value='past'>Past Events</TabsTrigger>
        </TabsList>
        <TabsContent value='upcoming'>
          <div className='flex flex-col gap-2'>
            {upcomingEvents.length === 0 && (
              <div className='px-1 py-4 font-semibold text-neutral-700'>
                No Upcoming Events
              </div>
            )}
            {upcomingEvents.length !== 0 && (
              <div className='flex flex-col'>
                {upcomingEvents.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value='past'>
          <div className='grid w-full gap-4 md:grid-cols-2 2xl:grid-cols-3'>
            {pastEvents.length === 0 && (
              <div className='px-1 py-4 font-semibold text-neutral-700'>
                No Past Events
              </div>
            )}
            {pastEvents.length !== 0 && (
              <div className='flex flex-col'>
                {upcomingEvents.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventTabs;
