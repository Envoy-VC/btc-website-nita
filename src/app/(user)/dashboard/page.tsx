import React from 'react';

import {
  CalendarDateRangePicker,
  MetricCard,
  Overview,
  UpcomingEvents,
} from '../components';

import { Separator } from '~/components/ui/separator';

import {
  HiTrendingUp,
  HiOutlineUserCircle,
  HiOutlineChat,
} from 'react-icons/hi';

const Dashboard = () => {
  return (
    <div className=''>
      <div className='flex flex-col justify-between gap-2 sm:flex-row'>
        <h1 className='font-neutral-600 text-xl font-semibold sm:text-3xl'>
          Dashboard
        </h1>
        <CalendarDateRangePicker />
      </div>
      <div className='py-4'>
        <Separator />
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <MetricCard
          title='Total Events'
          value='0'
          subtitle='+0% from last month'
          Icon={HiTrendingUp}
        />
        <MetricCard
          title='Profile Completeness'
          value='100%'
          subtitle=''
          Icon={HiOutlineUserCircle}
        />
        <MetricCard
          title='Feedback Given/Received'
          value='0'
          subtitle='+0% from last month'
          Icon={HiOutlineChat}
        />
      </div>
      <div className='flex flex-col gap-4 py-6 lg:flex-row'>
        <div className='flex w-full flex-1 basis-3/5'>
          <Overview />
        </div>
        <div className='flex w-full flex-1 basis-2/5'>
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
