import { z } from 'zod';

import { CalendarDateTime } from '@internationalized/date';

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
  is_public: z.boolean({ required_error: '' }),
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

export const eventSchema = z.object({
  event_image: z.instanceof(File).optional(),
  event_name: z.string({ required_error: '' }).optional(),
  description: z.string({ required_error: '' }).optional(),
  rules: z.string({ required_error: '' }).optional(),
  venue: z.string({ required_error: '' }).optional(),
  feedback_form: z.string({ required_error: '' }).optional(),
  registration_form: z.string({ required_error: '' }).optional(),
  start_datetime: z.instanceof(CalendarDateTime).optional(),
  end_datetime: z.instanceof(CalendarDateTime).optional(),
  registration_start_at: z.instanceof(CalendarDateTime).optional(),
  registration_end_at: z.instanceof(CalendarDateTime).optional(),
  is_public: z.boolean({ required_error: '' }).optional(),
});

export type EventType = z.infer<typeof eventSchema>;
