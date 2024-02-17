import React from 'react';
import { headers } from 'next/headers';

import { EventForm } from '~/app/(club_owners)/components';

import { getEventDetails } from '~/lib/supabase/events';

export const revalidate = 0;

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { notFound } from 'next/navigation';

import { DeleteButton } from '~/app/(club_owners)/components';

const EventEditPage = async () => {
  const headersList = headers();
  const path = headersList.get('x-pathname');
  const paths = (path ?? '').split('/');
  const event_id = paths.at(paths.length - 2) ?? '';

  const serverDetails = await getEventDetails(event_id);
  if (serverDetails) {
    return (
      <div>
        <Tabs defaultValue='edit'>
          <TabsList className='w-full'>
            <TabsTrigger value='edit' className='w-full'>
              Edit
            </TabsTrigger>
            <TabsTrigger value='advanced' className='w-full'>
              Advanced
            </TabsTrigger>
          </TabsList>
          <TabsContent value='edit'>
            <EventForm serverDetails={serverDetails} event_id={event_id} />
          </TabsContent>
          <TabsContent value='advanced'>
            <div className='py-4'>
              <DeleteButton type='event' id={serverDetails.event_id} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  } else {
    return notFound();
  }
};

export default EventEditPage;
