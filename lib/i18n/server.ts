import withLines from '@lib/withLines';
import initI18next from './init';

export async function useTranslation(lng?: string, ns?: string) {
  const i18n = await initI18next(lng, ns);

  return (key: string, defaultValue: string) =>
    withLines(i18n.getFixedT(lng ?? null, ns ?? null)(key, defaultValue));
}
