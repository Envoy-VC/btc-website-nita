import React from 'react';

import { UserProfile } from '@clerk/nextjs';

const Account = () => {
  return (
    <div>
      <UserProfile
        appearance={{
          elements: {
            navbar: 'hidden',
            card: 'shadow-none',
            navbarMobileMenuRow: 'hidden',
          },
        }}
      />
    </div>
  );
};

export default Account;
