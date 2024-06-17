import { Box, CircularProgress, Typography } from '@mui/material';

export default function PageTitle({
  dense,
  accent,
  isLoading,
  children,
}: PageTitleProps) {
  return (
    <>
      <Typography
        component="h3"
        variant="h3"
        sx={{
          width: 'fit-content',
          lineHeight: 1.75,
          fontWeight: 300,
          position: 'relative',
          fontSize: 'min(calc(2rem + 2vw), 3.5rem)',

          '&::after': {
            content: "''",
            display: 'block',
            width: '100%',
            height: '2px',
            borderRadius: '1px',
            backgroundColor: accent ?? 'primary.main',
            alignSelf: 'center',
          },
        }}
      >
        {children}

        {isLoading && (
          <CircularProgress
            size="32px"
            color="inherit"
            thickness={2}
            sx={{
              position: 'absolute',
              bottom: '-16px',
              left: 'calc(50% - 16px)',
            }}
          />
        )}
      </Typography>

      {!dense && <Box sx={{ pb: 2 }} />}
    </>
  );
}
