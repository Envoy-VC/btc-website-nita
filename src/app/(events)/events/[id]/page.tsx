import React from 'react';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

import { getApprovedEventDetails } from '~/lib/supabase/events';

import { EventDetails } from '../components';

const ClubPage = async () => {
  const headersList = headers();
  const path = headersList.get('x-pathname');
  const event_id = (path ?? '').split('/').pop() ?? '';

  const event = await getApprovedEventDetails(event_id);

  if (event) {
    return (
      <div>
        <EventDetails event={event} />
      </div>
    );
  } else {
    return notFound();
  }
};

export default ClubPage;
