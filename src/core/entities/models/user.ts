import { z } from 'zod';

export const RoleSchema = z.enum([
  'SUPERADMIN',
  'ADMIN',
  'SUPPORT',
  'MENTOR',
  'USER',
]);

export const StatusSchema = z.enum([
  'ACTIVE',
  'PENDING',
  'SUSPENDED',
  'INACTIVE',
]);

export const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  name: z.string(),
  lastname: z.string(),
  password_hash: z.string(),
  role: RoleSchema.default('USER'),
  status: StatusSchema.default('PENDING'),
  email_verified: z.boolean().default(false),
  avatar_url: z.url().nullable(),
  agreed_terms: z.boolean().default(true),
  created_at: z.date(),
  updated_at: z.date(),
});

export const createUserSchema = UserSchema.pick({
  id: true,
  email: true,
  name: true,
  lastname: true,
  role: true,
  status: true,
  agreed_terms: true,
}).extend({ password: z.string().min(6).max(20) });

export type CreateUser = z.infer<typeof createUserSchema>;
export type User = z.infer<typeof UserSchema>;
export type Role = z.infer<typeof RoleSchema>;
export type Status = z.infer<typeof StatusSchema>;
