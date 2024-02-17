import React from 'react';
import { notFound } from 'next/navigation';

import { headers } from 'next/headers';

import { ClubDetails } from '../../components';

import { getActiveClubById } from '~/lib/supabase/clubs';

const ClubPage = async () => {
  const headersList = headers();
  const path = headersList.get('x-pathname');
  const clubId = (path ?? '').split('/').pop() ?? '';
  const club = await getActiveClubById(clubId);
  if (club) {
    return (
      <div>
        <ClubDetails club={club} />
      </div>
    );
  } else {
    return notFound();
  }
};

export default ClubPage;
