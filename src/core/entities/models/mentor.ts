import z from 'zod';

export const MentorSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  displayName: z.string(),
  bio: z.string().nullable(),
  expertise: z.array(z.string()),
  hourlyRate: z.number().nullable(),
  isAvailable: z.boolean().default(true),
  verified: z.boolean().default(false),
});

export type Mentor = z.infer<typeof MentorSchema>;
