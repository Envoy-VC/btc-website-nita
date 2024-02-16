'use client';

import React from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import { createEventForClub } from '~/lib/supabase/events';

import { Button } from '~/components/ui/button';

import { HiOutlinePlusSm } from 'react-icons/hi';
import { AiOutlineLoading } from 'react-icons/ai';

interface Props {
  club_id: string;
  type: 'event' | 'form';
}

const CreateButton = ({ type, club_id }: Props) => {
  const router = useRouter();
  const { userId } = useAuth();
  const [isCreating, setIsCreating] = React.useState<boolean>(false);

  const onClick = async () => {
    if (!userId) return;
    try {
      setIsCreating(true);

      if (type === 'event') {
        const event_id = await createEventForClub(club_id, userId);
        if (!event_id) {
          throw new Error('Failed to create event');
        }
        router.push(`/club-dashboard/events/${event_id}/edit`);
      } else if (type === 'form') {
        // TODO: Create Event
        router.push(`/club-dashboard/forms/id/edit`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Button
      className='flex flex-row items-center gap-2'
      onClick={onClick}
      disabled={isCreating}
    >
      {isCreating ? (
        <AiOutlineLoading className='animate-spin' />
      ) : (
        <>
          <HiOutlinePlusSm className='text-lg' />
          Create
        </>
      )}
    </Button>
  );
};

export default CreateButton;
