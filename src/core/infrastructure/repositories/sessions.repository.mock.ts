import { ISessionsRepository } from '@/core/application/repositories/sessions.repository.interface';
import { AppSession } from '@/core/entities/models/session';

export const MOCK_SESSION: AppSession = {
  id: 'test-session-id',
  userId: 'test-user-id',
  deviceName: 'test-token',
  createdAt: new Date(),
  lastUsedAt: new Date(),
  expiresAt: new Date(Date.now() + 1000 * 60 * 60),
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
  ipAddress: '192.168.1.1',
};

export class MockSessionsRepository implements ISessionsRepository {
  private _sessions: AppSession[] = [MOCK_SESSION];

  async getSessions(): Promise<AppSession[]> {
    return this._sessions;
  }

  async getSessionById(id: string): Promise<AppSession | undefined> {
    return this._sessions.find((s) => s.id === id);
  }

  async getSessionsUserSpecific(userId: string): Promise<AppSession[]> {
    return this._sessions.filter((s) => s.userId === userId);
  }
}
