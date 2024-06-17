'use client';

import { ApiRoutes, i18nNS } from '@constants';
import { useData } from '@contexts/DataStore';
import alertDialog from '@lib/alert';
import { useTranslation } from '@lib/i18n/client';
import useApi from '@lib/useApi';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  InputAdornment,
  Switch,
  TextField,
  TextFieldProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en-gb';
import { useRouter } from 'next/navigation';
import { useMemo, useRef } from 'react';
import useSWR from 'swr';

type BasicFieldProps = TextFieldProps & { step?: number; unity?: string };

const BasicField = ({ step, unity, ...props }: BasicFieldProps) => (
  <TextField
    required
    fullWidth
    margin="normal"
    variant="standard"
    {...(props?.type === 'number' ? { inputProps: { step, min: 0 } } : {})}
    InputProps={
      !!unity
        ? {
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ minWidth: 24 }}
              >{`${unity}`}</InputAdornment>
            ),
          }
        : undefined
    }
    {...props}
  />
);

function mapFromDate(date: Dayjs): RefuelDate {
  return {
    day: date.date(),
    month: date.month(),
    year: date.year(),
  };
}

function mapToDate(date: RefuelDate): Dayjs {
  return dayjs(new Date(date.year, date.month, date.day));
}

function getRefuel(record?: Partial<Refuel>): Refuel {
  return {
    banner: record?.banner ?? '',
    full: record?.full ?? false,
    date: record?.date ?? mapFromDate(dayjs(new Date())),
    id: record?.id ?? 0,
    liters: record?.liters ?? 0,
    odometer: record?.odometer ?? 0,
    price: record?.price ?? 0,
  };
}

function parseForm(data: FormData, id: number): Refuel {
  const _stringDate = `${data.get('date')}`.split('/');
  const _date = new Date(
    `${_stringDate[2]}-${_stringDate[1]}-${_stringDate[0]}`
  );

  return {
    id,
    banner: String(data.get('banner')),
    full: Boolean(data.get('full')),
    date: mapFromDate(dayjs(_date)),
    liters: Number(data.get('liters')),
    odometer: Number(data.get('odometer')),
    price: Number(data.get('price')),
  };
}

function isEqual(
  { banner, date, full, liters, odometer, price }: Omit<Refuel, 'id'>,
  data?: HTMLFormElement
) {
  const form = parseForm(new FormData(data), 0);

  return (
    banner === form.banner &&
    date.year === form.date.year &&
    date.month === form.date.month &&
    date.day === form.date.day &&
    full === form.full &&
    liters === form.liters &&
    odometer === form.odometer &&
    price === form.price
  );
}

export default function RefuelForm({
  params: { lang },
  record,
}: IParams<RefuelFormProps>) {
  const t = useTranslation(lang, i18nNS.Main);
  const formRef = useRef();
  const fullScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
  const router = useRouter();
  const { saveRecord } = useData();

  const { fetcher } = useApi();

  const { data: existingBanners, isLoading } = useSWR<string[]>(
    ApiRoutes.banners,
    fetcher
  );

  const { id, banner, date, full, liters, odometer, price } = useMemo(
    () => getRefuel(record),
    [record]
  );

  const handleClose = async (skip?: boolean) => {
    const equal = isEqual(
      { banner, date, full, liters, odometer, price },
      formRef.current
    );

    if (!(skip ?? equal)) {
      if (
        !(await alertDialog({
          message: `${t('modal.alert', 'You will loose any changes made.')}`,
        }))
      ) {
        return;
      }
    }

    router.push('?');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const equal = isEqual(
      { banner, date, full, liters, odometer, price },
      formRef.current
    );

    if (!equal) {
      saveRecord(parseForm(new FormData(e.currentTarget), id));
    }

    handleClose(true);
  };

  return (
    <Dialog
      open
      onClose={() => handleClose()}
      fullScreen={fullScreen}
      PaperProps={{
        ref: formRef,
        component: 'form',
        onSubmit: handleSubmit,
        sx: { maxWidth: 400 },
      }}
    >
      <DialogTitle>
        {!!record?.banner
          ? t('modal.title_edit', 'Edit')
          : t('modal.title_new', 'Add')}
      </DialogTitle>

      <DialogContent sx={{ pb: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DatePicker
            name="date"
            label={t('table.date', 'Date')}
            defaultValue={mapToDate(date)}
            slotProps={{
              textField: {
                required: true,
                fullWidth: true,
                margin: 'normal',
                variant: 'standard',
                InputProps: { readOnly: true },
              },
            }}
          />
        </LocalizationProvider>

        <Autocomplete
          freeSolo
          clearOnEscape
          id="banner"
          disabled={isLoading}
          options={existingBanners ?? []}
          value={banner}
          renderInput={(params) => (
            <BasicField
              {...params}
              id="banner"
              name="banner"
              label={t('table.banner', 'Banner')}
            />
          )}
        />

        <BasicField
          id="liters"
          name="liters"
          label={t('table.liters', 'Liters')}
          type="number"
          defaultValue={liters || ''}
          step={0.01}
          unity="L"
        />

        <BasicField
          id="price"
          name="price"
          label={t('table.price', 'Price')}
          type="number"
          defaultValue={price || ''}
          step={0.001}
          unity="€"
        />

        <BasicField
          id="odometer"
          name="odometer"
          label={t('table.odometer', 'Odometer')}
          type="number"
          defaultValue={odometer || ''}
          unity="km"
        />

        <FormControlLabel
          id="full"
          name="full"
          label={t('modal.full_tank', 'Full tank')}
          labelPlacement="start"
          control={<Switch defaultChecked={full} />}
          sx={{ mt: 2, mx: 0, width: '100%' }}
        />
      </DialogContent>

      <DialogActions sx={{ py: 2, px: 3, gap: 1 }}>
        <Button
          onClick={() => handleClose()}
          variant="outlined"
          color="inherit"
        >
          {t('modal.cancel', 'Cancel')}
        </Button>

        <Button type="submit" variant="contained">
          {t('modal.save', 'Save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
