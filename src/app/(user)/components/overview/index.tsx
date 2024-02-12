import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import OverviewChart from './chart';

const Overview = () => {
  return (
    <Card className='col-span-4 w-full'>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className='pl-2'>
        <OverviewChart />
      </CardContent>
    </Card>
  );
};

export default Overview;
