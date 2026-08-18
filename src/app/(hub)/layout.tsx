import { AppSidebar } from '@/components/layout/hub/AppSidebar';
import { Container } from '@/components/ui/container';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Role } from '@/core/entities/models/user';
import { getClaims } from '@/lib/getClaims';
import { getSidebarRoutes } from '@/lib/routes';
import { redirect } from 'next/navigation';

export default async function HubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const claims = await getClaims();
  if (!claims) redirect('/sign-in');

  const routes = getSidebarRoutes(claims.role as Role) ?? [];

  return (
    <SidebarProvider>
      <AppSidebar links={routes} role={claims.role as Role} />
      <SidebarInset>
        <header className="flex h-12 items-center gap-2">
          <Container variant="hub">
            <SidebarTrigger />
          </Container>
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
