import { createModule } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '../types';
import { MockRedisService } from '@/core/infrastructure/services/redis.service.mock';
import { RedisService } from '@/core/infrastructure/services/redis.service';

export function createRedisModule() {
  const redisModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    redisModule.bind(DI_SYMBOLS.IRedisService).toClass(MockRedisService);
  } else {
    redisModule
      .bind(DI_SYMBOLS.IRedisService)
      .toClass(RedisService, [DI_SYMBOLS.IInstrumentationService]);
  }

  return redisModule;
}
