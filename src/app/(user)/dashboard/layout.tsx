import '~/styles/globals.css';
import { DashboardNavbar, Sidebar } from '../components';
import MobileNavbar from '../components/sidebar/mobile';

import { userSideNavItems as items } from '~/lib/data';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    'Access your personalized dashboard. Manage event registrations, view analytics, and stay updated on campus activities—all in one convenient place.',
  twitter: {
    card: 'summary_large_image',
    title: 'Dashboard | Gymkhana Technical',
    description:
      'Access your personalized dashboard. Manage event registrations, view analytics, and stay updated on campus activities—all in one convenient place.',
    creator: '@Envoy_1084',
    images: [
      {
        url: '/api/og?title=📊 Dashboard',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: `Dashboard | Gymkhana Technical`,
      },
    ],
  },
  openGraph: {
    title: 'Dashboard | Gymkhana Technical',
    description:
      'Access your personalized dashboard. Manage event registrations, view analytics, and stay updated on campus activities—all in one convenient place.',
    type: 'website',
    locale: 'en_US',
    url: 'https://btc.gymkhananita.com/dashboard',
    images: [
      {
        url: '/api/og?title=📊 Dashboard',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: `Dashboard | Gymkhana Technical`,
      },
    ],
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col lg:flex-row'>
      <Sidebar items={items} />
      <MobileNavbar items={items} />
      <div className='flex w-full flex-col lg:ml-[16rem]'>
        <DashboardNavbar />
        <div className='px-3 py-6 sm:px-6 sm:py-10 md:px-12 lg:mt-16'>
          {children}
        </div>
      </div>
    </div>
  );
}
