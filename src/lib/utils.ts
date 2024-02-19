import { env } from '~/env';

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CalendarDateTime } from '@internationalized/date';
import type { RJSFSchema, StrictRJSFSchema, UiSchema } from '@rjsf/utils';

import type { FormType } from './zod/form';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSocialImage = (link: string) => {
  if (link.includes('facebook')) {
    return 'https://cdn1.iconfinder.com/data/icons/logotypes/32/square-facebook-1024.png';
  } else if (link.includes('instagram')) {
    return 'https://cdn1.iconfinder.com/data/icons/social-icons-33/128/Instagram-1024.png';
  } else if (link.includes('twitter') || link.includes('x.com')) {
    return 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Twitter_colored_svg-1024.png';
  } else if (link.includes('linkedin')) {
    return 'https://cdn1.iconfinder.com/data/icons/logotypes/32/square-linkedin-1024.png';
  } else if (link.includes('youtube')) {
    return 'https://cdn1.iconfinder.com/data/icons/social-icons-33/128/Youtube-1024.png';
  } else if (link.includes('github')) {
    return 'https://cdn1.iconfinder.com/data/icons/iconsimple-logotypes/512/github-1024.png';
  } else if (link.includes('whatsapp')) {
    return 'https://cdn1.iconfinder.com/data/icons/social-media-2285/512/1_Whatsapp2_colored_svg-1024.png';
  } else if (link.includes('medium.com')) {
    return 'https://cdn1.iconfinder.com/data/icons/social-media-2285/1151/Medium_logo_-_black-1024.png';
  } else {
    return 'https://cdn1.iconfinder.com/data/icons/social-media-outline-6/128/SocialMedia_Website-Outline-1024.png';
  }
};

export const getImageLink = (path: string) => {
  if (path === '') {
    return null;
  } else {
    return `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`;
  }
};

export const formatDate = (iso_string: string): string => {
  const date = new Date(iso_string);
  // prettier-ignore
  const months: string[] = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const amOrPm = date.getHours() >= 12 ? 'PM' : 'AM';

  return `${month} ${day}, ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amOrPm}`;
};

export const getCalenderDateTime = (iso_string: string): CalendarDateTime => {
  const date = new Date(iso_string);
  return new CalendarDateTime(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes()
  );
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':') as [string, string, string];
  const amOrPm = +hours >= 12 ? 'PM' : 'AM';
  const formattedHours = +hours % 12 || 12;

  return `${formattedHours}:${minutes} ${amOrPm}`;
};

export const getISOString = (date: CalendarDateTime): string => {
  return date.toDate('ist').toISOString();
};

export const toJsonSchema = (data: FormType): RJSFSchema => {
  const requiredFields = data.questions
    .filter((q) => q.required)
    .map((i) => i.name);

  // eslint-disable-next-line prefer-const
  let questions: Record<string, StrictRJSFSchema> = {};

  data.questions.forEach((question) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    questions[question.name] = toStrictJsonSchema(question);
  });

  const schema: RJSFSchema = {
    title: data.title,
    description: data.description,
    type: 'object',
    required: requiredFields,
    properties: questions,
  };

  return schema;
};

export const toStrictJsonSchema = (
  question: FormType['questions'][number]
): StrictRJSFSchema => {
  const getType = () => {
    if (question.type === 'checkbox') {
      return 'boolean';
    } else if (question.type === 'multiple-choice') {
      return 'array';
    } else {
      return 'string';
    }
  };

  const getUniqueItems = () => {
    if (question.type === 'multiple-choice') {
      return true;
    }
  };

  const getFormat = () => {
    if (question.type === 'date') {
      return 'date';
    } else if (question.type === 'time') {
      return 'time';
    } else if (question.type === 'date-time') {
      return 'date-time';
    } else {
      return undefined;
    }
  };

  const getEnum = () => {
    if (question.type === 'select') {
      return question.options.map((o) => o.option);
    }
  };

  const getItems = () => {
    if (question.type === 'multiple-choice') {
      return {
        type: 'string',
        enum: question.options.map((o) => o.option),
      } as const;
    }
  };

  const schema: StrictRJSFSchema = {
    title: question.question,
    type: getType(),
    format: getFormat(),
    uniqueItems: getUniqueItems(),
    enum: getEnum(),
    items: getItems(),
  };

  return schema;
};

export const buildUISchema = (data: FormType): UiSchema => {
  const longTextFields: Record<string, UiSchema> = {};

  data.questions.forEach((question) => {
    if (question.type === 'long-answer') {
      longTextFields[question.name] = {
        'ui:widget': 'textarea',
      };
    }
  });

  const uiSchema: UiSchema = {
    ...longTextFields,
  };

  return uiSchema;
};

export const formatRange = (
  startDateStr: string,
  endDateStr: string
): string => {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const startMonth = startDate.toLocaleString('default', { month: 'short' });
  const endMonth = endDate.toLocaleString('default', { month: 'short' });

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  if (startMonth === endMonth && startYear === endYear) {
    if (startDay === endDay) {
      return `${startMonth} ${startDay}`;
    } else {
      return `${startMonth} ${startDay}-${endDay}`;
    }
  } else {
    return `${startMonth} ${startDay}-${startYear === endYear ? '' : startYear + ' '}${endMonth} ${endDay}`;
  }
};

interface ResponseType {
  question: string;
  answer: string;
}

export const formatResponses = (
  questions: FormType['questions'],
  responses: Record<string, string | number | string[] | boolean | undefined>
): ResponseType[] => {
  const formattedResponses: ResponseType[] = [];

  questions.forEach((question) => {
    const answer = responses[question.name];
    const formattedAnswer = formatAnswer(answer, question.type);

    formattedResponses.push({
      question: question.question,
      answer: formattedAnswer,
    });
  });

  return formattedResponses;
};

const formatAnswer = (
  answer: string | number | string[] | boolean | undefined,
  type: string
): string => {
  if (type === 'date') {
    return formatDate(answer as string);
  } else if (type === 'date-time') {
    return formatDate(answer as string);
  } else if (type === 'time') {
    return formatTime(answer as string);
  } else if (type === 'multiple-choice') {
    return (answer as string[]).join(', ');
  } else if (type === 'checkbox') {
    return (answer as boolean) ? 'Yes' : 'No';
  } else {
    return answer as string;
  }
};
