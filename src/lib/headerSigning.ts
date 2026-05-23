import { createHmac, timingSafeEqual } from 'crypto';

const SECRET = process.env.INTERNAL_HEADER_SECRET!;

export interface UserClaims {
  userId: string;
  role: string;
}

export function signClaims(claims: UserClaims): string {
  const payload = `${claims.userId}:${claims.role}`;
  const sig = createHmac('sha256', SECRET).update(payload).digest('hex');
  return `${payload}.${sig}`;
}

export function verifyClaims(signed: string): UserClaims {
  const lastDot = signed.lastIndexOf('.');
  const payload = signed.substring(0, lastDot);
  const sig = signed.substring(lastDot + 1);

  const expectedSig = createHmac('sha256', SECRET)
    .update(payload)
    .digest('hex');

  const sigBuffer = Buffer.from(sig, 'hex');
  const expectedBuffer = Buffer.from(expectedSig, 'hex');

  if (sigBuffer.length !== expectedBuffer.length)
    throw new Error('Unauthorized');
  if (!timingSafeEqual(sigBuffer, expectedBuffer))
    throw new Error('Unauthorized');

  const [userId, role] = payload.split(':');
  return { userId, role };
}
