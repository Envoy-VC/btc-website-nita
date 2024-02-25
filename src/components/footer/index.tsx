import React from 'react';
import Link from 'next/link';
import type { IconType } from 'react-icons';

import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa6';

import { LuBinary } from 'react-icons/lu';

const Footer = () => {
  return (
    <footer className='bg-white'>
      <div className='mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-md'>
          <strong className='block text-center text-xl font-bold text-gray-900 sm:text-3xl'>
            Want us to email you with the latest events and news?
          </strong>

          <form className='mt-6'>
            <div className='relative max-w-lg'>
              <label className='sr-only' htmlFor='email'>
                Email
              </label>

              <input
                className='w-full rounded-full border-gray-200 bg-gray-100 p-4 pe-32 text-sm font-medium'
                id='email'
                type='email'
                placeholder='john@doe.com'
              />
              <button className='absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary/80'>
                Subscribe
              </button>
            </div>
          </form>
        </div>
        <div className='mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32'>
          <div className='mx-auto max-w-sm lg:max-w-none'>
            <p className='mt-4 text-center text-sm text-gray-500 lg:text-left lg:text-[1rem]'>
              Get the latest news and updates from our team. Stay tuned for
              upcoming events and club activities on campus.
            </p>

            <div className='mt-6 flex justify-center gap-4 lg:justify-start'>
              {socialItems.map((item, index) => (
                <SocialLink key={index} {...item} />
              ))}
            </div>
          </div>

          <div className='flex flex-col justify-end gap-8 text-center lg:flex-row lg:text-left'>
            <div className='flex flex-row items-center justify-center gap-8'>
              <div>
                <strong className='font-medium text-gray-900'>
                  Navigation
                </strong>
                <ul className='mt-6 space-y-1'>
                  {navigationItems.map((item, index) => (
                    <li key={index}>
                      <Item {...item} />
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className='font-medium text-gray-900'>About</strong>
                <ul className='mt-6 space-y-1'>
                  {aboutItems.map((item, index) => (
                    <li key={index}>
                      <Item {...item} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-16 border-t border-gray-100 pt-8'>
          <p className='text-center text-xs/relaxed text-gray-500'>
            © Gymkhana Technical {new Date().getFullYear()}. All rights
            reserved.
            <br />
            Created with <LuBinary className='inline' /> by{' '}
            <Link
              href='https://envoy1084.xyz'
              target='_blank'
              rel='noreferrer'
              className='text-black transition hover:text-black/80'
            >
              Envoy_
            </Link>{' '}
          </p>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  Icon: IconType;
  label: string;
}

const socialItems: SocialLinkProps[] = [
  {
    href: 'https://www.facebook.com',
    Icon: FaFacebook,
    label: 'Facebook',
  },
  {
    href: 'https://www.instagram.com',
    Icon: FaInstagram,
    label: 'Instagram',
  },
  {
    href: 'https://www.twitter.com',
    Icon: FaXTwitter,
    label: 'Twitter',
  },
  {
    href: 'https://www.github.com',
    Icon: FaGithub,
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com',
    Icon: FaLinkedin,
    label: 'LinkedIn',
  },
];

const SocialLink = ({ href, Icon, label }: SocialLinkProps) => {
  return (
    <Link href={href} target='_blank' rel='noreferrer'>
      <Icon className='text-lg text-neutral-700' />
      <span className='sr-only'> {label} </span>
    </Link>
  );
};

interface ItemProps {
  href: string;
  label: string;
}

const aboutItems: ItemProps[] = [
  {
    href: '#hero',
    label: 'About Us',
  },
  {
    href: 'mailto:vedantchainani1084@gmail.com',
    label: 'Contact Us',
  },
  {
    href: '/privacy',
    label: 'Privacy Policy',
  },
  {
    href: '/terms',
    label: 'Terms of Service',
  },
];

const navigationItems: ItemProps[] = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/events',
    label: 'Events',
  },
  {
    href: '/clubs',
    label: 'Clubs',
  },
  {
    href: '/forms',
    label: 'Forms',
  },
];

const Item = ({ href, label }: ItemProps) => {
  return (
    <Link
      href={href}
      className='text-sm text-gray-700 transition hover:text-gray-700/75'
    >
      {label}
    </Link>
  );
};

export default Footer;
