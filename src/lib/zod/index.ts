import { z } from 'zod';

import { Club } from '~/types';

export const clubAppearanceSchema = z.object({
  logo: z.instanceof(File).optional(),
  cover_image: z.instanceof(File).optional(),
  banner_image: z.instanceof(File).optional(),
});

export const clubDetailsSchema = z.object({
  club_name: z.string({ required_error: '' }),
  description: z.string({ required_error: '' }),
  founding_year: z.number({ required_error: '' }).min(1, ''),
  members: z.array(z.string({ required_error: '' })),
});

export const socialSchema = z.object({
  link: z.string({ required_error: '' }).min(1),
});

export const clubSocialsSchema = z.object({
  email: z.string({ required_error: '' }),
  website: z.string({ required_error: '' }),
  social_media_links: z.array(socialSchema),
});

export type ClubDetailsType = z.infer<typeof clubDetailsSchema>;
export type ClubAppearanceType = z.infer<typeof clubAppearanceSchema>;
export type ClubSocialsType = z.infer<typeof clubSocialsSchema>;
