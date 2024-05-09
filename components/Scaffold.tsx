import { Routes } from '@enums';
import { sedan } from '@lib/infrastructure/fonts';
import metadata from '@lib/infrastructure/metadata';
import { InsertChart as InsertChartIcon } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const d = (xs: number | string, sm: number | string) => ({ xs, sm });

const px = d(1, 2);

const icon = d(24, 32);

export default function Scaffold({ children }: IParent) {
  return (
    <>
      <AppBar color="inherit">
        <Container
          maxWidth="lg"
          sx={{
            px,
            py: 0.5,
            display: 'flex',
            gap: d(1, 4),
            alignItems: 'center',
            justifyContent: { xs: 'space-between', sm: 'flex-start' },
          }}
        >
          <Link href={Routes.main}>
            <Button sx={{ p: 0 }}>
              <Image
                alt="mediocris logo"
                src="/mediocris-256.png"
                width={64}
                height={64}
              />
            </Button>
          </Link>

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
            >{`${metadata.description}`}</Typography>
          </Stack>

          <Box sx={{ display: d('none', 'block'), flexGrow: 1 }} />

          <Link href={Routes.charts}>
            <IconButton color="secondary">
              <InsertChartIcon sx={{ width: icon, height: icon }} />
            </IconButton>
          </Link>
        </Container>
      </AppBar>

      <Stack
        component="main"
        sx={{
          px,
          pb: 4,
          overflowX: 'hidden',
          maxWidth: 'lg',
          width: '100%',
          flexGrow: 1,
          alignItems: 'center',
        }}
      >
        <Box sx={{ height: 80 }} />

        {children}
      </Stack>
    </>
  );
}
