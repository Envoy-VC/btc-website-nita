import React from 'react';

import { Separator } from '~/components/ui/separator';

interface Props {
  title: string;
  description: string;
}

const DashboardHeader = ({
  title,
  description,
  children,
}: React.PropsWithChildren & Props) => {
  return (
    <>
      <div className='flex w-full flex-row items-center justify-between'>
        <div className='flex w-full flex-col gap-2'>
          <h1 className='font-neutral-600 text-xl font-semibold sm:text-3xl'>
            {title}
          </h1>
          <p className='text-xs text-neutral-600 sm:text-[1rem]'>
            {description}
          </p>
        </div>
        {children}
      </div>
      <div className='py-2'>
        <Separator />
      </div>
    </>
  );
};

export default DashboardHeader;
