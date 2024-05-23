import { useData } from '@contexts/DataStore';
import { ubuntu } from '@lib/infrastructure/fonts';
import { CheckCircle as DoneIcon } from '@mui/icons-material';
import {
  CardActionArea,
  Checkbox,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Grow from '@mui/material/Grow';
import { Fragment } from 'react';

const getDateString = (date: RefuelDate) => {
  const _date = new Date(date.year, date.month, date.day);

  return `${new Intl.DateTimeFormat(undefined, {
    day: '2-digit',
  }).format(_date)} ${new Intl.DateTimeFormat(undefined, {
    month: 'short',
  })
    .format(_date)
    .toLowerCase()} ${date.year}`;
};

const getRowData = ({
  date,
  liters,
  odometer,
  price,
  economy,
  ...row
}: IEconomy<Refuel>) => ({
  ...row,
  date: getDateString(date),
  liters: `${liters.toFixed(2)} l`,
  odometer: `${odometer} km`,
  price: `${price.toFixed(3)} €`,
  economy: !!economy ? `${economy.toFixed(1)} km/l` : null,
});

const TC = ({ align, ...props }: TCProps) => (
  <TableCell {...props} sx={{ ...props?.sx, textAlign: align ?? 'left' }} />
);

const TR = (row: IEconomy<Refuel>) => {
  const { selected, changeSelected } = useData();
  const { id, date, banner, full, liters, odometer, price, economy } =
    getRowData(row);

  const isSelected = selected?.id === id;

  return (
    <TableRow className={full ? '' : 'partial'} selected={isSelected}>
      <TC>
        <Checkbox
          sx={{ p: 0 }}
          tabIndex={0}
          checked={isSelected}
          onChange={() => changeSelected(row)}
          aria-label={`select row for ${date}`}
        />
      </TC>

      <TC>{odometer}</TC>

      <TC>{banner}</TC>

      <TC>{date}</TC>

      <TC align="right">{price}</TC>

      <TC align="right">{liters}</TC>

      <TC align="right">{economy}</TC>
    </TableRow>
  );
};

const InfoCard = ({ shade, ...row }: InfoCardProps) => {
  const { selected, changeSelected } = useData();
  const { id, date, banner, economy, liters, odometer, price } =
    getRowData(row);

  return (
    <CardActionArea
      onClick={() => changeSelected(row)}
      sx={{ position: 'relative' }}
    >
      <Stack
        sx={{
          px: 2,
          py: 3,
          gap: 2,
          backgroundColor: ({ palette }) =>
            shade ? palette.action.hover : 'transparent',
        }}
      >
        <Stack
          direction="row"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <Stack gap={0.5}>
            <Typography
              component="p"
              variant="subtitle2"
              color="text.secondary"
              sx={{ lineHeight: 1.2 }}
            >
              {date}
            </Typography>

            <Typography
              component="p"
              variant="h5"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                lineHeight: 1,
              }}
            >
              {banner}
            </Typography>
          </Stack>

          <Typography
            component="p"
            sx={{
              ...ubuntu.style,
              lineHeight: 1.1,
              fontSize: '1.2rem',
              fontWeight: 700,
            }}
          >
            {economy}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignContent="flex-end"
          justifyContent="space-between"
        >
          <Typography>{price}</Typography>

          <Typography>{odometer}</Typography>

          <Typography>{liters}</Typography>
        </Stack>
      </Stack>

      <Grow in={selected?.id === id}>
        <DoneIcon
          color="success"
          sx={{ position: 'absolute', top: 16, right: 16 }}
        />
      </Grow>
    </CardActionArea>
  );
};

export default function DataTable({ data }: DataTableProps) {
  return (
    <>
      <Paper
        elevation={4}
        sx={{
          py: 0.5,
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'column',
          minWidth: '300px',
          width: 'calc(100% - 32px)',
        }}
      >
        {data.map((row, i, a) => (
          <Fragment key={row.id}>
            <InfoCard {...row} shade={i % 2 !== 0} />

            {i + 1 !== a.length && <Divider />}
          </Fragment>
        ))}
      </Paper>

      <TableContainer
        component={Paper}
        sx={{
          display: { xs: 'none', sm: 'block' },

          '& th, & td': {
            ...ubuntu.style,
            fontSize: '1rem',
            whiteSpace: 'nowrap',

            '&:first-of-type': { pl: 4 },
            '&:last-of-type': { pr: 4 },
          },

          '& tr.partial td': {
            color: 'grey.500',
            fontWeight: '700',
          },
        }}
      >
        <Table aria-label="refuels">
          <TableHead>
            <TableRow>
              <TC sx={{ width: '1%' }} />

              <TC>Odometer</TC>

              <TC>Banner</TC>

              <TC>Date</TC>

              <TC align="right">Price</TC>

              <TC align="right">Liters</TC>

              <TC align="right">Economy</TC>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row) => (
              <TR key={row.id} {...row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
