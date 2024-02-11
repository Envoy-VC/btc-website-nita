'use client';

import React from 'react';
import Link from 'next/link';

import {
  HiOutlineTicket,
  HiOutlineUserCircle,
  HiOutlineBell,
  HiOutlineChartSquareBar,
} from 'react-icons/hi';
import { RxDashboard } from 'react-icons/rx';

import { usePathname } from 'next/navigation';

import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';

interface Props {
  name: string;
  href: string;
}

const DashboardItem = ({ name, href }: Props) => {
  const path = usePathname();
  const Icon = items.find((item) => item.name === name)!.Icon;
  return (
    <Button
      asChild
      variant='ghost'
      className={cn(
        'flex w-full flex-row items-start justify-start gap-2',
        path === href
          ? 'bg-primary text-gray-100 hover:bg-primary hover:text-gray-100 hover:opacity-95'
          : 'bg-white text-neutral-600'
      )}
    >
      <Link href={href} className='flex flex-row items-center gap-2'>
        <Icon size={20} />
        <span className=''>{name}</span>
      </Link>
    </Button>
  );
};

export const items = [
  {
    name: 'Dashboard',
    Icon: RxDashboard,
    href: '/dashboard',
  },
  {
    name: 'Events',
    Icon: HiOutlineTicket,
    href: '/dashboard/events',
  },
  {
    name: 'Notifications',
    Icon: HiOutlineBell,
    href: '/dashboard/notifications',
  },
  {
    name: 'Analytics',
    Icon: HiOutlineChartSquareBar,
    href: '/dashboard/analytics',
  },
  {
    name: 'Account',
    Icon: HiOutlineUserCircle,
    href: '/dashboard/account',
  },
];

export default DashboardItem;
