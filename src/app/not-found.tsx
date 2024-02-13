import React from 'react';
import { Navbar } from '~/components';

import NotFound from '~/screens/not-found';

const NotFoundPage = () => {
  return (
    <div>
      <Navbar />
      <NotFound />
    </div>
  );
};

export default NotFoundPage;
