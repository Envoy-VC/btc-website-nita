'use client';

import React from 'react';
import type { Form } from '~/types';

import { PDFDownloadLink } from '@react-pdf/renderer';

import FormDocument from '../form-document';

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
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false);
  const [props, setProps] = React.useState<FormDocumentProps | null>(null);
  const onClick = async () => {
    try {
      setIsGenerating(true);
      const responses = await getUserFormResponses(form.form_id);
      const props: FormDocumentProps = {
        title: form.title,
        responses,
        questions: form.questions as unknown as FormType['questions'],
      };
      console.log(props);

      setProps(props);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      {props ? (
        <PDFDownloadLink
          document={<FormDocument {...props} />}
          fileName='responses.pdf'
        >
          {({ loading }) => (
            <Button disabled={loading}>
              {loading ? 'Generating PDF...' : 'Download Responses'}
            </Button>
          )}
        </PDFDownloadLink>
      ) : (
        <Button onClick={onClick} disabled={isGenerating}>
          {isGenerating ? 'Generating PDF...' : 'Generate PDF'}
        </Button>
      )}
    </div>
  );
};

export default DownloadResponsesButton;
