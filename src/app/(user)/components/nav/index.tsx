import React from 'react';

import { currentUser } from '@clerk/nextjs';
import SearchBox from './search';

import { Button } from '~/components/ui/button';
import { Avatar, AvatarImage } from '~/components/ui/avatar';

import { HiOutlineBell } from 'react-icons/hi';
import Link from 'next/link';

export const ActionBar = async () => {
  const user = await currentUser();

  return (
    <div className='flex flex-row items-center gap-2'>
      <Button variant='outline' asChild size='icon'>
        <Link href='/dashboard/notifications'>
          <HiOutlineBell className='text-2xl text-neutral-700' />
        </Link>
      </Button>
      <Link
        href='/dashboard/account'
        className='flex flex-row items-center rounded-lg border-[1px] border-neutral-300 px-2 py-1'
      >
        <Avatar className='h-8 w-8'>
          <AvatarImage src={user?.imageUrl} />
        </Avatar>{' '}
        <div className='flex flex-col px-2'>
          <span className='text-sm font-semibold text-neutral-700'>
            {user?.firstName}
          </span>
          <span className='text-xs text-neutral-500'>{user?.lastName}</span>
        </div>
      </Link>
    </div>
  );
};

const DashboardNavbar = async () => {
  const user = await currentUser();

  const greetings = (): string => {
    const date = new Date();
    const hour = date.getHours();
    if (hour < 12) {
      return 'Good Morning';
    } else if (hour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };
  return (
    <div className='hidden w-full border-b-[1px] border-neutral-200 p-5 lg:flex'>
      <div className='flex w-full flex-row items-center justify-between'>
        <div className='text-xl font-medium text-neutral-700'>
          {greetings()}, {user?.firstName} 👋
        </div>
        <SearchBox />
        <div className='hidden md:flex'>
          <ActionBar />
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
