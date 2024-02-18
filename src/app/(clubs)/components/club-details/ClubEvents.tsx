import React from 'react';

import { EventCard } from '~/components';

interface Props {
  club_id: string;
}

import { getApprovedEventsForClub } from '~/lib/supabase/events';

const ClubEvents = async ({ club_id }: Props) => {
  const events = await getApprovedEventsForClub(club_id);
  return (
    <div className='grid w-full gap-4 md:grid-cols-2 2xl:grid-cols-3'>
      {events.map((event, idx) => (
        <EventCard key={idx} event={event} />
      ))}
    </div>
  );
};

export default ClubEvents;
