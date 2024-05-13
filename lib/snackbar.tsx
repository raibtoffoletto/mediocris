import { Alert, AlertColor, Snackbar } from '@mui/material';
import { createRoot } from 'react-dom/client';

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

const wait = (delay: number) => new Promise((res) => setTimeout(res, delay));

export default async function snackbar(message = '', severity?: AlertColor) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const root = createRoot(container, {
    identifierPrefix: 'snack',
  });

  root.render(<Snack open message={message} severity={severity} />);

  await wait(2666);

  root.render(<Snack open={false} message={message} severity={severity} />);

  await wait(333);

  root.unmount();
  document.body.removeChild(container);
}
