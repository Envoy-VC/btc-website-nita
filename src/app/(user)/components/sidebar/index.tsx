import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Separator } from '~/components/ui/separator';
import DashboardItem from './pill';

import { HiOutlineExternalLink } from 'react-icons/hi';
import { IoHelpBuoy } from 'react-icons/io5';
import { BTCLogo } from '~/assets';

import type { SideNavItem } from '~/types';

export const HelpCard = () => {
  return (
    <div className='rounded-lg border-[1px] border-neutral-300 p-4'>
      <div className='flex flex-row items-center gap-3'>
        <IoHelpBuoy className='text-4xl text-primary' />
        <div className='flex flex-col text-neutral-700'>
          <span className='font-semibold'>Need Help?</span>
          <Link
            className='flex flex-row items-center gap-1 text-xs text-neutral-500'
            href='mailto:vedantchainani1084@gmail.com'
            target='_blank'
          >
            Contact us
            <HiOutlineExternalLink />
          </Link>
        </div>
      </div>
    </div>
  );
};

interface Props {
  items: SideNavItem[];
}

const Sidebar = ({ items }: Props) => {
  return (
    <div className='fixed hidden h-full max-h-screen w-full max-w-[16rem] border-r-[1px] border-neutral-200 p-2 lg:block'>
      <div className='flex h-full flex-col justify-between'>
        <div className='flex flex-col'>
          <Link href='/' className='flex items-center gap-3'>
            <Image
              src={BTCLogo.src}
              alt='BTC Logo'
              width={46}
              height={46}
              className='rounded-full'
            />
            <div className='flex flex-col gap-0 font-bold'>
              <span className='text-xl text-neutral-700'>Gymkhana</span>
              <span className='text-xs uppercase text-neutral-500'>
                Technical
              </span>
            </div>
          </Link>
          <div className='py-3'>
            <Separator />
          </div>
          <div className='flex flex-col justify-between gap-1 py-4'>
            <div>
              {items.map((item) => (
                <DashboardItem
                  key={item.name}
                  name={item.name}
                  href={item.href}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='-translate-y-[100%]'>
        <HelpCard />
      </div>
    </div>
  );
};

export default Sidebar;
