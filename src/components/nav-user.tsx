import { getCurrentUser } from '@/features/user/queries/get-current-user';
import NavUserClient from './nav-user.client';

export async function NavUser() {
  const user = await getCurrentUser();

  if (!user?.id) return null;

  return <NavUserClient user={user} />;
}
