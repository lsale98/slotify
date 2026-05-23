import { Role } from '@/core/entities/models/user';
import { getInjection } from '@/di/container';
import { cache } from 'react';

export type SessionPayload = {
  valid: boolean;
  userId: string;
  role: Role;
};

export const validateSession = cache(
  async (sessionId: string): Promise<SessionPayload | null> => {
    try {
      const authenticationService = getInjection('IAuthenticationService');
      const response = await authenticationService.validateSession(sessionId);

      if (!response) return null;

      return {
        valid: true,
        userId: response.user.id,
        role: response.user.role,
      };
    } catch {
      return null;
    }
  },
);
