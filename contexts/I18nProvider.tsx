'use client';

import { i18nNS } from '@constants';
import initI18next from '@lib/i18n/init';
import { CircularProgress, Stack } from '@mui/material';
import type { i18n as I18N } from 'i18next';
import { useEffect, useState } from 'react';
import I18nContext from './I18nContext';

export default function I18nProvider({
  children,
  params: { lang },
}: IParams<IParent>) {
  const [i18n, setI18n] = useState<I18N | null>(null);

  useEffect(() => {
    async function init() {
      const instance = await initI18next(lang);

      for (const ns of Object.values(i18nNS)) {
        await instance.loadNamespaces(ns);
      }

      setI18n(instance);
    }

    init();
  }, [lang]);

  if (i18n === null) {
    return (
      <Stack flexGrow={1} justifyContent="center">
        <CircularProgress size={80} />
      </Stack>
    );
  }

  return (
    <I18nContext.Provider value={{ i18n }}>{children}</I18nContext.Provider>
  );
}
