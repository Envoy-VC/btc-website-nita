import React from 'react';

import { UserProfile } from '@clerk/nextjs';

const Account = () => {
  return (
    <div className='px-3 py-6 sm:px-6 sm:py-10 md:px-12'>
      <UserProfile
        appearance={{
          elements: {
            navbar: 'hidden',
            card: 'shadow-none !w-full !p-0 !m-0',
            rootBox: '!w-full !p-0 !m-0',
            navbarMobileMenuRow: 'hidden',
            pageScrollBox: '!p-0',
          },
        }}
      />
    </div>
  );
};

export default Account;
