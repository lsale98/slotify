'use client';

import { User } from '@/core/entities/models/user';
import { ChevronsUpDown } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import SignOutButton from '@/features/auth/components/SignOutButton';
import { getInitials } from '@/lib/utils';
import { getDropdownRoutes } from '@/lib/routes';
import Link from 'next/link';

interface INavUserClient {
  user: User;
}

export function NavUserClient({ user }: INavUserClient) {
  const { isMobile } = useSidebar();

  const links = getDropdownRoutes(user.role) ?? [];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <Avatar className="bg-bg-avatar h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user.avatarUrl || ''}
                  alt={`${user.name} ${user.lastname}`}
                />
                <AvatarFallback className="rounded-lg">
                  {getInitials(user.name, user.lastname)}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{`${user.name} ${user.lastname}`}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-sidebar-bg w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="bg-bg-avatar h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.avatarUrl || ''}
                    alt={`${user.name} ${user.lastname}`}
                  />
                  <AvatarFallback className="rounded-lg">
                    {getInitials(user.name, user.lastname)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{`${user.name} ${user.lastname}`}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {links.map((section) => (
              <DropdownMenuGroup key={section.id}>
                {section.routes.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href}>
                      <link.icon />
                      <span>{link.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="mx-auto flex">
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default NavUserClient;
