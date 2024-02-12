import React from 'react';
import { currentUser } from '@clerk/nextjs';
import { DashboardHeader, ManageNotifications } from '../../components';

import { getUser } from '~/lib/supabase/user';

const Notifications = async () => {
  const user = await currentUser().then(async (res) => {
    return await getUser(res!.id);
  });

  return (
    <>
      <DashboardHeader
        title='Notifications'
        description='Configure how you receive notifications.'
      />
      {user && (
        <ManageNotifications
          server_communication_emails={user.communication_emails}
          server_event_emails={user.event_emails}
          server_marketing_emails={user.marketing_emails}
          server_social_emails={user.social_emails}
        />
      )}
    </>
  );
};

export default Notifications;
