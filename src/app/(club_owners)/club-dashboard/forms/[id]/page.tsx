import React from 'react';
import { headers } from 'next/headers';
import { auth } from '@clerk/nextjs';

const FormPage = () => {
  const headersList = headers();
  const path = headersList.get('x-pathname');
  const form_id = (path ?? '').split('/').pop() ?? '';
  const { userId } = auth();
  return <div>FormPage</div>;
};

export default FormPage;
