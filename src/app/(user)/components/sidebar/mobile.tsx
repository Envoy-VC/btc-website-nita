import React from 'react';
import Image from 'next/image';

import { DashboardItem } from '.';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet';
import { Separator } from '~/components/ui/separator';
import { Button } from '~/components/ui/button';

import { items } from '.';

// Assets
import { BTCLogo } from '~/assets';
import { HiMenuAlt2 } from 'react-icons/hi';
import { HelpCard } from './index';

const MobileNavbar = () => {
  return (
    <div className='block px-4 py-3 lg:hidden'>
      <div className='flex flex-row items-center gap-2'>
        <Sheet>
          <SheetTrigger asChild>
            <Button size='icon' className='rounded-lg p-2' variant='link'>
              <HiMenuAlt2 size={24} className='text-neutral-700' />
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='px-3'>
            <SheetHeader>
              <SheetTitle className='flex flex-row items-center gap-2'>
                <Image
                  src={BTCLogo.src}
                  alt='BTC Logo'
                  width={30}
                  height={30}
                  className='rounded-full'
                />
                <span className='text-lg font-semibold text-neutral-700'>
                  Gymkhana Technical
                </span>
              </SheetTitle>
            </SheetHeader>
            <div className='py-4'>
              <Separator />
            </div>
            <div className='flex h-full flex-col justify-between'>
              <div className='py-0'>
                {items.map((item) => (
                  <DashboardItem key={item.name} {...item} />
                ))}
              </div>
              <div className='-translate-y-[100%]'>
                <HelpCard />
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Image
          src={BTCLogo.src}
          alt='BTC Logo'
          width={36}
          height={36}
          className='rounded-full'
        />
      </div>
    </div>
  );
};

export default MobileNavbar;
