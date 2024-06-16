import { defaultLang, defaultNS, languages } from '@constants';

export default function getOptions(
  lng: string = defaultLang,
  ns: string = defaultNS
) {
  return {
    ns,
    lng,
    defaultNS,
    debug: true,
    fallbackLng: defaultLang,
    fallbackNS: defaultNS,
    supportedLngs: languages,
    preload: languages,
  };
}
