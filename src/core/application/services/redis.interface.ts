export interface IRedisService {
  getToken<T>(key: string): Promise<T | null>;
  setToken(key: string, value: string, ttl: number): Promise<void>;
  deleteToken(key: string): Promise<void>;
}
