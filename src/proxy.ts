import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@/lib/auth/validate-session';
import { SESSION_COOKIE } from '../config';
import { signClaims } from './lib/headerSigning';
import { roleRoutes } from './lib/routes';

const AUTH_ROUTES = [
  '/sign-in',
  '/sign-up',
  '/activate',
  '/forgot-password',
  '/reset-password',
];

const PUBLIC_ROUTES = ['/', '/not-found'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionId = request.cookies.get(SESSION_COOKIE)?.value;
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete('x-user-id');
  requestHeaders.delete('x-user-role');
  requestHeaders.delete('x-user-claims');

  if (isAuthRoute) {
    if (!sessionId) {
      return NextResponse.next({ request: { headers: requestHeaders } });
    }

    const session = await validateSession(sessionId);

    if (!session) {
      const response = NextResponse.next({
        request: { headers: requestHeaders },
      });
      response.cookies.delete(SESSION_COOKIE);
      return response;
    }

    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!sessionId) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const session = await validateSession(sessionId);

  if (!session) {
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    response.cookies.delete(SESSION_COOKIE);
    return response;
  }

  const isPublic = PUBLIC_ROUTES.some((r) =>
    r === '/' ? pathname === '/' : pathname.startsWith(r),
  );

  const allowedRoutes = roleRoutes[session.role] ?? [];
  const isAllowed = allowedRoutes.some((r) => pathname.startsWith(r.href));

  if (!isAllowed && !isPublic) {
    return NextResponse.rewrite(new URL('/not-found', request.url));
  }

  requestHeaders.set(
    'x-user-claims',
    signClaims({ userId: session.userId, role: session.role }),
  );

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
