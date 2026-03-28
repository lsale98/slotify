import { createContainer } from '@evyweb/ioctopus';
import { createTransactionManagerModule } from './modules/database.module';
import { createAuthenticationModule } from './modules/authentication.module';
import { createUsersModule } from './modules/users.module';
import { DI_RETURN_TYPES, DI_SYMBOLS } from './types';
import { IInstrumentationService } from '@/core/application/services/instrumentation.service.interface';
import { createMonitoringModule } from './modules/monitoring.module';
import { createRedisModule } from './modules/redis.module';
import { createResendModule } from './modules/resend.module';

const ApplicationContainer = createContainer();

ApplicationContainer.load(Symbol('MonitoringModule'), createMonitoringModule());
ApplicationContainer.load(Symbol('RedisModule'), createRedisModule());
ApplicationContainer.load(
  Symbol('TransactionManagerModule'),
  createTransactionManagerModule(),
);
ApplicationContainer.load(
  Symbol('AuthenticationModule'),
  createAuthenticationModule(),
);
ApplicationContainer.load(Symbol('UsersModule'), createUsersModule());
ApplicationContainer.load(Symbol('ResendModule'), createResendModule());

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K,
): DI_RETURN_TYPES[K] {
  const instrumentationService =
    ApplicationContainer.get<IInstrumentationService>(
      DI_SYMBOLS.IInstrumentationService,
    );

  return instrumentationService.startSpan(
    {
      name: '(di) getInjection',
      op: 'function',
      attributes: { symbol: symbol.toString() },
    },
    () => ApplicationContainer.get<DI_RETURN_TYPES[K]>(DI_SYMBOLS[symbol]),
  );
}
