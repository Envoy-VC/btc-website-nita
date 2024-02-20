import React, { Suspense } from 'react';

import { SignOutButton, auth, currentUser } from '@clerk/nextjs';
import SearchBox from './search';

import { Button } from '~/components/ui/button';
import { Avatar, AvatarImage } from '~/components/ui/avatar';
import { Skeleton } from '~/components/ui/skeleton';
import { HiOutlineLogout } from 'react-icons/hi';

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
import { Role } from '~/types';

export const ActionBar = async () => {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata?.role ?? 0) as Role;
  const user = await currentUser();
  return (
    <div className='flex flex-row items-center gap-2'>
      {!user && (
        <Button variant='primary' asChild>
          <Link href='/sign-in'>Get Started</Link>
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
                <AvatarImage
                  src={user?.imageUrl}
                  alt={`${user?.firstName} ${user?.lastName} Avatar`}
                />
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
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link href='/dashboard'>Dashboard</Link>
              </DropdownMenuItem>
              {role >= Role.CLUB_OWNER && (
                <DropdownMenuItem asChild className='cursor-pointer'>
                  <Link href='/club-dashboard'>Club Dashboard</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link href='/dashboard/events'>Events</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link href='/dashboard/account'>Account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SignOutButton>
                  <Button size='sm' className='w-full !text-sm'>
                    <div className='flex flex-row items-center gap-2'>
                      <HiOutlineLogout className='text-lg' />
                      Sign Out
                    </div>
                  </Button>
                </SignOutButton>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const UserGreetings = async () => {
  const user = await currentUser();

  const greetings = (): string => {
    const date = new Date();
    const hour = date.getHours();
    if (hour < 12) {
      return 'Good Morning';
    } else if (hour <= 17) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  return (
    <div className='text-xl font-medium text-neutral-700'>
      {greetings()}, {user?.firstName} 👋
    </div>
  );
};

const DashboardNavbar = () => {
  return (
    <div className='fixed top-0 z-[10] hidden w-full border-b-[1px] border-neutral-200 bg-white p-5 pr-[18rem] lg:flex'>
      <div className='flex w-full flex-row items-center justify-between'>
        <Suspense fallback={<Skeleton className='h-12 w-full max-w-sm' />}>
          <UserGreetings />
        </Suspense>
        <SearchBox />
        <div className='hidden lg:flex'>
          <Suspense fallback={<Skeleton className='h-4 w-full max-w-xs' />}>
            <ActionBar />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
