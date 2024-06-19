import auth from '@middlewares/auth';
import factory from '@middlewares/factory';
import i18n from '@middlewares/i18n';

export default factory([i18n, auth]);

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|locales|favicon.ico|manifest.json|robots.txt|sw.js|.*\\.png$).*)',
  ],
};
