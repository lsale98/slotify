import { Cookie } from '@/core/entities/models/cookie';
import { AppSession } from '@/core/entities/models/session';
import { User } from '@/core/entities/models/user';

export interface IAuthenticationService {
  generateUserId(): string;
  validateSession(
    sessionId: AppSession['id'],
  ): Promise<{ user: User; session: AppSession }>;
  validatePasswords(
    inputPassword: string,
    usersHashedPassword: string,
  ): Promise<boolean>;
  createSession(user: User): Promise<{ session: AppSession; cookie: Cookie }>;
  invalidateSession(
    sessionId: AppSession['id'],
  ): Promise<{ blankCookie: Cookie }>;
  storeActivationToken(userId: string): Promise<{ token: string; otp: string }>;
  validateActivationToken(
    token: string,
  ): Promise<{ userId: User['id']; otp: string } | null>;
}
