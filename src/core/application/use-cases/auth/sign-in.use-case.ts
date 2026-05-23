import { IUsersRepository } from '../../repositories/users.repository.interface';
import { IAuthenticationService } from '../../services/authentication.service.interface';
import { IInstrumentationService } from '../../services/instrumentation.service.interface';
import { Cookie } from '@/core/entities/models/cookie';
import {
  AuthenticationError,
  UnauthorizedError,
} from '@/core/entities/errors/auth';
import { AppSession } from '@/core/entities/models/session';

export type ISignInUseCase = ReturnType<typeof signInUseCase>;

export const signInUseCase =
  (
    instrumentationService: IInstrumentationService,
    authenticationService: IAuthenticationService,
    usersRepository: IUsersRepository,
  ) =>
  (input: {
    email: string;
    password: string;
  }): Promise<{ session: AppSession; cookie: Cookie }> => {
    return instrumentationService.startSpan(
      { name: 'signIn Use Case', op: 'function' },
      async () => {
        const existingUser = await usersRepository.getUserByEmail(input.email);

        if (!existingUser) {
          throw new AuthenticationError('User does not exist');
        }
        if (existingUser.status !== 'ACTIVE') {
          throw new UnauthorizedError('Account is not active');
        }
        const validPassword = await authenticationService.validatePasswords(
          input.password,
          existingUser.passwordHash,
        );
        if (!validPassword) {
          throw new AuthenticationError('Incorrect email or password');
        }

        return await authenticationService.createSession(existingUser);
      },
    );
  };
