import { Role } from '@/core/entities/models/user';

import {
  LayoutDashboard,
  Users,
  User,
  CreditCard,
  Calendar,
  BookOpen,
  LucideIcon,
  GraduationCap,
  Presentation,
  Heart,
  Goal,
  Target,
  BarChart,
  ChartNoAxesCombined,
  Star,
  UserKey,
} from 'lucide-react';

export type RoutePlacement = 'sidebar' | 'dropdown' | 'both';

export type RouteType = {
  href: string;
  label: string;
  placement: RoutePlacement;
  icon: LucideIcon;
};

export type SectionRoutes = {
  id: string;
  title: string;
  routes: RouteType[];
};

export const roleRoutes: Record<Role, SectionRoutes[]> = {
  SUPERADMIN: [
    {
      id: 'overview',
      title: 'Overview',
      routes: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          placement: 'sidebar',
          icon: LayoutDashboard,
        },
        {
          href: '/sessions',
          label: 'My Sessions',
          placement: 'sidebar',
          icon: UserKey,
        },
        {
          href: '/account',
          label: 'Account',
          placement: 'dropdown',
          icon: User,
        },
        {
          href: '/billing',
          label: 'Billing',
          placement: 'dropdown',
          icon: CreditCard,
        },
      ],
    },
  ],
  ADMIN: [
    {
      id: 'overview',
      title: 'Overview',
      routes: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          placement: 'sidebar',
          icon: LayoutDashboard,
        },
        { href: '/users', label: 'Users', placement: 'sidebar', icon: Users },
        {
          href: '/account',
          label: 'Account',
          placement: 'dropdown',
          icon: User,
        },
        {
          href: '/billing',
          label: 'Billing',
          placement: 'dropdown',
          icon: CreditCard,
        },
      ],
    },
  ],
  MENTOR: [
    {
      id: 'overview',
      title: 'Overview',
      routes: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          placement: 'sidebar',
          icon: LayoutDashboard,
        },
        {
          href: '/booking',
          label: 'Booking',
          placement: 'sidebar',
          icon: BookOpen,
        },
        {
          href: '/calendar',
          label: 'Calendar',
          placement: 'sidebar',
          icon: Calendar,
        },
        {
          href: '/account',
          label: 'Account',
          placement: 'dropdown',
          icon: User,
        },
      ],
    },
  ],
  SUPPORT: [
    {
      id: 'overview',
      title: 'Overview',
      routes: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          placement: 'sidebar',
          icon: LayoutDashboard,
        },
        {
          href: '/account',
          label: 'Account',
          placement: 'dropdown',
          icon: User,
        },
      ],
    },
  ],
  USER: [
    {
      id: 'overview',
      title: 'Overview',
      routes: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          placement: 'sidebar',
          icon: LayoutDashboard,
        },
        {
          href: '/slots',
          label: 'My Slots',
          placement: 'sidebar',
          icon: Presentation,
        },
        {
          href: '/sessions',
          label: 'My Sessions',
          placement: 'sidebar',
          icon: UserKey,
        },
        {
          href: '/account',
          label: 'Account',
          placement: 'dropdown',
          icon: User,
        },
        {
          href: '/billing',
          label: 'Billing',
          placement: 'dropdown',
          icon: CreditCard,
        },
      ],
    },
    {
      id: 'mentor',
      title: 'Mentors',
      routes: [
        {
          href: '/mentors',
          label: 'Mentors',
          placement: 'sidebar',
          icon: GraduationCap,
        },
        {
          href: '/bookmarks',
          label: 'Favorites',
          placement: 'sidebar',
          icon: Heart,
        },
        {
          href: '/reviews',
          label: 'My Reviews',
          placement: 'sidebar',
          icon: Star,
        },
      ],
    },
    {
      id: 'growth',
      title: 'Growth',
      routes: [
        {
          href: '/goals',
          label: 'My Goals',
          placement: 'sidebar',
          icon: Target,
        },
        {
          href: '/progress',
          label: 'Progress',
          placement: 'sidebar',
          icon: ChartNoAxesCombined,
        },
      ],
    },
  ],
};

export const getSidebarRoutes = (role: Role): SectionRoutes[] =>
  roleRoutes[role]
    .map((section) => ({
      ...section,
      routes: section.routes.filter(
        (r) => r.placement === 'sidebar' || r.placement === 'both',
      ),
    }))
    .filter((section) => section.routes.length > 0);

export const getDropdownRoutes = (role: Role): SectionRoutes[] =>
  roleRoutes[role]
    .map((section) => ({
      ...section,
      routes: section.routes.filter(
        (r) => r.placement === 'dropdown' || r.placement === 'both',
      ),
    }))
    .filter((section) => section.routes.length > 0);
