import { IRedisService } from '@/core/application/services/redis.interface';

export class MockRedisService implements IRedisService {
  private store: Record<string, string> = {};

  async setToken(key: string, value: string, ttl: number): Promise<void> {
    this.store[key] = value;
    setTimeout(() => delete this.store[key], ttl * 1000);
  }

  async getToken<T>(key: string): Promise<T | null> {
    return (this.store[key] as T) || null;
  }

  async deleteToken(key: string): Promise<void> {
    delete this.store[key];
  }
}
