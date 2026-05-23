import { headers } from 'next/headers';
import { UserClaims, verifyClaims } from './headerSigning';

export async function getClaimsOrThrow(): Promise<UserClaims> {
  const signed = (await headers()).get('x-user-claims');
  if (!signed) throw new Error('Unauthorized');
  return verifyClaims(signed);
}

export async function getClaims(): Promise<UserClaims | null> {
  const signed = (await headers()).get('x-user-claims');
  if (!signed) return null;

  try {
    return verifyClaims(signed);
  } catch {
    return null;
  }
}
