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

  return <>{claims.role === 'SUPERADMIN' ? superadmin : user}</>;
}
