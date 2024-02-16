import React from 'react';

import { useFieldArray } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '~/components/ui/form';

import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

import type { FormType } from '~/lib/zod/form';

import { BsFillTrash3Fill } from 'react-icons/bs';

interface Props {
  control: Control<FormType>;
  nestedIndex: number;
}

const OptionsInput = ({ control, nestedIndex }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${nestedIndex}.options`,
  });

  return (
    <div>
      {fields.map((item, index) => (
        <React.Fragment key={index}>
          <FormField
            control={control}
            name={`questions.${nestedIndex}.options.${index}.option`}
            render={({ field }) => (
              <FormItem className='my-1'>
                <FormControl>
                  <div className='flex flex-row items-center gap-3'>
                    <Input
                      placeholder={`Option ${index + 1}`}
                      size={16}
                      {...field}
                      className='max-w-md'
                    />
                    <Button
                      size='icon'
                      type='button'
                      onClick={() => remove(index)}
                      variant='ghost'
                    >
                      <BsFillTrash3Fill className='text-neutral-600' />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </React.Fragment>
      ))}
      <Button
        variant='secondary'
        type='button'
        onClick={() =>
          append({
            option: '',
          })
        }
      >
        Add Option
      </Button>
    </div>
  );
};

export default OptionsInput;
