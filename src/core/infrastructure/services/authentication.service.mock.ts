// src/core/infrastructure/services/authentication.service.mock.ts

import type { IAuthenticationService } from '@/core/application/services/authentication.service.interface';
import type { Cookie } from '@/core/entities/models/cookie';
import type { AppSession } from '@/core/entities/models/session';
import type { User } from '@/core/entities/models/user';
import { MOCK_USER } from '@/core/infrastructure/repositories/users.repository.mock';
import { SESSION_COOKIE } from '../../../../config';

export const MOCK_SESSION: AppSession = {
  id: 'test-session-id',
  userId: MOCK_USER.id,
  expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  userAgent: 'Mozilla/5.0',
  ipAddress: '127.0.0.1',
  deviceName: 'Chrome on Windows',
  lastUsedAt: new Date(),
  createdAt: new Date(),
};

export const MOCK_COOKIE: Cookie = {
  name: SESSION_COOKIE,
  value: MOCK_SESSION.id,
  attributes: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
  },
};

export const MOCK_BLANK_COOKIE: Cookie = {
  name: SESSION_COOKIE,
  value: '',
  attributes: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  },
};

export class MockAuthenticationService implements IAuthenticationService {
  private _sessions: Map<string, AppSession> = new Map([
    [MOCK_SESSION.id, MOCK_SESSION],
  ]);

  private _activationTokens: Map<string, { userId: string; otp: string }> =
    new Map();

  async validatePasswords(
    inputPassword: string,
    usersHashedPassword: string,
  ): Promise<boolean> {
    return usersHashedPassword === `hashed-${inputPassword}`;
  }

  async validateSession(
    sessionId: string,
  ): Promise<{ user: User; session: AppSession }> {
    const session = this._sessions.get(sessionId);

    if (!session) {
      throw new Error('Unauthenticated');
    }

    if (session.expiresAt < new Date()) {
      this._sessions.delete(sessionId);
      throw new Error('Session expired');
    }

    return { user: MOCK_USER, session };
  }

  async createSession(
    user: User,
    meta?: { userAgent?: string; ipAddress?: string; deviceName?: string },
  ): Promise<{ session: AppSession; cookie: Cookie }> {
    const session: AppSession = {
      ...MOCK_SESSION,
      id: `session-${user.id}`,
      userId: user.id,
      userAgent: meta?.userAgent ?? null,
      ipAddress: meta?.ipAddress ?? null,
      deviceName: meta?.deviceName ?? null,
    };

    this._sessions.set(session.id, session);

    return { session, cookie: MOCK_COOKIE };
  }

  async invalidateSession(sessionId: string): Promise<{ blankCookie: Cookie }> {
    this._sessions.delete(sessionId);
    return { blankCookie: MOCK_BLANK_COOKIE };
  }

  async invalidateAllUserSessions(
    userId: string,
  ): Promise<{ blankCookie: Cookie }> {
    for (const [id, session] of this._sessions) {
      if (session.userId === userId) {
        this._sessions.delete(id);
      }
    }
    return { blankCookie: MOCK_BLANK_COOKIE };
  }

  generateUserId(): string {
    return `mock-user-id-${Date.now()}`;
  }

  async storeActivationToken(
    userId: string,
  ): Promise<{ token: string; otp: string }> {
    const token = `mock-token-${userId}`;
    const otp = '123456';

    this._activationTokens.set(token, { userId, otp });

    return { token, otp };
  }

  async validateActivationToken(
    token: string,
  ): Promise<{ userId: User['id']; otp: string } | null> {
    const result = this._activationTokens.get(token);
    if (!result) return null;

    this._activationTokens.delete(token);
    return result;
  }

  _reset(): void {
    this._sessions = new Map([[MOCK_SESSION.id, MOCK_SESSION]]);
    this._activationTokens = new Map();
  }

  _getSessions(): Map<string, AppSession> {
    return this._sessions;
  }

  _addSession(session: AppSession): void {
    this._sessions.set(session.id, session);
  }

  _getActivationTokens(): Map<string, { userId: string; otp: string }> {
    return this._activationTokens;
  }
}
