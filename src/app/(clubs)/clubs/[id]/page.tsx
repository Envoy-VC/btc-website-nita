import React from 'react';

import { headers } from 'next/headers';

import { ClubDetails } from '../../components';

import { getActiveClubById } from '~/lib/supabase/clubs';
import NotFound from '~/screens/not-found';

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
    return (
      <div>
        <NotFound />
      </div>
    );
  }
};

export default ClubPage;
