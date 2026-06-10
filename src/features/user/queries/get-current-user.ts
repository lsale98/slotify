import { headers } from 'next/headers';
import { getInjection } from '@/di/container';
import { verifyClaims } from '@/lib/headerSigning';

export async function getCurrentUser() {
  const headersList = await headers();
  const claims = headersList.get('x-user-claims');

  if (!claims) return null;

  const { userId } = verifyClaims(claims);

  const usersRepository = getInjection('IUsersRepository');
  return usersRepository.getUserById(userId);
}
