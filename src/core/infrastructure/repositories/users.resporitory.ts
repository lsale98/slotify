// src/core/infrastructure/repositories/users.repository.ts

import { hash } from '@node-rs/argon2';
import type { IUsersRepository } from '@/core/application/repositories/users.repository.interface';
import { DatabaseOperationError } from '@/core/entities/errors/common';
import type { IInstrumentationService } from '@/core/application/services/instrumentation.service.interface';
import type { ICrashReporterService } from '@/core/application/services/crash-reporter.service.interface';
import { prisma } from '@/lib/prisma';
import { CreateUser, User } from '@/core/entities/models/user';
import { AuthenticationError } from '@/core/entities/errors/auth';
import { IRedisService } from '@/core/application/services/redis.interface';

export class UsersRepository implements IUsersRepository {
  constructor(
    private readonly instrumentationService: IInstrumentationService,
    private readonly crashReporterService: ICrashReporterService,
    private readonly redisService: IRedisService,
  ) {}

  async getUserById(id: string): Promise<User | undefined> {
    return this.instrumentationService.startSpan(
      { name: 'UsersRepository > getUser' },
      async () => {
        try {
          const user = await this.instrumentationService.startSpan(
            {
              name: 'SELECT * FROM users WHERE id = $1',
              op: 'db.query',
              attributes: { 'db.system': 'postgres' },
            },
            () => prisma.user.findUnique({ where: { id } }),
          );

          return user ?? undefined;
        } catch (err) {
          this.crashReporterService.report(err);
          throw err;
        }
      },
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.instrumentationService.startSpan(
      { name: 'UsersRepository > getUserByEmail' },
      async () => {
        try {
          const user = await this.instrumentationService.startSpan(
            {
              name: 'SELECT * FROM users WHERE email = $1',
              op: 'db.query',
              attributes: { 'db.system': 'postgres' },
            },
            () => prisma.user.findUnique({ where: { email } }),
          );

          return user ?? undefined;
        } catch (err) {
          this.crashReporterService.report(err);
          throw err;
        }
      },
    );
  }

  async createUser(input: CreateUser): Promise<User> {
    return this.instrumentationService.startSpan(
      { name: 'UsersRepository > createUser' },
      async () => {
        try {
          const passwordHash = await this.instrumentationService.startSpan(
            { name: 'hash password', op: 'function' },
            () => hash(input.password),
          );

          const user = await this.instrumentationService.startSpan(
            {
              name: 'INSERT INTO users',
              op: 'db.query',
              attributes: { 'db.system': 'postgres' },
            },
            () =>
              prisma.user.create({
                data: {
                  id: input.id,
                  name: input.name,
                  lastname: input.lastname,
                  email: input.email,
                  passwordHash,
                  role: input.role,
                  status: input.status,
                },
              }),
          );

          return user;
        } catch (err) {
          this.crashReporterService.report(err);
          throw new DatabaseOperationError('Cannot create user.');
        }
      },
    );
  }

  async activateUserAccount(
    token: string,
    otp: string,
  ): Promise<User | undefined> {
    return this.instrumentationService.startSpan(
      { name: 'UsersRepository > activateUserAccount' },
      async () => {
        // 1. Provjeri token u Redisu
        const result = await this.redisService.getToken<{
          userId: string;
          otp: string;
        }>(`activation:${token}`);

        if (!result) {
          throw new AuthenticationError('Invalid activation link');
        }

        // 2. Provjeri OTP
        const { userId, otp: otpFromRedis } = result;
        if (otp !== otpFromRedis) {
          throw new AuthenticationError('Invalid OTP');
        }

        // 3. Provjeri status
        const user = await this.getUserById(userId);
        if (user?.status === 'ACTIVE') return user;

        // 4. Update status → Prisma umjesto Drizzle
        try {
          const updated = await this.instrumentationService.startSpan(
            {
              name: 'UPDATE users SET status = $1 WHERE id = $2',
              op: 'db.query',
              attributes: { 'db.system': 'postgres' },
            },
            () =>
              prisma.user.update({
                where: { id: userId },
                data: { status: 'ACTIVE', emailVerified: true },
              }),
          );

          // 5. Obriši token iz Redisa
          await this.redisService.deleteToken(`activation:${token}`);

          return updated;
        } catch (err) {
          this.crashReporterService.report(err);
          throw err;
        }
      },
    );
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    return this.instrumentationService.startSpan(
      { name: 'UsersRepository > updatePassword' },
      async () => {
        try {
          const newHashedPassword = await this.instrumentationService.startSpan(
            { name: 'hash new password', op: 'function' },
            () => hash(newPassword),
          );

          await this.instrumentationService.startSpan(
            {
              name: 'UPDATE users SET password_hash = $1 WHERE id = $2',
              op: 'db.query',
              attributes: { 'db.system': 'postgres' },
            },
            () =>
              prisma.user.update({
                where: { id: userId },
                data: { passwordHash: newHashedPassword },
              }),
          );
        } catch (err) {
          this.crashReporterService.report(err);
          throw err;
        }
      },
    );
  }
}
