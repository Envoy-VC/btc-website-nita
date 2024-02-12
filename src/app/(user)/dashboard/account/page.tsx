import React from 'react';

import { UserProfile } from '@clerk/nextjs';

const Account = () => {
  return (
    <>
      <UserProfile
        appearance={{
          elements: {
            navbar: 'hidden',
            card: 'shadow-none !w-full !p-0 !m-0',
            rootBox: '!w-full !p-0 !m-0 !z-[1]',
            navbarMobileMenuRow: 'hidden',
            pageScrollBox: '!p-0',
          },
        }}
      />
    </>
  );
};

export default Account;
