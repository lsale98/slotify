import { ISessionsRepository } from '@/core/application/repositories/sessions.repository.interface';
import { ICrashReporterService } from '@/core/application/services/crash-reporter.service.interface';
import { IInstrumentationService } from '@/core/application/services/instrumentation.service.interface';
import { AppSession } from '@/core/entities/models/session';
import { prisma } from '@/lib/prisma';

export class SessionsRepository implements ISessionsRepository {
  constructor(
    private readonly instrumentationService: IInstrumentationService,
    private readonly crashReporterService: ICrashReporterService,
  ) {}

  async getSessions(): Promise<AppSession[]> {
    return this.instrumentationService.startSpan(
      { name: 'SessionsRepository > getSessions' },
      async () => {
        try {
          const sessions = await this.instrumentationService.startSpan(
            {
              name: 'SELECT * FROM sessions',
              op: 'db.query',
              attributes: { 'db.system': 'postgres' },
            },
            () => prisma.session.findMany(),
          );
          return sessions;
        } catch (err) {
          this.crashReporterService.report(err);
          throw err;
        }
      },
    );
  }

  async getSessionById(id: string): Promise<AppSession | undefined> {
    return this.instrumentationService.startSpan(
      { name: 'SessionsRepository > getSessionById' },
      async () => {
        try {
          const session = await this.instrumentationService.startSpan(
            {
              name: 'SELECT * FROM sessions WHERE id = $1',
              op: 'db.query',
              attributes: { 'db.system': 'postgres' },
            },
            () => prisma.session.findUnique({ where: { id } }),
          );
          return session ?? undefined;
        } catch (err) {
          this.crashReporterService.report(err);
          throw err;
        }
      },
    );
  }

  async getSessionsUserSpecific(userId: string): Promise<AppSession[]> {
    return this.instrumentationService.startSpan(
      { name: 'SessionsRepository > getSessionById' },
      async () => {
        try {
          const sessions = await this.instrumentationService.startSpan(
            {
              name: 'SELECT * FROM sessions WHERE user_id = $1',
              op: 'db.query',
              attributes: { 'db.system': 'postgres' },
            },
            () => prisma.session.findMany({ where: { userId } }),
          );
          return sessions ?? undefined;
        } catch (err) {
          this.crashReporterService.report(err);
          throw err;
        }
      },
    );
  }
}
