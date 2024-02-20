'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu';
import { Button } from '../ui/button';

import { BTCLogo } from '~/assets';

import { FaInstagram, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';

import type { IconType } from 'react-icons/lib';
import { getSocialImage } from '~/lib/utils';

const NavMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>About</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='flex flex-col gap-2 p-4 md:w-[400px] lg:w-[500px]'>
              <li className='row-span-2'>
                <NavigationMenuLink asChild>
                  <div className='flex flex-col'>
                    <Link
                      className='flex flex-row items-center justify-start gap-4'
                      href='/'
                    >
                      <Image
                        src={BTCLogo}
                        alt='Gymkhana Technical Logo'
                        width={64}
                        height={64}
                      />
                      <div className='font-neutral-700 max-w-[200px] font-semibold'>
                        Board of Technical Community, Gymkhana
                      </div>
                    </Link>
                    <p className='my-2 text-sm font-medium text-neutral-600'>
                      The Technical Board of the Students&lsquo; Gymkhana, NIT
                      Agartala. Founded by students, for students.
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <div className='flex flex-row justify-between'>
                <ListItem
                  href='https://instagram.in/btcnita'
                  title='Instagram'
                  Icon={FaInstagram}
                />
                <ListItem
                  href='https://twitter.com/btcnita'
                  title='Twitter'
                  Icon={FaXTwitter}
                />
                <ListItem
                  href='https://linkedin.com/btcnita'
                  title='LinkedIn'
                  Icon={FaLinkedinIn}
                />
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href='/clubs' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Clubs
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/events' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Events
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/forms' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Forms
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

interface Props {
  title: string;
  href: string;
  Icon?: IconType;
  description?: string;
}

const ListItem = ({ title, href }: Props) => {
  return (
    <NavigationMenuLink asChild>
      <Button variant='ghost' asChild className='w-full'>
        <Link
          href={href}
          className='flex flex-row items-center justify-start gap-2'
        >
          <Image
            src={getSocialImage(href)}
            alt={title}
            width={24}
            height={24}
          />
          <div>{title}</div>
        </Link>
      </Button>
    </NavigationMenuLink>
  );
};

export default NavMenu;
