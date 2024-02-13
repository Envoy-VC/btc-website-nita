import React from 'react';

import { Role } from '~/types';
import RoleProtect from '~/components/role-protect';
import { Navbar } from '~/components';

const ClubDashboardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='flex flex-col'>
      <Navbar />
      <RoleProtect role={Role.CLUB_OWNER}>{children}</RoleProtect>
    </div>
  );
};

export default ClubDashboardLayout;
