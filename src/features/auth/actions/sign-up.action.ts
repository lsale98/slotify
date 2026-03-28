'use server';

import { AuthenticationError } from '@/core/entities/errors/auth';
import { InputParseError } from '@/core/entities/errors/common';
import { getInjection } from '@/di/container';
import { redirect } from 'next/navigation';

export async function signUp(
  _prevState: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  const instrumentationService = getInjection('IInstrumentationService');
  return await instrumentationService.instrumentServerAction(
    'signUp',
    { recordResponse: true },
    async () => {
      const email = formData.get('email')?.toString();
      const name = formData.get('name')?.toString();
      const lastname = formData.get('lastname')?.toString();
      const password = formData.get('password')?.toString();
      const confirmPassword = formData.get('confirm_password')?.toString();

      let response;

      try {
        const signUpController = getInjection('ISignUpController');
        response = await signUpController({
          email,
          name,
          lastname,
          password,
          confirm_password: confirmPassword,
          role: 'USER',
          status: 'PENDING',
          agreed_terms: true,
        });
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

      redirect(`/activate?token=${response.activationToken.token}`);
    },
  );
}
