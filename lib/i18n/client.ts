'use client';

import withLines from '@lib/withLines';
import type { i18n as I18N } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import initI18next from './init';

export function useTranslation(lng?: string, ns?: string) {
  const [i18n, setI18n] = useState<I18N | null>(null);

  useEffect(() => {
    initI18next(lng, ns).then((instance) => {
      setI18n(instance);
    });
  }, [lng, ns]);

  return useCallback(
    (key: string, defaultValue: string) => {
      if (typeof window === 'undefined' || !i18n) {
        return withLines(defaultValue);
      }

      return withLines(
        i18n.getFixedT(lng ?? null, ns ?? null)(key, defaultValue)
      );
    },
    [i18n, lng, ns]
  );
}
