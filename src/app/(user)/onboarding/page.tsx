import React from 'react';
import { currentUser } from '@clerk/nextjs';

import { OnboardingForm } from '../components';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

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
    <div className='flex min-h-screen w-full items-center justify-center bg-gradient-to-r from-indigo-200 to-blue-100 px-3'>
      <div className='my-12 flex w-full max-w-xl flex-col gap-5 rounded-3xl bg-white p-6 py-12'>
        <div className='flex h-full w-full flex-row gap-3'>
          <div className='w-full basis-2/3'>
            <div className='flex flex-col gap-4'>
              <div className='text-2xl font-bold text-secondary'>
                Let&lsquo;s get you started!
              </div>
              <p className='text-sm font-medium text-neutral-600'>
                Just a quick few details and you will be on you way to a better
                experience.
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
  );
};

export default Onboarding;
