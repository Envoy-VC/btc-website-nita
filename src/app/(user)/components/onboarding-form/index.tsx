'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { collegeNames, branches } from '~/lib/data';

import { ScrollArea } from '~/components/ui/scroll-area';

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

import { type OnboardingFormType, onboardingFormSchema } from '../../schema';

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
        router.replace('/');
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select your College' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <ScrollArea className='h-[200px]'>
                    {collegeList.map((college) => (
                      <SelectItem value={college.value} key={college.value}>
                        {college.label}
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
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
              <FormItem className='flex w-full flex-col'>
                <FormLabel>Branch</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select your Branch' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <ScrollArea className='h-[200px]'>
                      {branchNames.map((branch) => (
                        <SelectItem value={branch.value} key={branch.value}>
                          {branch.label}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
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
