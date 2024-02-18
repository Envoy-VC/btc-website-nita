import React, { Suspense } from 'react';
import { headers } from 'next/headers';
import { auth } from '@clerk/nextjs';

import { getFormById } from '~/lib/supabase/forms';
import { notFound } from 'next/navigation';

import { LoadingSpinner } from '~/components';

import FormResponses from '~/app/(club_owners)/components/form-responses';

const FormPage = async () => {
  const headersList = headers();
  const path = headersList.get('x-pathname');
  const form_id = (path ?? '').split('/').pop() ?? '';
  const { userId } = auth();

  const form = await getFormById(form_id);
  if (form && form.owner_id === userId) {
    return (
      <div>
        <Suspense
          fallback={
            <div className='flex w-full items-center justify-center p-16'>
              <LoadingSpinner />
            </div>
          }
        >
          <FormResponses form={form} />
        </Suspense>
      </div>
    );
  } else {
    notFound();
  }
};

export default FormPage;
