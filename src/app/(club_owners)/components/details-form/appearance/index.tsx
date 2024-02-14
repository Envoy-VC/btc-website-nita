/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';

import React from 'react';

import { useAuth } from '@clerk/nextjs';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { AiOutlineLoading } from 'react-icons/ai';

import { clubAppearanceSchema, type ClubAppearanceType } from '~/lib/zod';

import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';

import { updateClubAppearanceDetails } from '~/lib/supabase/clubs';
import { createSupabaseClient } from '~/lib/supabase/client';

import type { Club } from '~/types';

import BannerImageUpload from './banner';
import CoverImageUpload from './cover';
import LogoImageUpload from './logo';
import toast from 'react-hot-toast';

interface Props {
  serverDetails: Club;
}

const ClubAppearanceDetailsForm = ({ serverDetails }: Props) => {
  const { getToken } = useAuth();
  const form = useForm<ClubAppearanceType>({
    resolver: zodResolver(clubAppearanceSchema),
  });

  const onSubmit = async (data: ClubAppearanceType) => {
    const supabaseAccessToken = await getToken({
      template: 'supabase',
    });

    const supabase = createSupabaseClient(supabaseAccessToken ?? '');

    try {
      let bannerPath = serverDetails.banner_image_url;
      let coverPath = serverDetails.cover_photo_url;
      let logoPath = serverDetails.logo_url;

      if (data.banner_image) {
        const bannerURI = await supabase.storage
          .from('club_details')
          .upload(`${serverDetails.club_id}-banner`, data.banner_image, {
            contentType: data.banner_image.type,
            upsert: true,
          });
        if (!bannerURI.data?.path) {
          console.log(bannerURI.error);
          throw new Error('Failed to upload banner');
        }
        // @ts-expect-error outdated types
        bannerPath = `${bannerURI.data.fullPath}?${Date.now()}`;
      }

      if (data.cover_image) {
        const coverURI = await supabase.storage
          .from('club_details')
          .upload(`${serverDetails.club_id}-cover`, data.cover_image, {
            contentType: data.cover_image.type,
            upsert: true,
          });
        if (!coverURI.data?.path) {
          console.log(coverURI.error);
          throw new Error('Failed to upload cover');
        }
        // @ts-expect-error outdated types
        coverPath = `${coverURI.data.fullPath}?${Date.now()}`;
      }

      if (data.logo) {
        const logoURI = await supabase.storage
          .from('club_details')
          .upload(`${serverDetails.club_id}-logo`, data.logo, {
            contentType: data.logo.type,
            upsert: true,
          });
        if (!logoURI.data?.path) {
          console.log(logoURI.error);
          throw new Error('Failed to upload logo');
        }
        // @ts-expect-error outdated types
        logoPath = `${logoURI.data.fullPath}?${Date.now()}`;
      }

      await updateClubAppearanceDetails(serverDetails.club_id, {
        logo: logoPath,
        banner_image: bannerPath,
        cover_image: coverPath,
      });
      toast.success('Club appearance details updated');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
          <FormField
            control={form.control}
            name='banner_image'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Banner Image{' '}
                  <span className='text-sm text-gray-500'>
                    (1200x300 recommended)
                  </span>
                </FormLabel>
                <FormControl>
                  <BannerImageUpload
                    {...field}
                    control={form.control}
                    currentBanner={serverDetails.banner_image_url}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='cover_image'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  OG Cover Image{' '}
                  <span className='text-sm text-gray-500'>
                    (1200x630 recommended)
                  </span>
                </FormLabel>
                <FormControl>
                  <CoverImageUpload
                    {...field}
                    control={form.control}
                    currentCover={serverDetails.cover_photo_url}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='logo'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Logo Image{' '}
                  <span className='text-sm text-gray-500'>
                    (300x300 recommended)
                  </span>
                </FormLabel>
                <FormControl>
                  <LogoImageUpload
                    {...field}
                    control={form.control}
                    currentLogo={serverDetails.logo_url}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='!my-4'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <AiOutlineLoading className='animate-spin text-xl' />
            ) : (
              'Update Details'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ClubAppearanceDetailsForm;
