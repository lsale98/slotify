'use server';

import {
  AuthenticationError,
  UnauthorizedError,
} from '@/core/entities/errors/auth';
import { InputParseError } from '@/core/entities/errors/common';
import { getInjection } from '@/di/container';

export async function forgotPassword(
  _prevState: { error?: string; success?: boolean },
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const instrumentationService = getInjection('IInstrumentationService');
  return await instrumentationService.instrumentServerAction(
    'forgotPassword',
    { recordResponse: true },
    async () => {
      const email = formData.get('email')?.toString();

      try {
        const forgotPasswordController = getInjection(
          'IForgotPasswordController',
        );
        await forgotPasswordController({ email });
        return {
          success: true,
        };
      } catch (err) {
        if (
          err instanceof InputParseError ||
          err instanceof AuthenticationError
        ) {
          return {
            error: 'Incorrect email',
          };
        }
        if (err instanceof UnauthorizedError) {
          return {
            error:
              'Account is not active. Please use link that you get in email after registration',
          };
        }
        const crashReporterService = getInjection('ICrashReporterService');
        crashReporterService.report(err);
        return {
          error:
            'An error happened. The developers have been notified. Please try again later.',
        };
      }
    },
  );
}
