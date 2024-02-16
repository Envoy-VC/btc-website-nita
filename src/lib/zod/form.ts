import { z } from 'zod';

import { CalendarDateTime } from '@internationalized/date';

export const optionSchema = z.object({
  option: z.string({ required_error: '' }),
});

export const shortQuestionSchema = z.object({
  question: z.string({ required_error: '' }),
  type: z.string({ required_error: '' }).default('short_answer'),
  required: z.boolean({ required_error: '' }).default(false),
  options: z.array(optionSchema),
});

export const longQuestionSchema = z.object({
  question: z.string({ required_error: '' }),
  type: z.string({ required_error: '' }).default('long_answer'),
  required: z.boolean({ required_error: '' }).default(false),
  options: z.array(optionSchema),
});

export const multipleChoiceQuestionSchema = z.object({
  question: z.string({ required_error: '' }),
  type: z.string({ required_error: '' }).default('multiple_choice'),
  required: z.boolean({ required_error: '' }).default(false),
  options: z.array(optionSchema),
});

export const selectQuestionSchema = z.object({
  question: z.string({ required_error: '' }),
  type: z.string({ required_error: '' }).default('select'),
  required: z.boolean({ required_error: '' }).default(false),
  options: z.array(optionSchema),
});

export const dateQuestionSchema = z.object({
  question: z.string({ required_error: '' }),
  type: z.string({ required_error: '' }).default('date'),
  required: z.boolean({ required_error: '' }).default(false),
  options: z.array(optionSchema),
});

export const timeQuestionSchema = z.object({
  question: z.string({ required_error: '' }),
  type: z.string({ required_error: '' }).default('time'),
  required: z.boolean({ required_error: '' }).default(false),
  options: z.array(optionSchema),
});

export const dateTimeQuestionSchema = z.object({
  question: z.string({ required_error: '' }),
  type: z.string({ required_error: '' }).default('date_time'),
  required: z.boolean({ required_error: '' }).default(false),
  options: z.array(optionSchema),
});

export const questionSchema = z.union([
  shortQuestionSchema,
  longQuestionSchema,
  multipleChoiceQuestionSchema,
  selectQuestionSchema,
  dateQuestionSchema,
  timeQuestionSchema,
  dateTimeQuestionSchema,
]);

export const formSchema = z.object({
  title: z.string({ required_error: '' }).optional(),
  description: z.string({ required_error: '' }).optional(),
  questions: z.array(questionSchema),
  start_datetime: z.instanceof(CalendarDateTime).optional(),
  end_datetime: z.instanceof(CalendarDateTime).optional(),
  is_public: z.boolean({ required_error: '' }).optional(),
});

export const questionTypes = [
  {
    name: 'Short Answer',
    value: 'short_answer',
  },
  {
    name: 'Long Answer',
    value: 'long_answer',
  },
  {
    name: 'Multiple Choice',
    value: 'multiple_choice',
  },
  {
    name: 'Select',
    value: 'select',
  },
  {
    name: 'Date',
    value: 'date',
  },
  {
    name: 'Time',
    value: 'time',
  },
  {
    name: 'Date & Time',
    value: 'date_time',
  },
];

export type FormType = z.infer<typeof formSchema>;
export type QuestionsType = z.infer<typeof questionSchema>;
