'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form';

// Components
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';

import { clubSocialsSchema, type ClubSocialsType } from '~/lib/zod';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { AiOutlineLoading } from 'react-icons/ai';

import { updateClubSocials } from '~/lib/supabase/clubs';

import { getSocialImage } from '~/lib/utils';

import type { Club } from '~/types';

import Image from 'next/image';
import toast from 'react-hot-toast';
interface Props {
  serverDetails: Club;
}

const ClubSocialDetails = ({ serverDetails }: Props) => {
  const form = useForm<ClubSocialsType>({
    resolver: zodResolver(clubSocialsSchema),
    defaultValues: {
      website: serverDetails.website,
      social_media_links: serverDetails.social_media_links as {
        link: string;
      }[],
      email: serverDetails.email,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'social_media_links',
  });

  const onAddLink = () => {
    append({
      link: '',
    });
  };

  const onSubmit: SubmitHandler<ClubSocialsType> = async (
    values: ClubSocialsType
  ) => {
    try {
      await updateClubSocials(serverDetails.club_id, values);
      toast.success('Social links updated successfully');
    } catch (error) {
      toast.error('Failed to update social links');
    }
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='max-w-md space-y-2'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Club Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='support@club-name.com'
                  className='max-w-md'
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='website'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Club Website</FormLabel>
              <FormControl>
                <Input
                  placeholder='club-name.com'
                  className='max-w-md'
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='py-2  font-medium text-black'>Social Links</div>

        {fields.map((item, index) => (
          <React.Fragment key={index}>
            <FormField
              control={form.control}
              name={`social_media_links.${index}.link`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='flex flex-row items-center gap-3'>
                      <Image
                        src={getSocialImage(field.value)}
                        alt='Social Image'
                        width={36}
                        height={36}
                        className='h-8 w-8'
                      />

                      <Input
                        placeholder={`Social handle link`}
                        size={16}
                        {...field}
                        className='max-w-md'
                        disabled={form.formState.isSubmitting}
                      />
                      <Button
                        size='icon'
                        onClick={() => remove(index)}
                        variant='ghost'
                        disabled={form.formState.isSubmitting}
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
          className='w-full bg-[#0A0A0A] text-white hover:bg-[#0A0A0A] hover:text-white'
          type='button'
          onClick={onAddLink}
          disabled={form.formState.isSubmitting}
        >
          Add Social Link
        </Button>

        <div className='py-6'>
          <Button
            type='submit'
            className='w-fit'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <AiOutlineLoading className='animate-spin text-xl' />
            ) : (
              'Update Details'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClubSocialDetails;
