'use client';

import { primaryColor, secondaryColor } from '@constants';
import { lato } from '@lib/infrastructure/fonts';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: primaryColor,
    },

    secondary: {
      main: secondaryColor,
    },
  },

  typography: {
    fontFamily: lato.style.fontFamily,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollbehavior: 'smooth',
        },

        body: {
          border: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
        },
      },
    },
  },
});

export default theme;
