'use client';

import PageTitle from '@components/PageTitle';
import { RowsPerPage } from '@constants';
import { useData } from '@contexts/DataStore';
import DataTable from '@components/DataTable';
import { TablePagination } from '@mui/material';
import Actions from '@components/Actions';

export default function Refuels() {
  const { isLoading, pageData, total, page, changePage } = useData();

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
    </>
  );
}
