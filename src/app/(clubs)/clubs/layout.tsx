import React from 'react';

import { Navbar } from '~/components';

import MobileNavbar from '~/app/(user)/components/sidebar/mobile';

import type { Metadata } from 'next';

import { homePageItems } from '~/lib/data';

export const metadata: Metadata = {
  title: 'Clubs',
  description:
    'Explore diverse clubs at NIT Agartala. Find your interests, connect with like-minded peers, and enrich your college experience.',
  twitter: {
    card: 'summary_large_image',
    title: 'Clubs | Gymkhana Technical',
    description:
      'Explore diverse clubs at NIT Agartala. Find your interests, connect with like-minded peers, and enrich your college experience.',
    creator: '@Envoy_1084',
    images: [
      {
        url: '/api/og?title=🏫 Clubs',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Clubs | Gymkhana Technical',
      },
    ],
  },
  openGraph: {
    title: 'Clubs | Gymkhana Technical',
    description:
      'Explore diverse clubs at NIT Agartala. Find your interests, connect with like-minded peers, and enrich your college experience.',
    type: 'website',
    locale: 'en_US',
    url: 'https://btc.gymkhananita.com/clubs',
    images: [
      {
        url: '/api/og?title=🏫 Clubs',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Clubs | Gymkhana Technical',
      },
    ],
  },
};

const ClubsLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='flex flex-col'>
      <div className='hidden lg:flex'>
        <Navbar />
      </div>
      <MobileNavbar items={homePageItems} />
      <div className=''>{children}</div>
    </div>
  );
};

export default ClubsLayout;
