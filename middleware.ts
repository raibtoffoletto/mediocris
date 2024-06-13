import { ApiRoutes, Routes } from '@constants';
import { COOKIE, validateCookie, validateToken } from '@lib/auth';
import { NextRequest, NextResponse } from 'next/server';

function isPublic(request: NextRequest, isAuthorized: boolean) {
  switch (true) {
    case request.method === 'POST' &&
      request.nextUrl.pathname === ApiRoutes.auth:
    case request.nextUrl.pathname === Routes.signIn && !isAuthorized:
      return true;

    default:
      return false;
  }
}

async function authorize(request: NextRequest) {
  const { value: cookie } = request.cookies.get(COOKIE) || {};

  const header = `${request.headers.get('Authorization') || ''}`;
  const [_, prefix, token] = header.match(/^(bearer\s)(.*)$/i) || [];

  if (
    (cookie && (await validateCookie(cookie))) ||
    (!!prefix && !!token && (await validateToken(token)))
  ) {
    return true;
  }

  return false;
}

export default async function middleware(request: NextRequest) {
  const isAuthorized = await authorize(request);
  const isApi = /^\/api/i.test(request.nextUrl.pathname);

  console.log({ isAuthorized, isApi, req: request.url });

  if (isPublic(request, isAuthorized)) {
    return NextResponse.next();
  }

  if (isAuthorized) {
    if (request.nextUrl.pathname === Routes.signIn && !isApi) {
      return NextResponse.redirect(new URL(Routes.main, request.url));
    }

    return NextResponse.next();
  }

  if (isApi) {
    return new Response(null, { status: 401 });
  }

  return NextResponse.redirect(new URL(Routes.signIn, request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
