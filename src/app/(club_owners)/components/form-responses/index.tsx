import React from 'react';
import type { Form } from '~/types';

import DownloadResponsesButton from './DownloadButton';

import { MetricCard } from '~/app/(user)/components';

import { getFormResponses } from '~/lib/supabase/forms';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

import AreaChart from './AreaChart';

import {
  HiOutlineTrendingUp,
  HiOutlineCalendar,
  HiOutlineUser,
} from 'react-icons/hi';

interface Props {
  form: Form;
}

const FormResponses = async ({ form }: Props) => {
  const responses = await getFormResponses(form.form_id);

  const getResponsesForToday = (date?: Date) => {
    let today: Date;
    if (!date) {
      today = new Date();
    } else {
      today = date;
    }
    const res = responses.filter((response) => {
      const responseDate = new Date(response.created_at);
      return (
        responseDate.getDate() === today.getDate() &&
        responseDate.getMonth() === today.getMonth() &&
        responseDate.getFullYear() === today.getFullYear()
      );
    });

    return res.length;
  };

  const data = {
    today: getResponsesForToday(),
    yesterday: getResponsesForToday(
      new Date(new Date().setDate(new Date().getDate() - 1))
    ),
  };

  // percentage is + or - infinity fix it
  const percentageIncrease =
    data.today === 0 || data.yesterday === 0
      ? 0
      : ((data.today - data.yesterday) / data.yesterday) * 100;

  return (
    <div className='space-y-4'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <MetricCard
          title='Total Responses'
          value={responses.length.toString()}
          subtitle=''
          Icon={HiOutlineTrendingUp}
        />
        <MetricCard
          title='Responses Today'
          value={data.today.toString()}
          subtitle={`+${percentageIncrease}% from yesterday`}
          Icon={HiOutlineCalendar}
        />
        <MetricCard
          title='Unique Responses'
          value={new Set(responses.map((r) => r.user_id)).size.toString()}
          subtitle=''
          Icon={HiOutlineUser}
        />
      </div>
      <Card className='col-span-4 w-full'>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className='pl-2'>
          <AreaChart data={responses} />
        </CardContent>
      </Card>
      <DownloadResponsesButton form={form} responses={responses} />
    </div>
  );
};

export default FormResponses;
