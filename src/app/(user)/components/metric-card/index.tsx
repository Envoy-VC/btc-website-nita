import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

import type { IconType } from 'react-icons/lib';

interface Props {
  title: string;
  Icon: IconType;
  value: string;
  subtitle: string;
}

const MetricCard = ({ title, Icon, value, subtitle }: Props) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <Icon className='text-2xl' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
        <p className='text-muted-foreground text-xs'>{subtitle}</p>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
