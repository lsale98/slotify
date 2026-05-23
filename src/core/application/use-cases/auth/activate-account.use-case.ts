import { AppSession } from '@/core/entities/models/session';
import { IUsersRepository } from '../../repositories/users.repository.interface';
import { IAuthenticationService } from '../../services/authentication.service.interface';
import { IInstrumentationService } from '../../services/instrumentation.service.interface';
import { Cookie } from '@/core/entities/models/cookie';
import { UnauthorizedError } from '@/core/entities/errors/auth';

export type IActivateAccountUseCase = ReturnType<typeof activateAccountUseCase>;

export const activateAccountUseCase = (
  instrumentationService: IInstrumentationService,
  authenticationService: IAuthenticationService,
  usersRepository: IUsersRepository,
) => {
  return async (input: {
    token: string;
    otp: string;
  }): Promise<{
    session: AppSession;
    cookie: Cookie;
  }> => {
    return instrumentationService.startSpan(
      { name: 'activateAccount Use Case', op: 'function' },
      async () => {
        const user = await usersRepository.activateUserAccount(
          input.token,
          input.otp,
        );

        if (!user) {
          throw new UnauthorizedError('Account activation failed');
        }

        return await authenticationService.createSession(user);
      },
    );
  };
};
