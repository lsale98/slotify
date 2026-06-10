import * as React from 'react';
import { Role } from '@/core/entities/models/user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { NavUser } from '@/components/nav-user';
import { Typography } from '@/components/ui/typography';

type NavLink = {
  href: string;
  label: string;
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  links: NavLink[];
  role: Role;
};

export async function AppSidebar({ links, role, ...props }: AppSidebarProps) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-end gap-0">
                <Typography variant="h4">Slotify</Typography>
                <div className="bg-primary h-1.5 w-1.5 -translate-x-1.5 -translate-y-1.5 rounded-full"></div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Pages</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton asChild>
                    <a href={link.href}>{link.label}</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
