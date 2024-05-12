import { ubuntu } from '@lib/infrastructure/fonts';
import {
  CheckCircle as CheckCircleIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import type { TableCellProps } from '@mui/material';
import {
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

type TCProps = TableCellProps & { align?: React.CSSProperties['textAlign'] };

const TC = ({ align, ...props }: TCProps) => (
  <TableCell {...props} sx={{ ...props?.sx, textAlign: align ?? 'left' }} />
);

const TR = (row: IEconomy<Refuel>) => {
  const { date, banner, full, liters, odometer, price, economy } =
    getRowData(row);

  return (
    <TableRow
      sx={{
        '& td': {
          color: full ? 'text.primary' : 'grey.500',
          fontWeight: full ? '400' : '700',
        },
      }}
    >
      <TC>{date}</TC>

      <TC>{banner}</TC>

      <TC align="right">{odometer}</TC>

      <TC align="right">{liters}</TC>

      <TC align="right">{price}</TC>

      <TC align="right">{economy}</TC>
    </TableRow>
  );
};

const Card = ({ shade, ...row }: IEconomy<Refuel> & { shade: boolean }) => {
  const { date, banner, full, liters, odometer, price } = getRowData(row);

  return (
    <Stack
      sx={{
        px: 2,
        py: 3,
        gap: 2,
        backgroundColor: shade ? '#F6F6F6' : 'transparent',
      }}
    >
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
      >
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

          {full && (
            <VerifiedIcon
              sx={{ width: 16, height: 16, color: 'primary.dark' }}
            />
          )}
        </Typography>

        <Typography
          component="p"
          variant="subtitle2"
          color="text.secondary"
          sx={{ lineHeight: 1.2 }}
        >
          {date}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        alignContent="flex-end"
        justifyContent="space-between"
      >
        <Typography>{odometer}</Typography>

        <Typography>{liters}</Typography>

        <Typography>{price}</Typography>
      </Stack>
    </Stack>
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
          width: '300px',
        }}
      >
        {data.map((row, i, a) => (
          <Fragment key={row.id}>
            <Card {...row} shade={i % 2 !== 0} />

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
        }}
      >
        <Table aria-label="refuels">
          <TableHead>
            <TableRow>
              <TC>Date</TC>

              <TC>Banner</TC>

              <TC align="right">Odometer</TC>

              <TC align="right">Liters</TC>

              <TC align="right">Price</TC>

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
