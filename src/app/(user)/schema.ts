import { z } from 'zod';

export const onboardingFormSchema = z.object({
  name: z
    .string({
      required_error: '',
    })
    .max(255, 'Name is too long'),
  phone_number: z
    .string({
      required_error: '',
    })
    .regex(/^\d{10}$/, 'Invalid phone number'),
  gender: z.enum(
    ['Male', 'Female', 'Transgender', 'Non-binary', 'Prefer not to say'],
    {
      required_error: '',
    }
  ),
  college_name: z.string({
    required_error: '',
  }),
  branch: z.string({
    required_error: '',
  }),
  expected_graduation: z.string({
    required_error: '',
  }),
  tshirt_size: z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'], {
    required_error: '',
  }),
  dietary_preferences: z.enum(['Vegetarian', 'Non-vegetarian'], {
    required_error: '',
  }),
});

export type OnboardingFormType = z.infer<typeof onboardingFormSchema>;
