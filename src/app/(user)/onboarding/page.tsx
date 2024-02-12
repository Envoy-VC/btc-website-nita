import React from 'react';
import { currentUser } from '@clerk/nextjs';

import { OnboardingForm } from '../components';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Navbar } from '~/components';
import Image from 'next/image';
import { OnboardingImage } from '~/assets';

const Onboarding = async () => {
  const user = await currentUser();

  const email_id =
    user?.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress ?? '';

  const getInitials = () => {
    const name = `${user?.firstName} ${user?.lastName}`;
    const initials = name.match(/\b\w/g) ?? [];
    return ((initials.shift() ?? '') + (initials.pop() ?? '')).toUpperCase();
  };
  return (
    <div className='flex h-screen flex-col'>
      <Navbar />
      <div className='flex w-full flex-row items-center justify-center'>
        <div className='mx-3 my-4 flex max-w-screen-xl flex-row items-center rounded-xl border-neutral-300 sm:my-12 lg:border-[1px]'>
          <div className='hidden w-full basis-1/2 lg:block'>
            <Image
              src={OnboardingImage}
              alt='Onboarding Image'
              className='h-full w-full rounded-l-xl '
              width={500}
              height={500}
            />
          </div>
          <div className='w-full basis-full lg:basis-1/2'>
            <div className='flex w-full max-w-xl flex-col gap-5 rounded-3xl bg-white p-6 py-12'>
              <div className='flex h-full w-full flex-row gap-3'>
                <div className='w-full basis-2/3'>
                  <div className='flex flex-col gap-4'>
                    <div className='text-2xl font-bold text-primary'>
                      Let&lsquo;s get you onboarded!
                    </div>
                    <p className='text-sm font-medium text-neutral-600'>
                      Just a quick few details and you will be on you way to a
                      better experience.
                    </p>
                  </div>
                </div>
                <div className='flex w-full basis-1/3 items-center justify-center'>
                  <Avatar className='h-20 w-20'>
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <OnboardingForm email_id={email_id} user_id={user?.id ?? ''} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
