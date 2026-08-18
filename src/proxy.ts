import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@/lib/auth/validate-session';
import { SESSION_COOKIE } from '../config';
import { signClaims } from './lib/headerSigning';
import { getSidebarRoutes, getDropdownRoutes } from './lib/routes';
import type { Role } from '@/core/entities/models/user';

const AUTH_ROUTES = [
  '/sign-in',
  '/sign-up',
  '/activate',
  '/forgot-password',
  '/reset-password',
] as const;

const PUBLIC_ROUTES = ['/', '/not-found'] as const;

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route));
}

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) =>
    route === '/' ? pathname === '/' : pathname.startsWith(route),
  );
}

function getAllowedHrefs(role: Role): string[] {
  const sections = [...getSidebarRoutes(role), ...getDropdownRoutes(role)];

  const hrefs = sections.flatMap((section) =>
    section.routes.map((r) => r.href),
  );

  return [...new Set(hrefs)];
}

function isAllowedRoute(pathname: string, role: Role): boolean {
  return getAllowedHrefs(role).some((href) => pathname.startsWith(href));
}

function sanitizeHeaders(headers: Headers): Headers {
  const clean = new Headers(headers);
  clean.delete('x-user-id');
  clean.delete('x-user-role');
  clean.delete('x-user-claims');
  return clean;
}

function redirectTo(path: string, request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL(path, request.url));
}

function rewriteTo(
  path: string,
  request: NextRequest,
  headers: Headers,
): NextResponse {
  return NextResponse.rewrite(new URL(path, request.url), {
    request: { headers },
  });
}

function nextWith(headers: Headers): NextResponse {
  return NextResponse.next({ request: { headers } });
}

function clearSessionCookie(response: NextResponse): NextResponse {
  response.cookies.delete(SESSION_COOKIE);
  return response;
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const sessionId = request.cookies.get(SESSION_COOKIE)?.value;
  const headers = sanitizeHeaders(request.headers);

  if (isAuthRoute(pathname)) {
    if (!sessionId) {
      return nextWith(headers);
    }

    const session = await validateSession(sessionId);

    if (!session) {
      return clearSessionCookie(nextWith(headers));
    }

    return redirectTo('/dashboard', request);
  }

  if (isPublicRoute(pathname)) {
    return nextWith(headers);
  }

  if (!sessionId) {
    return redirectTo('/sign-in', request);
  }

  const session = await validateSession(sessionId);

  if (!session) {
    return clearSessionCookie(redirectTo('/sign-in', request));
  }

  if (!isAllowedRoute(pathname, session.role)) {
    return rewriteTo('/not-found', request, headers);
  }

  headers.set(
    'x-user-claims',
    signClaims({ userId: session.userId, role: session.role }),
  );

  return nextWith(headers);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
