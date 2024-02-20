'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { Form } from '~/types';

import Link from 'next/link';

import { formatDate } from '~/lib/utils';

import { ArrowUpDown } from 'lucide-react';

import { Button } from '~/components/ui/button';

export const columns: ColumnDef<Form>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
        </Button>
      );
    },
    cell: ({ row }) => {
      const form = row.original;
      return (
        <Link
          href={`/forms/${form.form_id}`}
          className='h-full'
          target='_blank'
        >
          {form.title}
        </Link>
      );
    },
  },
  {
    accessorKey: 'end_datetime',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='hidden flex-row items-center gap-1 md:flex'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          End At
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = formatDate(row.getValue('end_datetime'));
      return <div className='hidden md:block'>{date}</div>;
    },
  },
];
