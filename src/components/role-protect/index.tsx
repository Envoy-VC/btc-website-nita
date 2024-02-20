import React from 'react';

import { auth } from '@clerk/nextjs';

import type { Role } from '~/types';
import Image from 'next/image';
import { UnauthorizedImage } from '~/assets';
import { Button } from '../ui/button';
import Link from 'next/link';

interface Props extends React.PropsWithChildren {
  role: Role;
  message?: string;
}

const RoleProtect = ({ children, role, message }: Props) => {
  const { sessionClaims } = auth();
  const metadata = (sessionClaims as CustomJwtSessionClaims)?.metadata;
  const currentRole = metadata?.role as Role;

  if (currentRole >= role) {
    return <>{children}</>;
  } else {
    return (
      <div className='flex w-full items-center justify-center py-16 sm:py-24'>
        <div className='flex flex-col gap-2'>
          <Image
            src={UnauthorizedImage}
            alt='Unauthorized'
            width={400}
            height={400}
            className='w-full max-w-xs sm:max-w-sm'
          />
          <h1 className='mt-4 text-center text-2xl font-semibold text-primary'>
            {message ?? 'Unauthorized Access'}
          </h1>
          <Button asChild className='mx-auto w-fit'>
            <Link href='/'>Go back to home</Link>
          </Button>
        </div>
      </div>
    );
  }
};

export default RoleProtect;
