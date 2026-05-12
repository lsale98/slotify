import { IUsersRepository } from '@/core/application/repositories/users.repository.interface';
import { IAuthenticationService } from '@/core/application/services/authentication.service.interface';
import { ICrashReporterService } from '@/core/application/services/crash-reporter.service.interface';
import { IInstrumentationService } from '@/core/application/services/instrumentation.service.interface';
import { IRedisService } from '@/core/application/services/redis.interface';
import { IResendService } from '@/core/application/services/resend.service.interface';
import { ITransactionManagerService } from '@/core/application/services/transaction-manager.service.interface';
import { IActivateAccountUseCase } from '@/core/application/use-cases/auth/activate-account.use-case';
import { IForgotPasswordUseCase } from '@/core/application/use-cases/auth/forgot-password.use-case';
import { IResetPasswordUseCase } from '@/core/application/use-cases/auth/reset-password.use-case';
import { ISignInUseCase } from '@/core/application/use-cases/auth/sign-in.use-case';
import { ISignOutUseCase } from '@/core/application/use-cases/auth/sign-out.use-case';
import { ISignUpUseCase } from '@/core/application/use-cases/auth/sign-up.use-case';
import { IActivateAccountController } from '@/core/interface-adapters/controllers/auth/activate-account.controller';
import { IForgotPasswordController } from '@/core/interface-adapters/controllers/auth/forget-password.controller';
import { IResetPasswordController } from '@/core/interface-adapters/controllers/auth/reset-password.controller';
import { ISignInController } from '@/core/interface-adapters/controllers/auth/sign-in.controller';
import { ISignOutController } from '@/core/interface-adapters/controllers/auth/sign-out.controller';
import { ISignUpController } from '@/core/interface-adapters/controllers/auth/sign-up.controller';

export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for('IAuthenticationService'),
  ITransactionManagerService: Symbol.for('ITransactionManagerService'),
  IInstrumentationService: Symbol.for('IInstrumentationService'),
  ICrashReporterService: Symbol.for('ICrashReporterService'),
  IRedisService: Symbol.for('IRedisService'),
  IResendService: Symbol.for('IResendService'),

  // Repositories
  IUsersRepository: Symbol.for('IUsersRepository'),

  // Use Cases
  ISignInUseCase: Symbol.for('ISignInUseCase'),
  ISignOutUseCase: Symbol.for('ISignOutUseCase'),
  ISignUpUseCase: Symbol.for('ISignUpUseCase'),
  IActivateAccountUseCase: Symbol.for('IActivateAccountUseCase'),
  IForgotPasswordUseCase: Symbol.for('IForgotPasswordUseCase'),
  IResetPasswordUseCase: Symbol.for('IResetPasswordUseCase'),

  // Controllers
  ISignInController: Symbol.for('ISignInController'),
  ISignOutController: Symbol.for('ISignOutController'),
  ISignUpController: Symbol.for('ISignUpController'),
  IActivateAccountController: Symbol.for('IActivateAccountController'),
  IForgotPasswordController: Symbol.for('IForgotPasswordController'),
  IResetPasswordController: Symbol.for('IResetPasswordController'),
};

export interface DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService;
  ITransactionManagerService: ITransactionManagerService;
  IInstrumentationService: IInstrumentationService;
  ICrashReporterService: ICrashReporterService;
  IRedisService: IRedisService;
  IResendService: IResendService;

  // Repositories
  IUsersRepository: IUsersRepository;

  // Use Cases
  ISignInUseCase: ISignInUseCase;
  ISignUpUseCase: ISignUpUseCase;
  ISignOutUseCase: ISignOutUseCase;
  IActivateAccountUseCase: IActivateAccountUseCase;
  IForgotPasswordUseCase: IForgotPasswordUseCase;
  IResetPasswordUseCase: IResetPasswordUseCase;

  // Controllers
  ISignInController: ISignInController;
  ISignUpController: ISignUpController;
  ISignOutController: ISignOutController;
  IActivateAccountController: IActivateAccountController;
  IForgotPasswordController: IForgotPasswordController;
  IResetPasswordController: IResetPasswordController;
}
