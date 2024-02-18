import React from 'react';

import { BTCLogo } from '~/assets';

import type { FormType } from '~/lib/zod/form';

import { formatResponses } from '~/lib/utils';

import {
  Document,
  Page,
  Text,
  StyleSheet,
  Font,
  View,
} from '@react-pdf/renderer';

import { createTw } from 'react-pdf-tailwind';

const tw = createTw({
  theme: {
    fontFamily: {
      geist: ['Geist Regular'],
      geistMedium: ['Geist Medium'],
      geistBold: ['Geist Bold'],
    },
    extend: {
      colors: {
        custom: '#bada55',
      },
    },
  },
});

import { Image as ReactPDFImage } from '@react-pdf/renderer';

export interface FormDocumentProps {
  title: string;
  questions: FormType['questions'];
  responses: UserResponse[];
}

export interface UserResponse {
  details: {
    name: string;
    college: string;
    branch: string;
    graduation_year: string;
    phone_number: string;
    email: string;
  };
  response: Record<string, string | number | string[] | boolean | undefined>;
}

export const FormDocument = ({
  title,
  questions,
  responses,
}: FormDocumentProps) => {
  return (
    <Document>
      <Page style={tw('px-[36px] pt-[35px] pb-[65px] font-geist')}>
        <View
          style={tw(
            'flex flex-row gap-3 items-center border-b py-4 border-neutral-200'
          )}
        >
          <ReactPDFImage src={BTCLogo.src} style={tw('h-16 w-16')} />
          <View style={tw('flex flex-col')}>
            <Text
              style={tw(
                'text-3xl text-neutral-700 font-bold leading-[1] font-geist'
              )}
            >
              Gymkhana
            </Text>
            <Text style={tw('text-3xl text-neutral-700 leading-[1]')}>
              Technical
            </Text>
          </View>
        </View>
        <View style={tw('flex flex-col py-8')}>
          <Text style={tw('text-2xl font-bold text-neutral-700')}>
            Form Responses
          </Text>

          <View style={tw('flex flex-row items-center gap-2')}>
            <Text style={tw('text-lg text-neutral-700 font-bold')}>
              Form Title:
            </Text>
            <Text style={tw('text-lg text-neutral-600')}>{title}</Text>
          </View>
        </View>
        {responses.map((response, index) => (
          <UserResponse key={index} {...response} questions={questions} />
        ))}
        <Text
          style={tw(
            'absolute text-sm bottom-[30px] left-0 right-0 text-center text-neutral-600'
          )}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

const UserResponse = ({
  details,
  questions,
  response,
}: UserResponse & { questions: FormType['questions'] }) => {
  const data = formatResponses(questions, response);

  return (
    <View style={tw('border-t border-b border-neutral-200 py-4')}>
      <View style={tw('p-3 flex flex-col bg-neutral-100 rounded-lg')}>
        <View style={tw('flex flex-row items-center gap-2')}>
          <Text style={tw('text-[1rem] text-neutral-700 font-bold')}>
            Name:
          </Text>
          <Text style={tw('text-[1rem] text-neutral-500')}>{details.name}</Text>
        </View>
        <View style={tw('flex flex-row items-center gap-2')}>
          <Text style={tw('text-[1rem] text-neutral-700 font-bold')}>
            College:
          </Text>
          <Text style={tw('text-[1rem] text-neutral-500')}>
            {details.college}
          </Text>
        </View>
        <View style={tw('flex flex-row items-center gap-2')}>
          <Text style={tw('text-[1rem] text-neutral-700 font-bold')}>
            Branch:
          </Text>
          <Text style={tw('text-[1rem] text-neutral-500')}>
            {details.branch}
          </Text>
        </View>
        <View style={tw('flex flex-row items-center gap-2')}>
          <Text style={tw('text-[1rem] text-neutral-700 font-bold')}>
            Graduation Year:
          </Text>
          <Text style={tw('text-[1rem] text-neutral-500')}>
            {details.graduation_year}
          </Text>
        </View>
        <View style={tw('flex flex-row items-center gap-2')}>
          <Text style={tw('text-[1rem] text-neutral-700 font-bold')}>
            Phone Number:
          </Text>
          <Text style={tw('text-[1rem] text-neutral-500')}>
            {details.phone_number}
          </Text>
        </View>
        <View style={tw('flex flex-row items-center gap-2')}>
          <Text style={tw('text-[1rem] text-neutral-700 font-bold')}>
            Email-Id:
          </Text>
          <Text style={tw('text-[1rem] text-neutral-500')}>
            {details.email}
          </Text>
        </View>
      </View>
      <View style={tw('py-4 flex flex-col gap-2 px-3')}>
        {data.map((question, index) => (
          <View key={index} style={tw('flex flex-col gap-2')}>
            <Text style={tw('text-sm text-neutral-700 font-bold')}>
              Q{index + 1}. {question.question}
            </Text>
            <Text style={tw('text-sm text-neutral-600')}>
              {question.answer}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

Font.register({
  family: 'Geist Regular',
  src: 'https://svofmwoukzjgqheplyds.supabase.co/storage/v1/object/public/club_details/fonts/Geist-Regular.otf?t=2024-02-18T17%3A36%3A59.661Z',
});

Font.register({
  family: 'Geist Regular',
  src: 'https://svofmwoukzjgqheplyds.supabase.co/storage/v1/object/public/club_details/fonts/Geist-Medium.otf?t=2024-02-18T17%3A37%3A16.017Z',
});

Font.register({
  family: 'Geist Regular',
  src: 'https://svofmwoukzjgqheplyds.supabase.co/storage/v1/object/public/club_details/fonts/Geist-Bold.otf',
});
const styles = StyleSheet.create({});

export default FormDocument;
