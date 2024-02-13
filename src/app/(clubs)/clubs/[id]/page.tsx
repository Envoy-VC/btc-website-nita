import React from 'react';

import { headers } from 'next/headers';

const ClubPage = () => {
  const headersList = headers();
  const activePath = headersList.get('x-pathname');

  return (
    <div>
      <h1>Club Page</h1>
      <p>Active Path: {activePath}</p>
    </div>
  );
};

export default ClubPage;
