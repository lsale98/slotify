import { createModule } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '../types';
import { MockSessionsRepository } from '@/core/infrastructure/repositories/sessions.repository.mock';
import { SessionsRepository } from '@/core/infrastructure/repositories/sessions.repository';
import { getSessionsUseCase } from '@/core/application/use-cases/sessions/get-sessions.use-case';
import { getSessionsController } from '@/core/interface-adapters/controllers/sessions/get-sessions.controller';

export function createSessionsModule() {
  const sessionsModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    sessionsModule
      .bind(DI_SYMBOLS.ISessionsRepository)
      .toClass(MockSessionsRepository);
  } else {
    sessionsModule
      .bind(DI_SYMBOLS.ISessionsRepository)
      .toClass(SessionsRepository, [
        DI_SYMBOLS.IInstrumentationService,
        DI_SYMBOLS.ICrashReporterService,
      ]);
  }

  sessionsModule
    .bind(DI_SYMBOLS.IGetSessionsUseCase)
    .toHigherOrderFunction(getSessionsUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.ISessionsRepository,
    ]);

  sessionsModule
    .bind(DI_SYMBOLS.IGetSessionsController)
    .toHigherOrderFunction(getSessionsController, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthenticationService,
      DI_SYMBOLS.IGetSessionsUseCase,
    ]);

  return sessionsModule;
}
