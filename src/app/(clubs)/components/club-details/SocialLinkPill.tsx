import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { getSocialImage } from '~/lib/utils';

interface Props {
  link: string;
  name?: string;
}

const SocialLinkPill = ({ link, name }: Props) => {
  return (
    <Link
      href={link}
      target='_blank'
      className='flex flex-row items-center gap-2'
    >
      <Image
        src={getSocialImage(link)}
        width={36}
        height={36}
        alt={name ?? 'Social Link'}
      />
      <span className='text-blue-500 underline'>{name}</span>
    </Link>
  );
};

export default SocialLinkPill;
