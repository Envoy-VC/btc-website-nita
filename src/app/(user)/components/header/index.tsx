import React from 'react';

import { Separator } from '~/components/ui/separator';

interface Props {
  title: string;
  description: string;
}

const DashboardHeader = ({ title, description }: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      <h1 className='font-neutral-600 text-xl font-semibold sm:text-3xl'>
        {title}
      </h1>
      <p className='text-xs text-neutral-600 sm:text-[1rem]'>{description}</p>
      <div className='py-2'>
        <Separator />
      </div>
    </div>
  );
};

export default DashboardHeader;
