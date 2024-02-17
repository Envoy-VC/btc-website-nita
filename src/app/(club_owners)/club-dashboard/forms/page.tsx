import React, { Suspense } from 'react';

import { auth } from '@clerk/nextjs';
import { DashboardHeader } from '~/app/(user)/components';
import CreateButton from '../../components/create-btn';

export const revalidate = 0;

import { getClubForOwner } from '~/lib/supabase/clubs';

import { LoadingSpinner } from '~/components';
import { getFormsForClub } from '~/lib/supabase/forms';
import { DataTable } from '../../components';
import { columns } from '../../components/forms-table/Column';

const ClubFormsPage = async () => {
  const { userId } = auth();
  const club = await getClubForOwner(userId ?? '');
  const forms = await getFormsForClub(club?.club_id ?? '');
  if (club) {
    return (
      <div className='flex flex-col'>
        <DashboardHeader title='Forms' description=''>
          <CreateButton type='form' club_id={club.club_id} />
        </DashboardHeader>
        <Suspense
          fallback={
            <div className='flex w-full items-center justify-center p-16'>
              <LoadingSpinner />
            </div>
          }
        >
          <DataTable columns={columns} data={forms} />
        </Suspense>
      </div>
    );
  }
};

export default ClubFormsPage;
