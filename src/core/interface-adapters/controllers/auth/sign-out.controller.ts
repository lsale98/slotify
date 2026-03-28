import { IAuthenticationService } from '@/core/application/services/authentication.service.interface';
import { IInstrumentationService } from '@/core/application/services/instrumentation.service.interface';
import { ISignOutUseCase } from '@/core/application/use-cases/auth/sign-out.use-case';
import { InputParseError } from '@/core/entities/errors/common';
import { Cookie } from '@/core/entities/models/cookie';

export type ISignOutController = ReturnType<typeof signOutController>;

export const signOutController =
  (
    instrumentationService: IInstrumentationService,
    authenticationService: IAuthenticationService,
    signOutUseCase: ISignOutUseCase,
  ) =>
  async (sessionId: string | undefined): Promise<Cookie> => {
    return await instrumentationService.startSpan(
      { name: 'signOut Controller' },
      async () => {
        if (!sessionId) {
          throw new InputParseError('Must provide a session ID');
        }
        const { session } =
          await authenticationService.validateSession(sessionId);

        const { blankCookie } = await signOutUseCase(session.id);
        return blankCookie;
      },
    );
  };
