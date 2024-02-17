import React, { Suspense } from 'react';

import { auth } from '@clerk/nextjs';
import { DashboardHeader } from '~/app/(user)/components';
import CreateButton from '../../components/create-btn';

import { getClubForOwner } from '~/lib/supabase/clubs';
import { getEventsForClub } from '~/lib/supabase/events';
import { LoadingSpinner } from '~/components';

import { EventsTable } from '../../components/events-table';
import { columns } from '../../components/events-table/Column';

const ClubEventsPage = async () => {
  const { userId } = auth();
  const club = await getClubForOwner(userId ?? '');
  const events = await getEventsForClub(club?.club_id ?? '');

  if (club) {
    return (
      <div className='flex flex-col'>
        <DashboardHeader title='Events' description=''>
          <CreateButton type='event' club_id={club.club_id} />
        </DashboardHeader>
        <Suspense
          fallback={
            <div className='flex w-full items-center justify-center p-16'>
              <LoadingSpinner />
            </div>
          }
        >
          <EventsTable columns={columns} data={events} />
        </Suspense>
      </div>
    );
  }
};

export default ClubEventsPage;
