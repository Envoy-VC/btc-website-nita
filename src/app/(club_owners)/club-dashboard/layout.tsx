import React, { Suspense } from 'react';

import { Role } from '~/types';
import RoleProtect from '~/components/role-protect';

import { Sidebar, DashboardNavbar } from '~/app/(user)/components';
import MobileNavbar from '~/app/(user)/components/sidebar/mobile';

import { clubDashboardSidebarNavItems as items } from '~/lib/data';
import { LoadingSpinner } from '~/components';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Club Dashboard',
  description:
    'Access your club dashboard at BTC Gymkhana Technical. Manage events, track member activity, and stay organized effortlessly.',
  openGraph: {
    title: 'Club Dashboard',
    description:
      'Access your club dashboard at BTC Gymkhana Technical. Manage events, track member activity, and stay organized effortlessly.',
    type: 'website',
    locale: 'en_US',
    url: 'https://btc.gymkhananita.com/club-dashboard',
    images: [
      {
        url: '/api/og?title=🖥️ Club Dashboard',
        width: 1200,
        height: 630,
      },
    ],
  },
};

const ClubDashboardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='flex flex-col lg:flex-row'>
      <Sidebar items={items} />
      <MobileNavbar items={items} />
      <RoleProtect role={Role.CLUB_OWNER}>
        <div className='mt-16 flex w-full flex-col lg:ml-[16rem] lg:mt-0'>
          <DashboardNavbar />
          <div className='px-3 py-6 sm:px-6 sm:py-10 md:px-12 lg:mt-16'>
            <Suspense
              fallback={
                <div className='flex w-full items-center justify-center py-12'>
                  <LoadingSpinner className='text-4xl' />
                </div>
              }
            >
              {children}
            </Suspense>
          </div>
        </div>
      </RoleProtect>
    </div>
  );
};

export default ClubDashboardLayout;
