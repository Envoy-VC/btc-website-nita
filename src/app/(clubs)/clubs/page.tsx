import React from 'react';

import { Header } from '~/components';

import { getActiveClubs } from '~/lib/supabase/clubs';
import ClubList from '../components/club-list';

const Clubs = async () => {
  const clubs = await getActiveClubs();
  return (
    <div className='mx-auto w-full max-w-screen-2xl px-2 py-4'>
      <Header title='Clubs' description='' />
      <ClubList serverDetails={clubs} />
    </div>
  );
};

export default Clubs;
