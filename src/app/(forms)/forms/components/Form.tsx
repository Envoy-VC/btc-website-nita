'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import type { RJSFSchema, UiSchema } from '@rjsf/utils';
import ChakraForm from '@rjsf/chakra-ui';
import type { IChangeEvent } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';

import { useAuth } from '@clerk/nextjs';

import { createFormResponse } from '~/lib/supabase/forms';
import toast from 'react-hot-toast';

interface Props {
  schema: RJSFSchema;
  uiSchema: UiSchema;
  form_id: string;
}

const CustomForm = ({ schema, uiSchema, form_id }: Props) => {
  const { userId } = useAuth();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const onSubmit = async (data: IChangeEvent) => {
    if (!userId) {
      toast.error('Please login to submit the form');
      return;
    }

    try {
      setIsSubmitting(true);
      await createFormResponse(form_id, userId, data.formData as object);
      toast.success('Form submitted');
      router.push('/');
    } catch (error) {
      toast.error('Form submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className='mx-auto max-w-3xl py-16'>
      <ChakraForm
        schema={schema}
        validator={validator}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        disabled={isSubmitting}
      />
    </div>
  );
};

export default CustomForm;
