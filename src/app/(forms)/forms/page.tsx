import React from 'react';

import { Header } from '~/components';
import { FormsTable, columns } from './components';

import { getActiveForms } from '~/lib/supabase/forms';

const Events = async () => {
  const forms = await getActiveForms();
  return (
    <div className='mx-auto w-full max-w-screen-2xl px-2 py-4'>
      <Header title='Forms' description='' />
      <FormsTable data={forms} columns={columns} />
    </div>
  );
};

export default Events;
