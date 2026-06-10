import { Role } from '@/core/entities/models/user';

export type RouteType = {
  href: string;
  label: string;
};

export const roleRoutes: Record<Role, RouteType[]> = {
  SUPERADMIN: [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/profile', label: 'Profile' },
  ],
  ADMIN: [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/users', label: 'Users' },
    { href: '/profile', label: 'Profile' },
  ],
  MENTOR: [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/profile', label: 'Profile' },
  ],
  SUPPORT: [{ href: '/dashboard', label: 'Dashboard' }],
  USER: [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/profile', label: 'Profile' },
  ],
};
