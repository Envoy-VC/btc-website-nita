import React from 'react';
import { headers } from 'next/headers';
import { auth } from '@clerk/nextjs';

const EventPage = () => {
  const headersList = headers();
  const path = headersList.get('x-pathname');
  const event_id = (path ?? '').split('/').pop() ?? '';
  const { userId } = auth();
  return <div>EventPage</div>;
};

export default EventPage;
