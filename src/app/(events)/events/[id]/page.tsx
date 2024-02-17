import React from 'react';
import { notFound } from 'next/navigation';

import { headers } from 'next/headers';

const ClubPage = async () => {
  const headersList = headers();
  const path = headersList.get('x-pathname');
  const event_id = (path ?? '').split('/').pop() ?? '';

  return <div>{event_id}</div>;
};

export default ClubPage;
