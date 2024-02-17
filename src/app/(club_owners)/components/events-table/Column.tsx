'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { Event } from '~/types';

import Link from 'next/link';

import { formatDate } from '~/lib/utils';

import { MoreHorizontal, ArrowUpDown } from 'lucide-react';

import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: 'event_name',
    header: 'Event Name',
  },
  {
    accessorKey: 'venue',
    enableHiding: true,
    header: 'Venue',
  },
  {
    accessorKey: 'start_datetime',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='hidden flex-row items-center gap-1 md:flex'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Start At
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },

    cell: ({ row }) => {
      const date = formatDate(row.getValue('start_datetime'));
      return <div className='hidden md:block'>{date}</div>;
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
  {
    accessorKey: 'is_public',
    enableHiding: true,
    header: () => {
      return <div className='hidden md:block'>Public</div>;
    },
    cell: ({ row }) => {
      const isPublic = row.getValue('is_public');
      return (
        <div className='hidden md:block'>{isPublic ? 'True' : 'False'}</div>
      );
    },
  },

  {
    id: 'actions',
    enableHiding: false,
    header: () => <></>,
    enableResizing: false,
    size: 6,
    cell: ({ row }) => {
      const event = row.original;
      return (
        <div className='flex justify-end'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className=''>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className='cursor-pointer'
                onClick={() => navigator.clipboard.writeText(event.event_id)}
              >
                Copy Event ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem className='cursor-pointer'>
                <Link href={`/club-dashboard/events/${event.event_id}/edit`}>
                  Edit
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className='cursor-pointer'>
                <Link href={`/club-dashboard/events/${event.event_id}`}>
                  View Analytics
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className='cursor-pointer'>
                <Link href={`/events/${event.event_id}`}>Event Page</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
