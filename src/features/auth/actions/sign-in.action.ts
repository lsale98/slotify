'use server';

import {
  AuthenticationError,
  UnauthorizedError,
} from '@/core/entities/errors/auth';
import { InputParseError } from '@/core/entities/errors/common';
import { Cookie } from '@/core/entities/models/cookie';
import { getInjection } from '@/di/container';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signIn(
  _prevState: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  const instrumentationService = getInjection('IInstrumentationService');
  return await instrumentationService.instrumentServerAction(
    'signIn',
    { recordResponse: true },
    async () => {
      const email = formData.get('email')?.toString();
      const password = formData.get('password')?.toString();

      let sessionCookie: Cookie;
      try {
        const signInController = getInjection('ISignInController');
        sessionCookie = await signInController({ email, password });
      } catch (err) {
        if (
          err instanceof InputParseError ||
          err instanceof AuthenticationError
        ) {
          return {
            error: 'Incorrect email or password',
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

      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      redirect('/dashboard');
    },
  );
}
