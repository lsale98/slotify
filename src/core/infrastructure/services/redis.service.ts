import { IInstrumentationService } from '@/core/application/services/instrumentation.service.interface';
import { IRedisService } from '@/core/application/services/redis.interface';

import { Redis } from '@upstash/redis';

export class RedisService implements IRedisService {
  private redis: Redis;

  constructor(
    private readonly _instrumentationService: IInstrumentationService,
  ) {
    this.redis = Redis.fromEnv();
  }

  async setToken(key: string, value: string, ttl: number): Promise<void> {
    return this._instrumentationService.startSpan(
      { name: 'RedisService > setToken', op: 'function' },
      async () => {
        await this.redis.set(key, value, { ex: ttl });
      },
    );
  }

  async getToken<T>(key: string): Promise<T | null> {
    return this._instrumentationService.startSpan(
      { name: 'RedisService > getToken', op: 'function' },
      async () => {
        return await this.redis.get<T>(key);
      },
    );
  }

  async deleteToken(key: string): Promise<void> {
    return this._instrumentationService.startSpan(
      { name: 'RedisService > deleteToken' },
      async () => {
        await this.redis.del(key);
      },
    );
  }
}
