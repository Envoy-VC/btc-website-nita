import React from 'react';

import { headers } from 'next/headers';
import { getFormById } from '~/lib/supabase/forms';
import { buildUISchema, toJsonSchema } from '~/lib/utils';

import type { FormType } from '~/lib/zod/form';
import CustomForm from '../components/Form';
import { notFound } from 'next/navigation';

const Form = async () => {
  const headersList = headers();
  const path = headersList.get('x-pathname');
  const formId = (path ?? '').split('/').pop() ?? '';
  const form = await getFormById(formId);
  if (form) {
    return (
      <div className='px-3'>
        <CustomForm
          uiSchema={buildUISchema(form as unknown as FormType)}
          schema={toJsonSchema(form as unknown as FormType)}
          form_id={form.form_id}
        />
      </div>
    );
  } else {
    notFound();
  }
};

export default Form;
