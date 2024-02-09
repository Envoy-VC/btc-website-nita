import '~/styles/globals.css';

import { Inter } from 'next/font/google';

import { Toaster } from 'react-hot-toast';
import { ClerkProvider, ClerkLoaded } from '@clerk/nextjs';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Create T3 App',
  description: 'Generated by create-t3-app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <ClerkProvider>
        <body className={`font-sans ${inter.variable}`}>
          <ClerkLoaded>
            {children}
            <Toaster />
          </ClerkLoaded>
        </body>
      </ClerkProvider>
    </html>
  );
}
