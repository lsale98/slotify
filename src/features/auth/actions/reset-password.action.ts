'use server';

import { UnauthorizedError } from '@/core/entities/errors/auth';
import { InputParseError } from '@/core/entities/errors/common';
import { Cookie } from '@/core/entities/models/cookie';
import { getInjection } from '@/di/container';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function resetPassword(
  _prevState: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  const instrumentationService = getInjection('IInstrumentationService');
  return await instrumentationService.instrumentServerAction(
    'resetPassword',
    { recordResponse: true },
    async () => {
      const token = formData.get('token')?.toString();
      const password = formData.get('password')?.toString();
      const confirm_password = formData.get('confirm_password')?.toString();

      let sessionCookie: Cookie;
      try {
        const resetPasswordController = getInjection(
          'IResetPasswordController',
        );
        sessionCookie = await resetPasswordController({
          token,
          password,
          confirm_password,
        });
      } catch (err) {
        if (err instanceof InputParseError) {
          return {
            error: 'Invalid input. Please check your passwords and try again.',
          };
        }
        if (err instanceof UnauthorizedError) {
          return {
            error:
              'Invalid or expired reset token. Please request a new password reset.',
          };
        }
        const crashReporterService = getInjection('ICrashReporterService');
        crashReporterService.report(err);
        return {
          error:
            'An error happened. The developers have been notified. Please try again later.',
        };
      }

      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      redirect('/dashboard');
    },
  );
}
