'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '~/lib/utils';

import { collegeNames, branches } from '~/lib/data';

import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

import { AiOutlineLoading } from 'react-icons/ai';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '~/components/ui/command';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';

import { type OnboardingFormType, onboardingFormSchema } from '../../schema';

import { HiSelector, HiCheck } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { Role } from '~/types';

const collegeList = collegeNames.map((college) => ({
  label: college,
  value: college,
}));

const branchNames = branches.map((branch) => ({
  label: branch,
  value: branch,
}));

interface Props {
  email_id: string;
  user_id: string;
}

const OnboardingForm = ({ email_id, user_id }: Props) => {
  const router = useRouter();
  const form = useForm<OnboardingFormType>({
    resolver: zodResolver(onboardingFormSchema),
  });

  const onSubmit = async (values: OnboardingFormType) => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch('/api/grant-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: Role.USER,
          data: {
            id: user_id,
            email_id,
            ...values,
          },
        }),
      });

      const { success } = (await res.json()) as {
        success: boolean;
      };

      if (success) {
        resolve('User creation success');
      } else {
        reject('User creation failed');
      }
    });

    void toast
      .promise(promise, {
        loading: 'Creating user...',
        success: 'User created',
        error: 'User creation failed',
      })
      .then(() => {
        router.push('/');
      });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => await onSubmit(values))}
        className='space-y-2'
      >
        <FormField
          disabled={form.formState.isSubmitting}
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Richard Hendricks' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          disabled={form.formState.isSubmitting}
          name='phone_number'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder='1234567890' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          disabled={form.formState.isSubmitting}
          name='gender'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select you gender' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Male'>Male</SelectItem>
                  <SelectItem value='Female'>Female</SelectItem>
                  <SelectItem value='Transgender'>Transgender</SelectItem>
                  <SelectItem value='Non-binary'>Non-binary</SelectItem>
                  <SelectItem value='Prefer not to say'>
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          disabled={form.formState.isSubmitting}
          name='college_name'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col'>
              <FormLabel>College</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'w-full justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? collegeList.find(
                            (college) => college.value === field.value
                          )?.label
                        : 'Select College'}
                      <HiSelector className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0'>
                  <Command className=''>
                    <CommandInput
                      placeholder='Search College...'
                      className='h-9'
                    />
                    <CommandEmpty>No College found.</CommandEmpty>
                    <CommandGroup className='w-full'>
                      {collegeList.map((college) => (
                        <CommandItem
                          value={college.label}
                          key={college.value}
                          onSelect={() => {
                            form.setValue('college_name', college.value);
                          }}
                        >
                          {college.label}
                          <HiCheck
                            className={cn(
                              'ml-auto h-4 w-4',
                              college.value === field.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col items-end gap-3 sm:flex-row'>
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name='branch'
            render={({ field }) => (
              <FormItem className='flex w-full max-w-sm flex-col'>
                <FormLabel>Branch</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn(
                          'w-full justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? branchNames
                              .find((branch) => branch.value === field.value)
                              ?.label.slice(0, 24)
                          : 'Select Branch'}
                        <HiSelector className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-full p-0'>
                    <Command className=''>
                      <CommandInput
                        placeholder='Search Branch...'
                        className='h-9'
                      />
                      <CommandEmpty>No Branch found.</CommandEmpty>
                      <CommandGroup className='w-full'>
                        {branchNames.map((branch) => (
                          <CommandItem
                            value={branch.label}
                            key={branch.value}
                            onSelect={() => {
                              form.setValue('branch', branch.value);
                            }}
                          >
                            {branch.label}
                            <HiCheck
                              className={cn(
                                'ml-auto h-4 w-4',
                                branch.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name='expected_graduation'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Expected Graduation Year</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select graduation year' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='2024'>2024</SelectItem>
                    <SelectItem value='2025'>2025</SelectItem>
                    <SelectItem value='2026'>2026</SelectItem>
                    <SelectItem value='2027'>2027</SelectItem>
                    <SelectItem value='2028'>2028</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col items-center gap-2 sm:flex-row'>
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name='tshirt_size'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>T-Shirt Size</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Tee size' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='S'>Small (S)</SelectItem>
                    <SelectItem value='M'>Medium (M)</SelectItem>
                    <SelectItem value='L'>Large (L)</SelectItem>
                    <SelectItem value='XL'>Extra Large (XL)</SelectItem>
                    <SelectItem value='XXL'>
                      Double Extra Large (XXL)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            disabled={form.formState.isSubmitting}
            name='dietary_preferences'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Dietary Preferences</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='Vegetarian'>Vegetarian</SelectItem>
                    <SelectItem value='Non-vegetarian'>
                      Non-Vegetarian
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex justify-start pt-5'>
          <Button type='submit' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <AiOutlineLoading className='animate-spin text-lg' />
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OnboardingForm;
