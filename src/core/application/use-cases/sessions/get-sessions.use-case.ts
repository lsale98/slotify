import { AppSession } from '@/core/entities/models/session';
import { ISessionsRepository } from '../../repositories/sessions.repository.interface';
import { IInstrumentationService } from '../../services/instrumentation.service.interface';
import { IAuthenticationService } from '../../services/authentication.service.interface';
import { Role } from '@/generated/prisma';

export type IGetSessionsUseCase = ReturnType<typeof getSessionsUseCase>;

export const getSessionsUseCase = (
  instrumentationService: IInstrumentationService,
  sessionsRepository: ISessionsRepository,
) => {
  return async (): Promise<AppSession[]> => {
    return instrumentationService.startSpan(
      { name: 'getSessions Use Case', op: 'function' },
      async () => {
        // const result = await authenticationService.validateSession(
        // sessionId,
        // );
        // if (!result) {
        //   throw new Error('Invalid session');
        // }

        // if (result.user.status !== 'ACTIVE') {
        //   throw new Error('User account is not active');
        // }

        // if (result.user.role !== Role.SUPERADMIN) {
        //   throw new Error('User does not have permission to access sessions');
        // }
        return await sessionsRepository.getSessions();
      },
    );
  };
};
