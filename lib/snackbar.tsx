import { Alert, AlertColor, Snackbar } from '@mui/material';
import { createRoot } from 'react-dom/client';
import wait from './wait';

const id = 'snack';

type SnackProps = {
  open: boolean;
  message: string;
  severity?: AlertColor;
};

const Snack = ({ open, message, severity }: SnackProps) => (
  <Snackbar open={open}>
    <Alert severity={severity} variant="filled">
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

  root.render(<Snack open message={_message} severity={severity} />);

  await wait(2666);

  root.render(<Snack open={false} message={_message} severity={severity} />);

  await wait(333);

  root.unmount();
  document.body.removeChild(container);
}
