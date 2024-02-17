import React from 'react';
import { headers } from 'next/headers';

import { EventForm } from '~/app/(club_owners)/components';

import { getEventDetails } from '~/lib/supabase/events';

export const revalidate = 0;

import NotFound from '~/screens/not-found';

const EventEditPage = async () => {
  const headersList = headers();
  const path = headersList.get('x-pathname');
  const paths = (path ?? '').split('/');
  const event_id = paths.at(paths.length - 2) ?? '';

  const serverDetails = await getEventDetails(event_id);
  if (serverDetails) {
    return (
      <div>
        <EventForm serverDetails={serverDetails} event_id={event_id} />
      </div>
    );
  } else {
    return (
      <div>
        <NotFound />
      </div>
    );
  }
};

export default EventEditPage;
