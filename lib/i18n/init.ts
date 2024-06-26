import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import getOptions from './options';

export default async function initI18next(lng?: string, ns?: string) {
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (_lng: string, _ns: string) =>
          import(`../../public/locales/${_lng}/${_ns}.json`)
      )
    )
    .init(getOptions(lng, ns));

  return i18nInstance;
}
