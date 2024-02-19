'use client';

import React from 'react';
import type { Form } from '~/types';

import { PDFDownloadLink } from '@react-pdf/renderer';

import FormDocument from '../form-document';

import type { FormResponse } from '~/types';

interface Props {
  form: Form;
  responses: FormResponse[];
}

import { createElement } from 'react';

import type { FormDocumentProps } from '../form-document';

export const renderPDF = async (props: FormDocumentProps) => {
  const { pdf } = await import('@react-pdf/renderer');
  const { FormDocument } = await import('../form-document');
  return pdf(createElement(FormDocument, props)).toBlob();
};

import { Button } from '~/components/ui/button';
import type { QuestionsType } from '~/lib/zod/form';

const DownloadResponsesButton = ({ form, responses }: Props) => {
  return (
    <div>
      <PDFDownloadLink
        document={
          <FormDocument
            title={form.title}
            questions={form.questions as QuestionsType[]}
            responses={responses}
          />
        }
        fileName='responses.pdf'
      >
        {({ loading }) => (
          <Button disabled={loading}>
            {loading ? 'Generating PDF...' : 'Download Responses'}
          </Button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default DownloadResponsesButton;
