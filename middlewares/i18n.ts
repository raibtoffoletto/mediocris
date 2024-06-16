import { defaultLang, languages } from '@constants';
import { COOKIE as AUTH_COOKIE } from '@lib/auth';
import { NextResponse } from 'next/server';
import { Middleware } from './types';

export const COOKIE = `${AUTH_COOKIE}-lang`;

export default function middleware(next: Middleware): Middleware {
  return async (request, event, response) => {
    const isApi = /^\/api/i.test(request.nextUrl.pathname);

    const lang = request.cookies.get(COOKIE)?.value || defaultLang;

    if (!isApi && !request.nextUrl.pathname.startsWith(`/${lang}`)) {
      const nextLang = languages.find((l) =>
        request.nextUrl.pathname.startsWith(`/${l}`)
      );

      const redirect = !!nextLang
        ? request.nextUrl.pathname.replace(lang, nextLang)
        : `/${lang}${request.nextUrl.pathname}`;

      const _response = NextResponse.redirect(new URL(redirect, request.url));

      _response.cookies.set(COOKIE, nextLang || lang);

      return _response;
    }

    return next(request, event, response);
  };
}
