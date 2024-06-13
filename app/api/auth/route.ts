import { Routes } from '@constants';
import { withError } from '@lib/api';
import { COOKIE, authorize } from '@lib/auth';
import { cookies } from 'next/headers';

export const POST = withError(async (request) => {
  const { password, api } = await request.json();

  if (!password) {
    throw new Error('A password must be provide');
  }

  const { jwt, cookie, details } = await authorize(password);

  if (typeof api === 'boolean' && api) {
    return Response.json({ ...details, token: `Bearer ${jwt}` });
  }

  cookies().set({
    name: COOKIE,
    value: cookie,
    expires: details.exp,
    httpOnly: true,
    secure: true,
    path: Routes.main,
  });

  return new Response(null, { status: 308 });
});

export const DELETE = withError(async () => {
  cookies().delete(COOKIE);

  return new Response(null, { status: 401 });
});
