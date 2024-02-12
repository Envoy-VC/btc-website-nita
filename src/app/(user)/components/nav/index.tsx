import React from 'react';

import { SignOutButton, currentUser } from '@clerk/nextjs';
import SearchBox from './search';

import { Button } from '~/components/ui/button';
import { Avatar, AvatarImage } from '~/components/ui/avatar';

export const revalidate = 3600;

import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

export const ActionBar = async () => {
  const user = await currentUser();

  return (
    <div className='flex flex-row items-center gap-2'>
      {!user && (
        <Button variant='primary' asChild>
          <Link href='/sign-in'>Sign In</Link>
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger>
          {user && (
            <Link
              href='/dashboard/account'
              className='flex flex-row items-center rounded-lg border-[1px] border-neutral-300 px-5 py-1'
            >
              <Avatar className='h-8 w-8'>
                <AvatarImage src={user?.imageUrl} />
              </Avatar>{' '}
              <div className='flex flex-col px-2'>
                <span className='text-sm font-semibold text-neutral-700'>
                  {user?.firstName}
                </span>
                <span className='text-xs text-neutral-500'>
                  {user?.lastName}
                </span>
              </div>
            </Link>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[160px]'>
          {user && (
            <>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href='/dashboard'>Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/dashboard/events'>Events</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href='/dashboard/account'>Account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button size='sm' className='w-full !text-sm'>
                  <SignOutButton>Sign Out</SignOutButton>
                </Button>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
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
    <div className='fixed top-0 z-[10] hidden w-full border-b-[1px] border-neutral-200 bg-white p-5 pr-[18rem] lg:flex'>
      <div className='flex w-full flex-row items-center justify-between'>
        <div className='text-xl font-medium text-neutral-700'>
          {greetings()}, {user?.firstName} 👋
        </div>
        <SearchBox />
        <div className='hidden lg:flex  '>
          <ActionBar />
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
