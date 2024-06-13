import { Alert, AlertColor, Snackbar } from '@mui/material';
import { createRoot } from 'react-dom/client';
import wait from './wait';

const id = 'snack';

type SnackProps = {
  open: boolean;
  message: string;
  severity?: AlertColor;
  onClose: () => void;
};

const Snack = ({ open, message, severity, onClose }: SnackProps) => (
  <Snackbar open={open}>
    <Alert
      severity={severity}
      variant="filled"
      onClose={onClose}
      sx={{ '& .MuiAlert-message': { p: 0, lineHeight: '36px' } }}
    >
      {message}
    </Alert>
  </Snackbar>
);

export default async function snackbar(message = '', severity?: AlertColor) {
  const container = document.createElement('div');
  container.setAttribute('id', id);
  document.body.appendChild(container);

  const root = createRoot(container, { identifierPrefix: id });

  const _message = message.includes('<html') ? '' : message;

  await new Promise<void>((resolve) => {
    const timeout = setTimeout(resolve, 3333);

    root.render(
      <Snack
        open
        message={_message}
        severity={severity}
        onClose={() => {
          clearTimeout(timeout);

          resolve();
        }}
      />
    );
  });

  root.render(
    <Snack
      open={false}
      message={_message}
      severity={severity}
      onClose={() => undefined}
    />
  );

  await wait(333);

  root.unmount();
  document.body.removeChild(container);
}
