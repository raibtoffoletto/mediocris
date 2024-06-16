import { Routes, i18nNS, languages } from '@constants';
import { useTranslation } from '@lib/i18n/server';
import { sedan } from '@lib/infrastructure/fonts';
import { Link, Stack, Typography } from '@mui/material';
import NextLink from 'next/link';

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function NotFoundCatchAll({ params: { lang } }: IParams) {
  const t = await useTranslation(lang, i18nNS.App);

  return (
    <Stack gap={4} flexGrow={1} justifyContent="center">
      <Typography pt={4} component="p" variant="h1" align="center">
        🧐
      </Typography>

      <Typography component="h3" variant="h2" align="center" {...sedan.style}>
        {t('not_found.title', 'Oops!')}
      </Typography>

      <Typography
        component="p"
        variant="h6"
        align="center"
        maxWidth={280}
        fontWeight={300}
        color="text.secondary"
      >
        {t(
          'not_found.message',
          'The page you are looking for is far out of our mediocrity.'
        )}
      </Typography>

      <Link
        href={Routes.main}
        component={NextLink}
        underline="hover"
        textAlign="center"
      >
        {t('not_found.link', 'go back')}
      </Link>
    </Stack>
  );
}
