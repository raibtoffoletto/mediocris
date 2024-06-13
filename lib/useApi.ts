'use client';

import { Routes } from '@constants';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function useApi() {
  const { push } = useRouter();

  const callApi = useCallback(
    async (url: string, method?: string, payload?: Record<string, any>) => {
      const request = await fetch(url, {
        method,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      if (request.status === 308) {
        push(Routes.main);

        return;
      }

      if (request.status === 401) {
        push(Routes.signIn);

        return;
      }

      if (request.status >= 400) {
        throw new Error(await request.text());
      }

      return request;
    },
    []
  );

  const fetcher = useCallback(
    async (url: string) => {
      const request = await callApi(url);

      if (!!request) {
        return request.json();
      }

      return null;
    },
    [callApi]
  );

  return { callApi, fetcher };
}
