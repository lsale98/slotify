import { createModule } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '../types';
import { MockAuthenticationService } from '@/core/infrastructure/services/authentication.service.mock';
import { AuthenticationService } from '@/core/infrastructure/services/authentication.service';
import { signInUseCase } from '@/core/application/use-cases/auth/sign-in.use-case';
import { signInController } from '@/core/interface-adapters/controllers/auth/sign-in.controller';
import { signOutUseCase } from '@/core/application/use-cases/auth/sign-out.use-case';
import { signOutController } from '@/core/interface-adapters/controllers/auth/sign-out.controller';
import { signUpUseCase } from '@/core/application/use-cases/auth/sign-up.use-case';
import { signUpController } from '@/core/interface-adapters/controllers/auth/sign-up.controller';
import { activateAccountUseCase } from '@/core/application/use-cases/auth/activate-account.use-case';
import { activateAccountController } from '@/core/interface-adapters/controllers/auth/activate-account.controller';

export function createAuthenticationModule() {
  const authenticationModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    authenticationModule
      .bind(DI_SYMBOLS.IAuthenticationService)
      .toClass(MockAuthenticationService, [
        DI_SYMBOLS.IUsersRepository,
        DI_SYMBOLS.IRedisService,
      ]);
  } else {
    authenticationModule
      .bind(DI_SYMBOLS.IAuthenticationService)
      .toClass(AuthenticationService, [
        DI_SYMBOLS.IInstrumentationService,
        DI_SYMBOLS.IRedisService,
      ]);
  }

  authenticationModule
    .bind(DI_SYMBOLS.ISignInUseCase)
    .toHigherOrderFunction(signInUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthenticationService,
      DI_SYMBOLS.IUsersRepository,
    ]);

  authenticationModule
    .bind(DI_SYMBOLS.ISignUpUseCase)
    .toHigherOrderFunction(signUpUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthenticationService,
      DI_SYMBOLS.IUsersRepository,
      DI_SYMBOLS.IResendService,
    ]);

  authenticationModule
    .bind(DI_SYMBOLS.ISignOutUseCase)
    .toHigherOrderFunction(signOutUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthenticationService,
    ]);

  authenticationModule
    .bind(DI_SYMBOLS.IActivateAccountUseCase)
    .toHigherOrderFunction(activateAccountUseCase, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthenticationService,
      DI_SYMBOLS.IUsersRepository,
    ]);

  authenticationModule
    .bind(DI_SYMBOLS.ISignInController)
    .toHigherOrderFunction(signInController, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.ISignInUseCase,
    ]);

  authenticationModule
    .bind(DI_SYMBOLS.ISignUpController)
    .toHigherOrderFunction(signUpController, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.ISignUpUseCase,
    ]);

  authenticationModule
    .bind(DI_SYMBOLS.ISignOutController)
    .toHigherOrderFunction(signOutController, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IAuthenticationService,
      DI_SYMBOLS.ISignOutUseCase,
    ]);

  authenticationModule
    .bind(DI_SYMBOLS.IActivateAccountController)
    .toHigherOrderFunction(activateAccountController, [
      DI_SYMBOLS.IInstrumentationService,
      DI_SYMBOLS.IActivateAccountUseCase,
    ]);

  return authenticationModule;
}
