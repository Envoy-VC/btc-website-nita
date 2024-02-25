import React from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign-up',
  description:
    'Sign up for BTC Gymkhana Technical. Join events, explore clubs, and immerse yourself in college life. Start your journey today!',
  twitter: {
    card: 'summary_large_image',
    title: 'Sign-up',
    description:
      'Sign up for BTC Gymkhana Technical. Join events, explore clubs, and immerse yourself in college life. Start your journey today!',
    creator: '@Envoy_1084',
    images: [
      {
        url: '/api/og?title=👨‍💻 Create Account',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Create Account',
      },
    ],
  },
  openGraph: {
    title: 'Sign-up',
    description:
      'Sign up for BTC Gymkhana Technical. Join events, explore clubs, and immerse yourself in college life. Start your journey today!',
    type: 'website',
    locale: 'en_US',
    url: 'https://btc.gymkhananita.com/sign-up',
    images: [
      {
        url: '/api/og?title=👨‍💻 Create Account',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Create Account',
      },
    ],
  },
};

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return <>{children}</>;
};

export default AuthLayout;
