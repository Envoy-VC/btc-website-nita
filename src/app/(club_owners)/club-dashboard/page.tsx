import React from 'react';

import { currentUser } from '@clerk/nextjs';
import { getClubForOwner } from '~/lib/supabase/clubs';

import { ClubBasicDetails, ClubAppearanceDetailsForm } from '../components';
import { DashboardHeader } from '~/app/(user)/components';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

const ClubDashboard = async () => {
  const club = await currentUser().then(async (user) => {
    if (user) {
      return await getClubForOwner(user.id);
    } else {
      return null;
    }
  });

  if (club) {
    return (
      <div className='flex flex-col'>
        <DashboardHeader
          title='Basic Details'
          description='Update your club details here.'
        />
        <Tabs defaultValue='basic'>
          <TabsList className='max-w-sm'>
            <TabsTrigger value='basic'>Basic Details</TabsTrigger>
            <TabsTrigger value='appearance'>Appearance</TabsTrigger>
            <TabsTrigger value='socials'>Social Links</TabsTrigger>
          </TabsList>
          <TabsContent value='basic'>
            <ClubBasicDetails serverDetails={club} />
          </TabsContent>
          <TabsContent value='appearance'>
            <ClubAppearanceDetailsForm serverDetails={club} />
          </TabsContent>
        </Tabs>
      </div>
    );
  }
};

export default ClubDashboard;
