import React from 'react';

import { DashboardHeader, EventTabs } from '../../components';

const Events = () => {
  return (
    <div>
      <DashboardHeader
        title='Events'
        description='Discover upcoming and past events.'
      />
      <div className='py-2'>
        <EventTabs />
      </div>
    </div>
  );
};

export default Events;
