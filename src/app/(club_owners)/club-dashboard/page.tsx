import React from 'react';

import { currentUser } from '@clerk/nextjs';
import { getClubForOwner } from '~/lib/supabase/clubs';

const ClubDashboard = async () => {
  const club = await currentUser().then(async (user) => {
    if (user) {
      return await getClubForOwner(user.id);
    } else {
      return null;
    }
  });

  return <pre>{JSON.stringify(club, null, 2)}</pre>;
};

export default ClubDashboard;
