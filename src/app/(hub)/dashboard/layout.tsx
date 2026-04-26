import { Role } from '@/core/entities/models/user';
import { getClaims } from '@/lib/getClaims';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  superadmin,
  user,
}: {
  superadmin: React.ReactNode;
  user: React.ReactNode;
}) {
  const claims = await getClaims();
  if (!claims) redirect('/sign-in');

  const ROLE_VIEWS: Record<Role, React.ReactNode> = {
    SUPERADMIN: superadmin,
    ADMIN: null,
    SUPPORT: null,
    MENTOR: null,
    USER: user,
  };

  return <>{ROLE_VIEWS[claims.role as Role] || user}</>;
}
