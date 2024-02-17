import React from 'react';
import { headers } from 'next/headers';
import { CreateForm } from '~/app/(club_owners)/components';

export const revalidate = 0;

import { getFormDetails } from '~/lib/supabase/forms';

const FormEditPage = async () => {
  const headersList = headers();
  const path = headersList.get('x-pathname');
  const paths = (path ?? '').split('/');
  const form_id = paths.at(paths.length - 2) ?? '';

  const form = await getFormDetails(form_id);
  if (form) {
    return (
      <div className='mx-auto max-w-2xl'>
        <CreateForm serverDetails={form} />
      </div>
    );
  }
};

export default FormEditPage;
