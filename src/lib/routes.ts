import { Role } from '@/core/entities/models/user';

export const roleRoutes: Record<Role, string[]> = {
  SUPERADMIN: ['/dashboard'],
  ADMIN: ['/dashboard'],
  SUPPORT: ['/dashboard'],
  MENTOR: ['/dashboard'],
  USER: ['/dashboard'],
};
