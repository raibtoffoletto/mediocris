import { ApiRoutes } from '@constants';
import { fetcher } from '@lib/api';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';

function mapFromDate(date: Date): RefuelDate {
  return {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
}

function mapToDate(date: RefuelDate): Date {
  return new Date(date.year, date.month, date.day);
}

function getState({ record }: RefuelFormProps): Refuel {
  return {
    banner: record?.banner ?? '',
    full: record?.full ?? false,
    date: record?.date ?? mapFromDate(new Date()),
    id: record?.id ?? 0,
    liters: record?.liters ?? 0,
    odometer: record?.odometer ?? 0,
    price: record?.price ?? 0,
  };
}

export default function RefuelForm(props: RefuelFormProps) {
  const [{ ...all }, setRecord] = useState<Refuel>(getState(props));
  const fullScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
  const router = useRouter();

  const handleClose = () => router.push('?');

  const { data, isLoading } = useSWR<string[]>(ApiRoutes.banners, fetcher);

  console.debug(data);
  return (
    <Dialog
      open
      onClose={handleClose}
      fullScreen={fullScreen}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();

          handleClose();
        },
      }}
    >
      <DialogTitle>
        {`${!!props.record ? 'Edit' : 'Add new'} record`}
      </DialogTitle>

      <DialogContent>
        <Autocomplete
          freeSolo
          clearOnEscape
          id="banner"
          options={data ?? []}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              fullWidth
              label="Banner"
              margin="dense"
              variant="standard"
            />
          )}
        />
        {/*
        <TextField
          autoFocus
          id="name"
          name="email"
          label="Email Address"
          type="email"
          required
          fullWidth
          margin="dense"
          variant="standard"
        /> */}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>

        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
