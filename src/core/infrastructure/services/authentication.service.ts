// src/core/infrastructure/services/authentication.service.ts

import { verify } from '@node-rs/argon2';
import crypto from 'crypto';

import { prisma } from '@/lib/prisma';
import type { IAuthenticationService } from '@/core/application/services/authentication.service.interface';
import type { IInstrumentationService } from '@/core/application/services/instrumentation.service.interface';
import type { IRedisService } from '@/core/application/services/redis.interface';
import {
  UnauthenticatedError,
  UnauthorizedError,
} from '@/core/entities/errors/auth';
import type { Cookie } from '@/core/entities/models/cookie';
import type { AppSession } from '@/core/entities/models/session';
import type { User } from '@/core/entities/models/user';
import { generateOTP } from '@/lib/generateOTP';
import { SESSION_COOKIE, SESSION_TTL_SECONDS } from '../../../../config';
export class AuthenticationService implements IAuthenticationService {
  constructor(
    private readonly _instrumentationService: IInstrumentationService,
    private readonly _redisService: IRedisService,
  ) {}

  validatePasswords(
    inputPassword: string,
    usersHashedPassword: string,
  ): Promise<boolean> {
    return this._instrumentationService.startSpan(
      { name: 'verify password hash', op: 'function' },
      () => verify(usersHashedPassword, inputPassword),
    );
  }

  async validateSession(
    sessionId: string,
  ): Promise<{ user: User; session: AppSession }> {
    return this._instrumentationService.startSpan(
      { name: 'AuthenticationService > validateSession' },
      async () => {
        const session = await this._instrumentationService.startSpan(
          { name: 'SELECT session FROM db', op: 'db.query' },
          () =>
            prisma.session.findUnique({
              where: { id: sessionId },
              include: { user: true },
            }),
        );

        if (!session) {
          throw new UnauthenticatedError('Unauthenticated');
        }

        if (session.expiresAt < new Date()) {
          await this.invalidateSession(sessionId);
          throw new UnauthenticatedError('Session expired');
        }

        const { user } = session;

        if (!user) {
          throw new UnauthenticatedError("User doesn't exist");
        }

        if (user.status !== 'ACTIVE') {
          throw new UnauthorizedError('Account is not active');
        }

        // Ažuriraj lastUsedAt
        await prisma.session.update({
          where: { id: sessionId },
          data: { lastUsedAt: new Date() },
        });

        return { user, session };
      },
    );
  }

  async createSession(
    user: User,
    meta?: { userAgent?: string; ipAddress?: string; deviceName?: string },
  ): Promise<{ session: AppSession; cookie: Cookie }> {
    return this._instrumentationService.startSpan(
      { name: 'AuthenticationService > createSession' },
      async () => {
        const sessionId = crypto.randomUUID();
        const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000);

        const session = await this._instrumentationService.startSpan(
          { name: 'INSERT session INTO db', op: 'db.query' },
          () =>
            prisma.session.create({
              data: {
                id: sessionId,
                userId: user.id,
                expiresAt,
                userAgent: meta?.userAgent ?? null,
                ipAddress: meta?.ipAddress ?? null,
                deviceName: meta?.deviceName ?? null,
              },
            }),
        );

        const cookie: Cookie = {
          name: SESSION_COOKIE,
          value: sessionId,
          attributes: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: expiresAt,
            path: '/',
          },
        };

        return { session, cookie };
      },
    );
  }

  async invalidateSession(sessionId: string): Promise<{ blankCookie: Cookie }> {
    await this._instrumentationService.startSpan(
      { name: 'AuthenticationService > invalidateSession', op: 'db.query' },
      () => prisma.session.delete({ where: { id: sessionId } }),
    );

    const blankCookie: Cookie = {
      name: SESSION_COOKIE,
      value: '',
      attributes: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
      },
    };

    return { blankCookie };
  }

  async invalidateAllUserSessions(
    userId: string,
  ): Promise<{ blankCookie: Cookie }> {
    await this._instrumentationService.startSpan(
      {
        name: 'AuthenticationService > invalidateAllUserSessions',
        op: 'db.query',
      },
      () => prisma.session.deleteMany({ where: { userId } }),
    );

    const blankCookie: Cookie = {
      name: SESSION_COOKIE,
      value: '',
      attributes: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
      },
    };

    return { blankCookie };
  }

  generateUserId(): string {
    return this._instrumentationService.startSpan(
      { name: 'AuthenticationService > generateUserId', op: 'function' },
      () => crypto.randomUUID(),
    );
  }

  async storeActivationToken(
    userId: string,
  ): Promise<{ token: string; otp: string }> {
    return this._instrumentationService.startSpan(
      { name: 'AuthenticationService > storeActivationToken', op: 'function' },
      async () => {
        const token = crypto.randomUUID();
        const otp = generateOTP();

        await this._redisService.setToken(
          `activation:${token}`,
          JSON.stringify({ userId, otp }),
          3600,
        );

        return { token, otp };
      },
    );
  }

  async validateActivationToken(
    token: string,
  ): Promise<{ userId: User['id']; otp: string } | null> {
    return this._instrumentationService.startSpan(
      {
        name: 'AuthenticationService > validateActivationToken',
        op: 'function',
      },
      async () => {
        const result = await this._redisService.getToken<{
          userId: string;
          otp: string;
        }>(`activation:${token}`);

        if (!result?.userId) return null;

        await this._redisService.deleteToken(`activation:${token}`);

        return { userId: result.userId, otp: result.otp };
      },
    );
  }
}
