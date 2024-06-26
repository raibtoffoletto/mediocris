import { i18nNS } from '@constants';
import d from '@lib/dynamic';
import { useTranslation } from '@lib/i18n/server';
import { sedan } from '@lib/infrastructure/fonts';
import { metadata } from '@lib/infrastructure/metadata';
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import Menu from './Menu';

const px = d(1, 2);

export default async function Scaffold({
  children,
  params: { lang },
}: IParams<IParent>) {
  const t = await useTranslation(lang, i18nNS.App);

  return (
    <>
      <AppBar color="inherit">
        <Container
          maxWidth="md"
          sx={{
            px,
            py: 0.5,
            display: 'flex',
            gap: d(1, 4),
            alignItems: 'center',
            justifyContent: { xs: 'space-between', sm: 'flex-start' },
          }}
        >
          <Button href={`/${lang}`} sx={{ p: 0 }} LinkComponent={Link}>
            <Image
              alt="mediocris logo"
              src="/mediocris-256.png"
              width={64}
              height={64}
            />
          </Button>

          <Stack
            sx={{
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              alignItems: { xs: 'center', sm: 'flex-end' },
              gap: d(0, 2),
            }}
          >
            <Typography
              component="h1"
              sx={{
                ...sedan.style,
                letterSpacing: 2,
                lineHeight: 1,
                verticalAlign: 'baseline',
                fontSize: d('2.125rem', '3rem'),
              }}
            >
              {`${metadata.title}`}
            </Typography>

            <Typography
              component="h2"
              variant="body2"
              color="text.secondary"
              sx={{ pb: 0.25 }}
            >
              {t('description', `${metadata.description}`)}
            </Typography>
          </Stack>

          <Box sx={{ display: d('none', 'block'), flexGrow: 1 }} />

          <Menu />
        </Container>
      </AppBar>

      <Stack
        component="main"
        sx={{
          px,
          overflowX: 'hidden',
          maxWidth: 'md',
          width: '100%',
          flexGrow: 1,
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box sx={{ height: 80 }} />

        {children}
      </Stack>
    </>
  );
}
