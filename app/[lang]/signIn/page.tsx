'use client';

import { ApiRoutes, Input, i18nNS } from '@constants';
import { useTranslation } from '@lib/i18n/client';
import snackbar from '@lib/snackbar';
import useApi from '@lib/useApi';
import { Button, Stack, TextField } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

export default function SignIn({ params: { lang } }: IParams) {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<string>(Input.pass);
  const t = useTranslation(lang, i18nNS.App);

  const { callApi } = useApi();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);

      const data = new FormData(e.currentTarget);

      await callApi(ApiRoutes.auth, 'POST', {
        password: data.get('password'),
      });

      snackbar('Welcome!');
    } catch (e: any) {
      snackbar(e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      gap={4}
      flexGrow={1}
      component="form"
      alignItems="center"
      justifyContent="center"
      sx={{ width: '80vw', maxWidth: '320px' }}
      onSubmit={handleSignIn}
    >
      <Image
        alt="mediocris logo"
        src="/mediocris-256.png"
        width={128}
        height={128}
      />

      <TextField
        required
        fullWidth
        margin="dense"
        size="small"
        variant="outlined"
        label={t('sign_in.password', 'Password')}
        name="password"
        id="password"
        type={type}
        disabled={loading}
        InputProps={{
          sx: { pr: 0 },
          endAdornment: (
            <Button
              color="inherit"
              disabled={loading}
              sx={{
                p: 0,
                height: 40,
                borderRadius: 0,
                textTransform: 'none',
              }}
              onClick={() =>
                setType((t) => (t === Input.pass ? Input.text : Input.pass))
              }
            >
              {type === Input.pass
                ? t('sign_in.show', 'show')
                : t('sign_in.hide', 'hide')}
            </Button>
          ),
        }}
      />

      <Button type="submit" variant="outlined" disabled={loading}>
        {t('sign_in.button', 'Sign In')}
      </Button>
    </Stack>
  );
}
