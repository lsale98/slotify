import { UnauthorizedError } from '@/core/entities/errors/auth';
import { IUsersRepository } from '../../repositories/users.repository.interface';
import { IInstrumentationService } from '../../services/instrumentation.service.interface';
import { IAuthenticationService } from '../../services/authentication.service.interface';
import { IResendService } from '../../services/resend.service.interface';

export type IForgotPasswordUseCase = ReturnType<typeof forgotPasswordUseCase>;

export const forgotPasswordUseCase = (
  instrumentationService: IInstrumentationService,
  authenticationService: IAuthenticationService,
  usersRepository: IUsersRepository,
  resendService: IResendService,
) => {
  return async (input: { email: string }): Promise<{ token: string }> => {
    return instrumentationService.startSpan(
      { name: 'forgotPassword Use Case', op: 'function' },
      async () => {
        const user = await usersRepository.getUserByEmail(input.email);

        if (!user) {
          throw new UnauthorizedError('Account does not exist');
        }

        const { token } = await authenticationService.storeResetPasswordToken(
          user.id,
        );

        await resendService.sendEmail(
          user.email,
          'Reset your password',
          `Use this link to reset your password: http://localhost:3000/reset-password?token=${token}`,
        );

        return { token };
      },
    );
  };
};
