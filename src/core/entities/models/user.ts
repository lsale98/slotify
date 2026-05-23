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
  id: z.cuid(),
  email: z.email(),
  name: z.string(),
  lastname: z.string(),
  passwordHash: z.string(),
  role: RoleSchema.default('USER'),
  status: StatusSchema.default('PENDING'),
  emailVerified: z.boolean().default(false),
  avatarUrl: z.url().nullable(),
  agreedTerms: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createUserSchema = UserSchema.pick({
  id: true,
  email: true,
  name: true,
  lastname: true,
  role: true,
  status: true,
  agreedTerms: true,
}).extend({ password: z.string().min(6).max(20) });

export type CreateUser = z.infer<typeof createUserSchema>;
export type User = z.infer<typeof UserSchema>;
export type Role = z.infer<typeof RoleSchema>;
export type Status = z.infer<typeof StatusSchema>;
