import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { createRoot } from 'react-dom/client';
import wait from './wait';

const id = 'alert';

type AlertDialogArgs =
  | {
      title: string;
      message?: string;
    }
  | {
      title?: string;
      message: string;
    };

type AlertDialogProps = AlertDialogArgs & {
  open: boolean;
  resolve?: (val: boolean) => void;
};

const AlertDialog = ({ open, message, title, resolve }: AlertDialogProps) => (
  <Dialog
    open={open}
    aria-labelledby={!!title ? 'alert-dialog-title' : ''}
    aria-describedby={!!message ? 'alert-dialog-message' : ''}
  >
    {!!title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}

    {!!message && (
      <DialogContent>
        <DialogContentText id="alert-dialog-message">
          {message}
        </DialogContentText>
      </DialogContent>
    )}

    <DialogActions>
      <Button onClick={() => resolve?.(false)}>Cancel</Button>

      <Button onClick={() => resolve?.(true)} autoFocus>
        Ok
      </Button>
    </DialogActions>
  </Dialog>
);

export default async function alertDialog(args: AlertDialogArgs) {
  const container = document.createElement('div');
  container.setAttribute('id', id);
  document.body.appendChild(container);

  const root = createRoot(container, { identifierPrefix: id });

  const result = await new Promise((resolve) => {
    root.render(<AlertDialog {...{ open: true, resolve, ...args }} />);
  });

  root.render(<AlertDialog {...{ open: false, ...args }} />);

  await wait(333);

  root.unmount();
  document.body.removeChild(container);

  return result;
}
