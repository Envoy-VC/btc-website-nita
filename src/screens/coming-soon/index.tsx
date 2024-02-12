import React from 'react';

import Image from 'next/image';

import { ComingSoonImage } from '~/assets';

const ComingSoonScreen = () => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <Image src={ComingSoonImage} alt='Coming Soon' width={500} height={500} />
      <div className='text-center text-xl font-medium text-neutral-700 sm:text-3xl'>
        Coming Soon...
      </div>
    </div>
  );
};

export default ComingSoonScreen;
