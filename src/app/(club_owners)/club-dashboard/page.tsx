import React from 'react';

import { currentUser } from '@clerk/nextjs';
import { getClubForOwner } from '~/lib/supabase/clubs';

import {
  ClubBasicDetails,
  ClubAppearanceDetailsForm,
  ClubSocialDetails,
} from '../components';
import { DashboardHeader } from '~/app/(user)/components';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Button } from '~/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
        >
          <Button asChild>
            <Link href={`/clubs/${club.club_id}`} target='_blank'>
              Go to Club Page
            </Link>
          </Button>
        </DashboardHeader>
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
          <TabsContent value='socials'>
            <ClubSocialDetails serverDetails={club} />
          </TabsContent>
        </Tabs>
      </div>
    );
  } else {
    notFound();
  }
};

export default ClubDashboard;
