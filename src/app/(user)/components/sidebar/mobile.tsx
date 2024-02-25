import React from 'react';
import Image from 'next/image';

import DashboardItem from './pill';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '~/components/ui/sheet';
import { Separator } from '~/components/ui/separator';
import { Button } from '~/components/ui/button';

// Assets
import { BTCLogo } from '~/assets';
import { HiMenuAlt2 } from 'react-icons/hi';
import { HelpCard } from './index';
import { ActionBar } from '../nav';
import Link from 'next/link';

import type { SideNavItem } from '~/types';
import AddToHomeScreen from '~/components/install-pwa';

import { HiOutlineX } from 'react-icons/hi';

interface Props {
  items: SideNavItem[];
}

const MobileNavbar = ({ items }: Props) => {
  return (
    <div className='sticky top-0 z-[30] block w-full border-b bg-white px-4 py-3 lg:hidden'>
      <div className='flex flex-row items-center justify-between gap-2'>
        <div className='flex flex-row items-center gap-2'>
          <Sheet>
            <SheetTrigger asChild>
              <Button size='icon' className='rounded-lg p-2' variant='link'>
                <HiMenuAlt2 size={24} className='text-neutral-700' />
                <span className='sr-only'>Toggle Sidebar</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='px-3'>
              <SheetHeader>
                <SheetTitle className='flex flex-row items-center justify-between gap-2'>
                  <div className='flex flex-row gap-2'>
                    <Image
                      src={BTCLogo.src}
                      alt='BTC Logo'
                      width={30}
                      height={30}
                      className='rounded-full'
                    />
                    <span className='xxs:block hidden text-lg font-semibold text-neutral-700'>
                      Gymkhana Technical
                    </span>
                  </div>
                  <SheetClose className='rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-100 dark:ring-offset-neutral-950 dark:focus:ring-neutral-300 dark:data-[state=open]:bg-neutral-800'>
                    <HiOutlineX className='text-xl' />
                    <span className='sr-only'>Close</span>
                  </SheetClose>
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
        <div className='flex flex-row items-center gap-2 lg:hidden'>
          <AddToHomeScreen />
          <ActionBar />
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
