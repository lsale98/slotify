import {
  AuthenticationError,
  UnauthenticatedError,
} from '@/core/entities/errors/auth';
import { getInjection } from '@/di/container';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE } from '../../../../config';

const getAllAppSessions = async (sessionId: string | undefined) => {
  const instrumentationService = getInjection('IInstrumentationService');
  return await instrumentationService.startSpan(
    {
      name: 'getAllAppSessions',
      op: 'function.nextjs',
    },
    async () => {
      try {
        const getSessionsController = getInjection('IGetSessionsController');
        return await getSessionsController(sessionId);
      } catch (err) {
        if (
          err instanceof UnauthenticatedError ||
          err instanceof AuthenticationError
        ) {
          redirect('/sign-in');
        }
        const crashReporterService = getInjection('ICrashReporterService');
        crashReporterService.report(err);
        throw err;
      }
    },
  );
};

const GetAllAppSessions = async () => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  const sessions = await getAllAppSessions(sessionId);

  if (sessions.length === 0) {
    return <div>No sessions</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      {sessions.map((session) => (
        <div key={session.id}>
          <p>{session.id}</p>
          <p>{session.userId}</p>
          <p>{session.createdAt.toDateString()}</p>
          <p>{session.lastUsedAt.toDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default GetAllAppSessions;
