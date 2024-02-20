'use client';

import React from 'react';

import { Input } from '~/components/ui/input';
import ClubCard from '../club-card';

import Fuse from 'fuse.js';

import type { Club } from '~/types';

interface Props {
  serverDetails: Club[];
}

const ClubList = ({ serverDetails }: Props) => {
  const [clubs, setClubs] = React.useState(serverDetails);
  const [filterVal, setFilterVal] = React.useState<string>('none');

  const onFilterByName = (name: string) => {
    if (name === '') {
      setClubs(serverDetails);
      return;
    }

    const clubs = serverDetails;

    const fuse = new Fuse(clubs, {
      includeScore: true,
      keys: [
        {
          name: 'club_name',
          weight: 0.7,
        },
        {
          name: 'description',
          weight: 0.1,
        },
        {
          name: 'club_id',
          weight: 0.4,
        },
        {
          name: 'website',
          weight: 0.2,
        },
      ],
    });

    const result = fuse.search(name);

    result.sort((a, b) => (a.score ?? 0) - (b.score ?? 0));

    const filteredClubs = result.map((res) => res.item);

    setClubs(filteredClubs);
  };

  return (
    <div className='flex flex-col gap-4'>
      <Input
        placeholder='Search clubs...'
        className='w-full max-w-96'
        onChange={(e) => onFilterByName(e.target.value)}
      />
      <div className='grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {clubs.map((club) => (
          <ClubCard club={club} key={club.club_id} />
        ))}
      </div>
    </div>
  );
};

export default ClubList;
