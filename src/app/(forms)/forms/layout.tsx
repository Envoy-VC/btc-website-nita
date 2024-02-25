import React from 'react';

import { Navbar } from '~/components';

import { ChakraProvider } from '@chakra-ui/react';

import MobileNavbar from '~/app/(user)/components/sidebar/mobile';
import { homePageItems } from '~/lib/data';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forms',
  description:
    'Browse through forms for event registrations and more. Streamline your participation process effortlessly.',
  twitter: {
    card: 'summary_large_image',
    title: 'Forms | Gymkhana Technical',
    description:
      'Browse through forms for event registrations and more. Streamline your participation process effortlessly.',
    creator: '@Envoy_1084',
    images: [
      {
        url: '/api/og?title=📝 Forms',
        width: 1200,
        height: 630,
      },
    ],
  },
  openGraph: {
    title: 'Forms | Gymkhana Technical',
    description:
      'Browse through forms for event registrations and more. Streamline your participation process effortlessly.',
    type: 'website',
    locale: 'en_US',
    url: 'https://btc.gymkhananita.com/forms',
    images: [
      {
        url: '/api/og?title=📝 Forms',
        width: 1200,
        height: 630,
      },
    ],
  },
};

const FormLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <ChakraProvider>
      <div className='flex flex-col'>
        <div className='hidden lg:flex'>
          <Navbar />
        </div>
        <MobileNavbar items={homePageItems} />
        <div className=''>{children}</div>
      </div>
    </ChakraProvider>
  );
};

export default FormLayout;
