import { AppSession } from '@/core/entities/models/session';

export interface ISessionsRepository {
  getSessions(): Promise<AppSession[]>;
  getSessionsUserSpecific(userId: string): Promise<AppSession[]>;
  getSessionById(id: string): Promise<AppSession | undefined>;
}
