'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  type FormType,
  formSchema,
  questionTypes,
  type QuestionsType,
} from '~/lib/zod/form';

import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Switch } from '~/components/ui/switch';

import { DateTimePicker } from '~/components/ui/date-time-picker';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

import { useFieldArray } from 'react-hook-form';
import OptionsInput from './OptionsInput';

import { getCalenderDateTime, getISOString } from '~/lib/utils';

import type { Form as TForm } from '~/types';
import toast from 'react-hot-toast';
import { updateFormDetails } from '~/lib/supabase/forms';
import { LoadingSpinner } from '~/components';

interface Props {
  serverDetails: TForm;
}

const CreateForm = ({ serverDetails }: Props) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: serverDetails.title,
      description: serverDetails.description,
      start_datetime: getCalenderDateTime(serverDetails.start_datetime),
      end_datetime: getCalenderDateTime(serverDetails.end_datetime),
      questions: serverDetails.questions as QuestionsType[],
      is_public: serverDetails.is_public,
    },
  });

  const onSubmit = async (values: FormType) => {
    const data: Partial<TForm> = {
      title: values.title,
      description: values.description,
      start_datetime: getISOString(values.start_datetime!),
      end_datetime: getISOString(values.end_datetime!),
      questions: values.questions,
      is_public: values.is_public,
    };
    try {
      await updateFormDetails(serverDetails.form_id, data);
      toast.success('Form updated successfully');
    } catch (error) {
      toast.error('Failed to update form');
    }
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'questions',
  });

  const onAddQuestion = (type: FormType['questions'][number]['type']) => {
    append({
      name: '',
      question: '',
      type,
      required: false,
      options: [],
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Form Title</FormLabel>
                <FormControl>
                  <Input placeholder='Example Form' {...field} />
                </FormControl>
                <FormDescription>
                  This is your Form title, it will be displayed on the form.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Details about the club'
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your Form description, it will be displayed on the
                  form.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex w-full flex-col gap-4 lg:flex-row'>
            <FormField
              control={form.control}
              name='start_datetime'
              render={({ field }) => (
                <FormItem className='w-full max-w-md'>
                  <FormLabel>Form Start At</FormLabel>
                  <FormControl>
                    <DateTimePicker {...field} granularity={'minute'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='end_datetime'
              render={({ field }) => (
                <FormItem className='w-full max-w-md'>
                  <FormLabel>Form End At</FormLabel>
                  <FormControl>
                    <DateTimePicker {...field} granularity={'minute'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='is_public'
            render={({ field }) => (
              <FormItem className='flex w-fit flex-row items-center justify-between gap-4 rounded-lg p-3'>
                <FormLabel>Public</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {fields.map((item, index) => (
            <React.Fragment key={index}>
              <div className='flex max-w-2xl flex-col gap-3 rounded-lg border border-neutral-200 p-3'>
                <div className='flex flex-col'>
                  <div className='text-lg font-semibold text-neutral-700'>
                    Question {index + 1}
                  </div>
                  <span className='text-sm font-semibold text-neutral-700'>
                    Type:{' '}
                    <span className='text-neutral-600'>
                      {questionTypes.find((val) => val.value === item.type)
                        ?.name ?? ''}
                    </span>
                  </span>
                </div>
                <FormField
                  control={form.control}
                  name={`questions.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={`Name`}
                          size={16}
                          {...field}
                          className='max-w-2xl'
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        Should be unique and for each question.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`questions.${index}.question`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={`Question`}
                          size={16}
                          {...field}
                          className='max-w-2xl'
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {(item.type === 'multiple_choice' ||
                  item.type === 'select') && (
                  <OptionsInput control={form.control} nestedIndex={index} />
                )}
                <div className='flex flex-col items-center justify-between gap-3 md:flex-row'>
                  <FormField
                    control={form.control}
                    name={`questions.${index}.required`}
                    render={({ field }) => (
                      <FormItem className='flex w-fit flex-row items-center justify-between gap-2'>
                        <FormLabel className='mt-2'>Required</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    size='sm'
                    onClick={() => remove(index)}
                    variant='default'
                    disabled={form.formState.isSubmitting}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </React.Fragment>
          ))}
          <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger className='w-full'>
              <Button
                size='lg'
                type='button'
                variant='primary'
                className='my-1 w-full'
                disabled={form.formState.isSubmitting}
              >
                Add Question
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select Question Type</DialogTitle>
              </DialogHeader>
              <div className='flex flex-col gap-2'>
                {questionTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant='outline'
                    type='button'
                    onClick={() => {
                      onAddQuestion(type.value);
                      setOpen(false);
                    }}
                  >
                    {type.name}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <Button
            size='lg'
            type='submit'
            className='!my-4 w-full'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <LoadingSpinner /> : 'Update'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateForm;
