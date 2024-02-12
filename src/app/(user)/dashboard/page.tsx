import React from 'react';

import {
  CalendarDateRangePicker,
  MetricCard,
  Overview,
  UpcomingEvents,
} from '../components';

import { Separator } from '~/components/ui/separator';

import { HiTrendingUp } from 'react-icons/hi';

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
          value='12'
          subtitle='+124% from last month'
          Icon={HiTrendingUp}
        />
        <MetricCard
          title='Total Events'
          value='12'
          subtitle='+124% from last month'
          Icon={HiTrendingUp}
        />
        <MetricCard
          title='Total Events'
          value='12'
          subtitle='+124% from last month'
          Icon={HiTrendingUp}
        />
      </div>
      <div className='flex flex-col gap-4 py-6 lg:flex-row'>
        <div className='flex w-full flex-1 basis-1/2'>
          <Overview />
        </div>
        <div className='flex w-full flex-1 basis-1/2'>
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
