import { ApiRoutes, Routes } from '@constants';
import { COOKIE, validateCookie, validateToken } from '@lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { Middleware } from './types';

function isPublic(request: NextRequest, isAuthorized: boolean) {
  switch (true) {
    case request.method === 'POST' &&
      request.nextUrl.pathname === ApiRoutes.auth:
    case new RegExp(`/[^/]+${Routes.signIn}`).test(request.nextUrl.pathname) &&
      !isAuthorized:
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

export default function middleware(next: Middleware): Middleware {
  return async (request, event, response) => {
    const isAuthorized = await authorize(request);
    const isApi = /^\/api/i.test(request.nextUrl.pathname);

    if (isPublic(request, isAuthorized)) {
      return next(request, event, response);
    }

    if (isAuthorized) {
      if (request.nextUrl.pathname === Routes.signIn && !isApi) {
        return NextResponse.redirect(new URL(Routes.main, request.url));
      }

      return next(request, event, response);
    }

    if (isApi) {
      return new Response(null, { status: 401 });
    }

    return NextResponse.redirect(new URL(Routes.signIn, request.url));
  };
}
