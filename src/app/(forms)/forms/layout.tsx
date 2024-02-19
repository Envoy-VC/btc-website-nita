import React from 'react';

import { Navbar } from '~/components';

import { ChakraProvider } from '@chakra-ui/react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forms',
  description:
    'Browse through forms for event registrations and more. Streamline your participation process effortlessly.',
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
        <Navbar />
        {children}
      </div>
    </ChakraProvider>
  );
};

export default FormLayout;
