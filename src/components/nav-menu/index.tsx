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

interface ClubType {
  title: string;
  href: string;
  description: string;
}
const clubs: ClubType[] = new Array<ClubType>(6).fill({
  title: 'Club Name',
  href: '/club',
  description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
});

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
          <NavigationMenuTrigger>Clubs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
              {clubs.map((club) => (
                <ClubItem key={club.title} {...club} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/clubs' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              All Clubs
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

const ClubItem = ({ title, description, href }: ClubType) => {
  return (
    <NavigationMenuLink asChild>
      <Link href={href} className='flex flex-col justify-start'>
        <div className='font-semibold text-neutral-700'>{title}</div>
        <div className='text-xs font-medium text-neutral-600'>
          {description}
        </div>
      </Link>
    </NavigationMenuLink>
  );
};

export default NavMenu;
