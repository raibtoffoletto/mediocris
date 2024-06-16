'use client';

import Actions from '@components/Actions';
import DataTable from '@components/DataTable';
import EntityModal from '@components/EntityModal';
import PageTitle from '@components/PageTitle';
import { RowsPerPage, URLParams } from '@constants';
import { useData } from '@contexts/DataStore';
import { TablePagination } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Refuels() {
  const {
    isLoading,
    pageData,
    total,
    page,
    selected,
    lastOdometer,
    lastPrice,
    changePage,
  } = useData();
  const searchParams = useSearchParams();
  const router = useRouter();
  const action = searchParams.get(URLParams.key);

  if (action === URLParams.edit && !selected) {
    router.push('?');
  }

  return (
    <>
      <PageTitle isLoading={isLoading}>Refuels</PageTitle>

      <DataTable data={pageData} />

      <TablePagination
        rowsPerPageOptions={[]}
        component="footer"
        count={total}
        rowsPerPage={RowsPerPage}
        page={page}
        onPageChange={changePage}
        sx={{
          '& > div': {
            px: 2,
            gap: { xs: 0.5, sm: 2 },
            flexDirection: { xs: 'column', sm: 'row' },
          },
          '& .MuiTablePagination-actions, & p': { m: 0 },
          '& .MuiTablePagination-spacer': { display: 'none' },
        }}
      />

      <Actions />

      {(action === URLParams.add || action === URLParams.edit) && (
        <EntityModal
          record={selected ?? { odometer: lastOdometer, price: lastPrice }}
        />
      )}
    </>
  );
}
