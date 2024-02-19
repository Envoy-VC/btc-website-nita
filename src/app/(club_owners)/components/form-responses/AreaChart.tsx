'use client';

import React from 'react';

import {
  AreaChart as Chart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { FormResponse } from '~/types';

interface Props {
  data: FormResponse[];
}

const AreaChart = ({ data }: Props) => {
  const getData = () => {
    const res: { name: string; value: number }[] = [];

    const responsesWithDay: { response: FormResponse; day: string }[] = [];

    const responses = data;
    responses.forEach((response) => {
      const responseDate = new Date(response.created_at);
      const day = `${responseDate.getDate()}/${responseDate.getMonth() + 1}/${responseDate.getFullYear()}`;
      responsesWithDay.push({ response, day });
    });

    responsesWithDay.forEach((response) => {
      res.push({
        name: response.day,
        value: responsesWithDay.filter((r) => r.day === response.day).length,
      });
    });
    console.log(res);
    return res;
  };

  return (
    <ResponsiveContainer width='100%' height={350}>
      <Chart
        width={500}
        height={400}
        data={getData()}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' stroke='#888888' />
        <YAxis stroke='#888888' />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='value'
          stroke='#007DFF'
          className='fill-primary'
        />
      </Chart>
    </ResponsiveContainer>
  );
};

export default AreaChart;
