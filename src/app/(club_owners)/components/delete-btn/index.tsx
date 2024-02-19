'use client';

import React from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import { deleteEvent } from '~/lib/supabase/events';
import { deleteForm } from '~/lib/supabase/forms';

import { Button } from '~/components/ui/button';

import { HiExclamation } from 'react-icons/hi';
import { AiOutlineLoading } from 'react-icons/ai';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import toast from 'react-hot-toast';

interface Props {
  id: string;
  type: 'event' | 'form';
}

const DeleteButton = ({ type, id }: Props) => {
  const router = useRouter();
  const { userId } = useAuth();
  const [isCreating, setIsCreating] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);

  const onClick = async () => {
    if (!userId) return;
    try {
      setIsCreating(true);

      if (type === 'event') {
        await deleteEvent(id);
        router.push(`/club-dashboard/events`);
      } else if (type === 'form') {
        await deleteForm(id);
        router.push(`/club-dashboard/forms`);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete');
    } finally {
      setIsCreating(false);
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={(open) => setOpen(open)}>
      <AlertDialogTrigger className='w-full'>
        <Button variant='destructive' className='w-full'>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the{' '}
            {type} and all of its data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            className='flex flex-row items-center gap-2 hover:bg-black/70'
            onClick={onClick}
            disabled={isCreating}
          >
            {isCreating ? (
              <AiOutlineLoading className='animate-spin' />
            ) : (
              <>
                <HiExclamation className='text-lg' />
                Delete
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
