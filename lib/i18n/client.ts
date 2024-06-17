'use client';

import I18nContext from '@contexts/I18nContext';
import withLines from '@lib/withLines';
import { useCallback, useContext } from 'react';

export function useTranslation(lng?: string, ns?: string) {
  const { i18n } = useContext(I18nContext);

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
