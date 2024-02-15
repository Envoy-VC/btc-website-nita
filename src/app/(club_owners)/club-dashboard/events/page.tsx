import React from 'react';

import { DashboardHeader } from '~/app/(user)/components';
import { Button } from '~/components/ui/button';

const ClubEventsPage = () => {
  return (
    <div className='flex flex-col'>
      <DashboardHeader title='Events' description=''>
        <Button>Create Event</Button>
      </DashboardHeader>
    </div>
  );
};

export default ClubEventsPage;
