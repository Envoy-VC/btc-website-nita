import React from 'react';

import { auth } from '@clerk/nextjs';
import { DashboardHeader } from '~/app/(user)/components';
import CreateButton from '../../components/create-btn';

import { getClubForOwner } from '~/lib/supabase/clubs';

const ClubEventsPage = async () => {
  const { userId } = auth();
  const club = await getClubForOwner(userId ?? '');
  if (club) {
    return (
      <div className='flex flex-col'>
        <DashboardHeader title='Events' description=''>
          <CreateButton type='event' club_id={club.club_id} />
        </DashboardHeader>
      </div>
    );
  }
};

export default ClubEventsPage;
