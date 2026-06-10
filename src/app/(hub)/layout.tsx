import { AppSidebar } from '@/components/layout/hub/AppSidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Role } from '@/core/entities/models/user';
import SignOutButton from '@/features/auth/components/SignOutButton';
import { getClaims } from '@/lib/getClaims';
import { roleRoutes } from '@/lib/routes';
import { redirect } from 'next/navigation';

type NavLink = {
  href: string;
  label: string;
};

export default async function HubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const claims = await getClaims();
  if (!claims) redirect('/sign-in');

  const links = roleRoutes[claims.role as Role] ?? [];

  return (
    <SidebarProvider>
      <AppSidebar links={links} role={claims.role as Role} />
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
