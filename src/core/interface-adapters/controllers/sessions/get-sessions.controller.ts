import { IAuthenticationService } from '@/core/application/services/authentication.service.interface';
import { IInstrumentationService } from '@/core/application/services/instrumentation.service.interface';
import { IGetSessionsUseCase } from '@/core/application/use-cases/sessions/get-sessions.use-case';
import { UnauthenticatedError } from '@/core/entities/errors/auth';
import { Role } from '@/generated/prisma';

export type IGetSessionsController = ReturnType<typeof getSessionsController>;

export const getSessionsController =
  (
    instrumentationService: IInstrumentationService,
    authenticationService: IAuthenticationService,
    getSessionsUseCase: IGetSessionsUseCase,
  ) =>
  async (
    sessionId: string | undefined,
  ): Promise<ReturnType<typeof getSessionsUseCase>> => {
    return await instrumentationService.startSpan(
      { name: 'getSessions Controller' },
      async () => {
        if (!sessionId) {
          throw new UnauthenticatedError('Must be logged in to create a todo');
        }

        const session = await authenticationService.validateSession(sessionId);

        if (session.user.role !== Role.SUPERADMIN) {
          throw new UnauthenticatedError(
            'User does not have permission to access all sessions',
          );
        }

        return await getSessionsUseCase();
      },
    );
  };
