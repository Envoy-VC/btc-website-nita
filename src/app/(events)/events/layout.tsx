import React from 'react';
import MobileNavbar from '~/app/(user)/components/sidebar/mobile';

import type { Metadata } from 'next';

import { Navbar } from '~/components';
import { homePageItems } from '~/lib/data';

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Discover upcoming events at BTC Gymkhana Technical. Register and participate in various activities. Stay engaged with college life.',
  openGraph: {
    title: 'Events | Gymkhana Technical',
    description:
      'Discover upcoming events at BTC Gymkhana Technical. Register and participate in various activities. Stay engaged with college life.',
    type: 'website',
    locale: 'en_US',
    url: 'https://btc.gymkhananita.com/events',
    images: [
      {
        url: '/api/og?title=🎟️ Events',
        width: 1200,
        height: 630,
      },
    ],
  },
};

const EventsLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='flex flex-col'>
      <div className='hidden lg:flex'>
        <Navbar />
      </div>
      <MobileNavbar items={homePageItems} />
      <div className='py-20 lg:py-0'>{children}</div>
    </div>
  );
};

export default EventsLayout;
