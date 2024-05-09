'use client';

import { lato } from '@lib/infrastructure/fonts';
import { createTheme } from '@mui/material/styles';

export const primaryColor = '#259358';

export const secondaryColor = '#932560';

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
