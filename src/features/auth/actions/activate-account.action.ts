'use server';

import { AuthenticationError } from '@/core/entities/errors/auth';
import { InputParseError } from '@/core/entities/errors/common';
import { Cookie } from '@/core/entities/models/cookie';
import { getInjection } from '@/di/container';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function activateAccount(
  _prevState: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  const instrumentationService = getInjection('IInstrumentationService');
  return await instrumentationService.instrumentServerAction(
    'activateAccount',
    { recordResponse: true },
    async () => {
      const token = formData.get('token')?.toString();
      const otp = formData.get('otp')?.toString();

      let sessionCookie: Cookie;
      try {
        const activateAccountController = getInjection(
          'IActivateAccountController',
        );
        sessionCookie = await activateAccountController({ token, otp });
      } catch (err) {
        if (err instanceof InputParseError) {
          return {
            error:
              'Invalid data. Make sure the Password and Confirm Password match.',
          };
        }
        if (err instanceof AuthenticationError) {
          return {
            error: err.message,
          };
        }
        const crashReporterService = getInjection('ICrashReporterService');
        crashReporterService.report(err);

        return {
          error:
            'An error happened. The developers have been notified. Please try again later. Message: ' +
            (err as Error).message,
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
