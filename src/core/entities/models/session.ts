import { z } from 'zod';
import { UserSchema } from './user';

export const SessionSchema = z.object({
  id: z.string(),
  userId: z.cuid2(),
  expiresAt: z.date(),
  userAgent: z.string().nullable(),
  ipAddress: z
    .string()
    .regex(/^(\d{1,3}\.){3}\d{1,3}$|^([a-f0-9:]+)$/i, 'Invalid IP address')
    .nullable(),
  deviceName: z.string().nullable(),
  lastUsedAt: z.date(),
  createdAt: z.date(),
});

export const SessionWithUserSchema = SessionSchema.extend({
  user: UserSchema.pick({
    id: true,
    email: true,
    name: true,
    role: true,
    status: true,
  }),
});

export type AppSession = z.infer<typeof SessionSchema>;
export type AppSessionWithUser = z.infer<typeof SessionWithUserSchema>;
