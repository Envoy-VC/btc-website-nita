import React from 'react';

import { headers } from 'next/headers';
import { getFormById } from '~/lib/supabase/forms';
import { buildUISchema, toJsonSchema } from '~/lib/utils';

import type { FormType } from '~/lib/zod/form';
import CustomForm from '../components/Form';
import { notFound } from 'next/navigation';

import type { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const form = await getFormById(params.id);

  if (!form) {
    const parentMetadata = await parent;
    return parentMetadata as Metadata;
  }

  const metadata: Metadata = {
    title: form.title,
    description:
      form.description.length > 160
        ? form.description.slice(0, 160) + '...'
        : form.description,
    twitter: {
      card: 'summary_large_image',
      title: form.title,
      description:
        form.description.length > 160
          ? form.description.slice(0, 160) + '...'
          : form.description,
      creator: '@Envoy_1084',
      images: [
        {
          url: `/api/og?title=${form.title}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    openGraph: {
      title: form.title,
      description:
        form.description.length > 160
          ? form.description.slice(0, 160) + '...'
          : form.description,
      type: 'website',
      locale: 'en_US',
      url: `https://btc.gymkhananita.com/forms/${form.form_id}`,
      images: [
        {
          url: `/api/og?title=${form.title}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };

  return metadata;
}

type Props = {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
};

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
