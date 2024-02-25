import React from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign-in',
  description:
    'Sign in to your BTC Gymkhana Technical account. Access exclusive features, manage your profile, and stay connected with the vibrant college community.',
  twitter: {
    card: 'summary_large_image',
    title: 'Sign-in',
    description:
      'Sign in to your BTC Gymkhana Technical account. Access exclusive features, manage your profile, and stay connected with the vibrant college community.',
    creator: '@Envoy_1084',
    images: [
      {
        url: '/api/og?title=⚡ Get Started',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Get Started',
      },
    ],
  },
  openGraph: {
    title: 'Sign-in',
    description:
      'Sign in to your BTC Gymkhana Technical account. Access exclusive features, manage your profile, and stay connected with the vibrant college community.',
    type: 'website',
    locale: 'en_US',
    url: 'https://btc.gymkhananita.com/sign-in',
    images: [
      {
        url: '/api/og?title=⚡ Get Started',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Get Started',
      },
    ],
  },
};

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return <>{children}</>;
};

export default AuthLayout;
