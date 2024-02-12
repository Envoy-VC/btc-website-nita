import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { BTCLogo } from '~/assets';
import NavMenu from '../nav-menu';

import { ActionBar } from '~/app/(user)/components/nav';

const Navbar = () => {
  return (
    <div className='flex w-full flex-row justify-between gap-3 border-2 px-4 py-4'>
      <Link href='/' className='flex items-center gap-3'>
        <Image
          src={BTCLogo.src}
          alt='BTC Logo'
          width={46}
          height={46}
          className='h-10 w-10 rounded-full sm:h-12 sm:w-12'
        />
        <div className='flex flex-col gap-0 font-bold'>
          <span className='text-lg text-neutral-700 sm:text-xl'>Gymkhana</span>
          <span className='text-xs uppercase text-neutral-500'>Technical</span>
        </div>
      </Link>
      <div className='hidden md:block'>
        <NavMenu />
      </div>
      <ActionBar />
    </div>
  );
};

export default Navbar;
