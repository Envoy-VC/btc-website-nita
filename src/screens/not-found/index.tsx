import React from 'react';

import Image from 'next/image';

import { NotFoundImage } from '~/assets';
import { Button } from '~/components/ui/button';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <Image src={NotFoundImage} alt='404 Not Found' width={500} height={500} />
      <Button asChild className='mx-auto w-fit'>
        <Link href='/'>Go back to home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
