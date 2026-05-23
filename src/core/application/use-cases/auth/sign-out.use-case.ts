import { Cookie } from '@/core/entities/models/cookie';
import { IAuthenticationService } from '../../services/authentication.service.interface';
import { IInstrumentationService } from '../../services/instrumentation.service.interface';

export type ISignOutUseCase = ReturnType<typeof signOutUseCase>;

export const signOutUseCase =
  (
    instrumentationService: IInstrumentationService,
    authenticationService: IAuthenticationService,
  ) =>
  (sessionId: string): Promise<{ blankCookie: Cookie }> => {
    return instrumentationService.startSpan(
      { name: 'signOut Use Case', op: 'function' },
      async () => {
        return await authenticationService.invalidateSession(sessionId);
      },
    );
  };
