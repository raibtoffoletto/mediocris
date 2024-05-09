import { sedan } from '@lib/infrastructure/fonts';
import { Stack, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <Stack gap={4}>
      <Typography pt={4} component="p" variant="h1" align="center">
        🧐
      </Typography>

      <Typography component="h3" variant="h2" align="center" {...sedan.style}>
        Oops!
      </Typography>

      <Typography
        component="p"
        variant="h6"
        align="center"
        maxWidth={280}
        fontWeight={300}
        color="text.secondary"
      >
        The page you are looking for is far out of our mediocrity.
      </Typography>
    </Stack>
  );
}
