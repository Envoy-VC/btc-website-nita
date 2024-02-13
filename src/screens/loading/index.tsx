import Image from 'next/image';
import React from 'react';

import { BTCLogo } from '~/assets';

const LoadingScreen = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex max-w-lg flex-col items-center gap-6'>
        <Image
          src={BTCLogo}
          alt='BTC Logo'
          width={100}
          height={100}
          className='h-[72px] w-[72px] sm:h-[96px] sm:w-[96px]'
        />
        <div className='max-w-xs text-center text-lg font-medium leading-[1.1] text-neutral-800 sm:max-w-md sm:text-2xl md:max-w-lg md:text-[2rem]'>
          Board of Technical Community, Gymkhana
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
