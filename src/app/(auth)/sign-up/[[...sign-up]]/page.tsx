import React from 'react';
import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';

import { SatyaNadellaImage } from '~/assets';

const SignUpPage = () => {
  return (
    <div className='flex min-h-screen w-full flex-col lg:flex-row'>
      <div className='h-[40dvh] w-full bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-white via-[#007DFF] to-[#007DFF] lg:min-h-screen lg:basis-1/3' />

      <div className='flex w-full flex-col items-center justify-between lg:basis-2/3 lg:flex-row'>
        <SignUp
          redirectUrl='/dashboard'
          appearance={{
            elements: {
              formButtonPrimary: 'bg-primary hover:bg-secondary',
              footerActionLink: 'text-secondary hover:text-primary',
              footerAction: 'hidden',
              card: 'mx-0 w-[22rem] gap-2 sm:w-[28rem] sm:gap-8 lg:-translate-x-1/2 translate-x-0 -translate-y-1/2 lg:translate-y-0 sm:h-[40rem]',
            },
          }}
        />

        <div className='flex w-full max-w-3xl -translate-y-2/3 flex-col gap-6 px-3 text-center text-xl text-slate-500 lg:-translate-y-0'>
          <p>
            {`"The power of technology lies not in its complexity, but in its ability to simplify and empower. Let your innovations be a testament to the elegance of simplicity."`}
          </p>
          <div className='flex flex-row items-center justify-center gap-4'>
            <Image
              src={SatyaNadellaImage.src}
              alt='Satya Nadella Image'
              width={48}
              height={48}
              className='h-12 w-12 rounded-full object-cover'
            />
            <div>
              <p className='text-lg font-medium'>Satya Nadella</p>
              <p className='text-sm'>CEO, Microsoft</p>
            </div>
          </div>
        </div>
        <div className='hidden w-full max-w-[10rem] text-transparent lg:flex'>
          a
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
