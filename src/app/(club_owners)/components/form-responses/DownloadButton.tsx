'use client';

import React from 'react';
import type { Form } from '~/types';

import { getUserFormResponses } from '~/lib/supabase/forms';

interface Props {
  form: Form;
}

import { createElement } from 'react';

import type { FormDocumentProps } from '../form-document';

export const renderPDF = async (props: FormDocumentProps) => {
  const { pdf } = await import('@react-pdf/renderer');
  const { FormDocument } = await import('../form-document');
  return pdf(createElement(FormDocument, props)).toBlob();
};

import { Button } from '~/components/ui/button';
import type { FormType } from '~/lib/zod/form';

const DownloadResponsesButton = ({ form }: Props) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const onClick = async () => {
    try {
      setLoading(true);
      const responses = await getUserFormResponses(form.form_id);
      const props: FormDocumentProps = {
        title: form.title,
        responses,
        questions: form.questions as unknown as FormType['questions'],
      };

      const blob = await renderPDF(props);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `responses-${form.form_id}-${new Date().toISOString()}.pdf`;
      link.click();

      // clean up
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={onClick} disabled={loading}>
      {loading ? 'Loading...' : 'Download Responses'}
    </Button>
  );
};

export default DownloadResponsesButton;
