import React from 'react';
import { headers } from 'next/headers';
import { CreateForm } from '~/app/(club_owners)/components';

export const revalidate = 0;

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

import { DeleteButton } from '~/app/(club_owners)/components';

import { getFormDetails } from '~/lib/supabase/forms';
import { notFound } from 'next/navigation';

const FormEditPage = async () => {
  const headersList = headers();
  const path = headersList.get('x-pathname');
  const paths = (path ?? '').split('/');
  const form_id = paths.at(paths.length - 2) ?? '';

  const form = await getFormDetails(form_id);
  if (form) {
    return (
      <div className='mx-auto max-w-2xl'>
        <Tabs defaultValue='edit'>
          <TabsList className='w-full'>
            <TabsTrigger value='edit' className='w-full'>
              Edit
            </TabsTrigger>
            <TabsTrigger value='advanced' className='w-full'>
              Advanced
            </TabsTrigger>
          </TabsList>
          <TabsContent value='edit'>
            <CreateForm serverDetails={form} />
          </TabsContent>
          <TabsContent value='advanced'>
            <div className='py-4'>
              <DeleteButton type='form' id={form.form_id} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  } else {
    return notFound();
  }
};

export default FormEditPage;
