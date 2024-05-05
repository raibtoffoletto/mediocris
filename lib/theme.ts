'use client';

import { createTheme } from '@mui/material/styles';
import { Lato } from 'next/font/google';

const lato = Lato({
  display: 'swap',
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
});

const theme = createTheme({
  typography: {
    fontFamily: lato.style.fontFamily,
  },
});

export default theme;
