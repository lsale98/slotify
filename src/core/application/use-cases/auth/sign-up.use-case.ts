import { Role, Status, User } from '@/core/entities/models/user';
import { IUsersRepository } from '../../repositories/users.repository.interface';
import { IAuthenticationService } from '../../services/authentication.service.interface';
import { IInstrumentationService } from '../../services/instrumentation.service.interface';
import { IResendService } from '../../services/resend.service.interface';
import { AuthenticationError } from '@/core/entities/errors/auth';

export type ISignUpUseCase = ReturnType<typeof signUpUseCase>;

export const signUpUseCase =
  (
    instrumentationService: IInstrumentationService,
    authenticationService: IAuthenticationService,
    usersRepository: IUsersRepository,
    resendService: IResendService,
  ) =>
  (input: {
    email: string;
    password: string;
    name: string;
    lastname: string;
    role: Role;
    status: Status;
    agreed_terms: boolean;
  }): Promise<{
    activationToken: { token: string; otp: string };
    user: Pick<User, 'id' | 'email' | 'role' | 'status'>;
  }> => {
    return instrumentationService.startSpan(
      { name: 'signUp Use Case', op: 'function' },
      async () => {
        const existingUser = await usersRepository.getUserByEmail(input.email);
        if (existingUser) {
          throw new AuthenticationError('Email taken');
        }

        const userId = authenticationService.generateUserId();

        const newUser = await usersRepository.createUser({
          id: userId,
          name: input.name,
          lastname: input.lastname,
          email: input.email,
          password: input.password,
          role: input.role,
          status: input.status,
          agreedTerms: input.agreed_terms,
        });

        const activationToken =
          await authenticationService.storeActivationToken(newUser.id);

        await resendService.sendEmail(
          newUser.email,
          'Activate your account',
          `OTP code: ${activationToken.otp}`,
        );

        return {
          activationToken,
          user: {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role,
            status: newUser.status,
          },
        };
      },
    );
  };
