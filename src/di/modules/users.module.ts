import { createModule } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '../types';
import { MockUsersRepository } from '@/core/infrastructure/repositories/users.repository.mock';
import { UsersRepository } from '@/core/infrastructure/repositories/users.resporitory';

export function createUsersModule() {
  const usersModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    usersModule.bind(DI_SYMBOLS.IUsersRepository).toClass(MockUsersRepository);
  } else {
    usersModule
      .bind(DI_SYMBOLS.IUsersRepository)
      .toClass(UsersRepository, [
        DI_SYMBOLS.IInstrumentationService,
        DI_SYMBOLS.ICrashReporterService,
        DI_SYMBOLS.IRedisService,
      ]);
  }

  return usersModule;
}
