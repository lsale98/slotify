'use server';

import { getInjection } from '@/di/container';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '../../../../config';
import { Cookie } from '@/core/entities/models/cookie';
import { UnauthenticatedError } from '@/core/entities/errors/auth';
import { InputParseError } from '@/core/entities/errors/common';
import { redirect } from 'next/navigation';

export async function signOut() {
  const instrumentationService = getInjection('IInstrumentationService');
  return await instrumentationService.instrumentServerAction(
    'signOut',
    { recordResponse: true },
    async () => {
      const cookiesStore = await cookies();
      const sessionId = cookiesStore.get(SESSION_COOKIE)?.value;

      let blankCookie: Cookie;
      try {
        const signOutController = getInjection('ISignOutController');
        blankCookie = await signOutController(sessionId);
      } catch (err) {
        if (
          err instanceof UnauthenticatedError ||
          err instanceof InputParseError
        ) {
          redirect('/sign-in');
        }
        const crashReporterService = getInjection('ICrashReporterService');
        crashReporterService.report(err);
        throw err;
      }

      (await cookies()).set(
        blankCookie.name,
        blankCookie.value,
        blankCookie.attributes,
      );

      redirect('/sign-in');
    },
  );
}
