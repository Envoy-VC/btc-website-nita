import React from 'react';
import Image from 'next/image';

import DashboardItem from './pill';

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
import { ActionBar } from '../nav';
import Link from 'next/link';

const MobileNavbar = () => {
  return (
    <div className='fixed top-0 z-[10] block w-full border-2 bg-white px-4 py-3 lg:hidden'>
      <div className='flex flex-row items-center justify-between gap-2'>
        <div className='flex flex-row items-center gap-2'>
          <Sheet>
            <SheetTrigger asChild>
              <Button size='icon' className='rounded-lg p-2' variant='link'>
                <HiMenuAlt2 size={24} className='text-neutral-700' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='px-3'>
              <SheetHeader>
                <SheetTitle>
                  <div className='flex flex-row gap-2'>
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
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className='py-4'>
                <Separator />
              </div>
              <div className='flex h-full flex-col justify-between'>
                <div className='py-0'>
                  {items.map((item) => (
                    <DashboardItem
                      key={item.name}
                      name={item.name}
                      href={item.href}
                    />
                  ))}
                </div>
                <div className='-translate-y-[100%]'>
                  <HelpCard />
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href='/'>
            <Image
              src={BTCLogo.src}
              alt='BTC Logo'
              width={36}
              height={36}
              className='rounded-full'
            />
          </Link>
        </div>
        <div className='flex lg:hidden'>
          <ActionBar />
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
