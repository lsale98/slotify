import { AppSession } from '@/core/entities/models/session';
import { IUsersRepository } from '../../repositories/users.repository.interface';
import { IAuthenticationService } from '../../services/authentication.service.interface';
import { IInstrumentationService } from '../../services/instrumentation.service.interface';
import { Cookie } from '@/core/entities/models/cookie';
import { UnauthorizedError } from '@/core/entities/errors/auth';

export type IResetPasswordUseCase = ReturnType<typeof resetPasswordUseCase>;

export const resetPasswordUseCase = (
  instrumentationService: IInstrumentationService,
  authenticationService: IAuthenticationService,
  usersRepository: IUsersRepository,
) => {
  return async (input: {
    token: string;
    password: string;
    confirmPassword: string;
  }): Promise<{ session: AppSession; cookie: Cookie }> => {
    return instrumentationService.startSpan(
      { name: 'resetPassword Use Case', op: 'function' },
      async () => {
        const result = await authenticationService.validateResetPasswordToken(
          input.token,
        );

        if (!result) {
          throw new UnauthorizedError('Invalid or expired reset token');
        }

        const { userId } = result;

        const user = await usersRepository.getUserById(userId);

        if (!user) {
          throw new UnauthorizedError('Account does not exist');
        }

        await usersRepository.updatePassword(user.id, input.password);

        const { session, cookie } =
          await authenticationService.createSession(user);

        return { session, cookie };
      },
    );
  };
};
