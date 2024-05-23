'use client';

import { URLParams } from '@constants';
import { useData } from '@contexts/DataStore';
import getActionQuery from '@lib/getActionQuery';
import {
  Add as AddIcon,
  DeleteForever as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Actions() {
  const [mounted, setMounted] = useState(false);
  const { selected, isLoading, deleteSelected } = useData();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  return mounted
    ? createPortal(
        <Box
          sx={{
            p: 2,
            bottom: 0,
            alignSelf: 'flex-end',
            position: 'sticky',
            zIndex: 1200,
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <SpeedDial
              ariaLabel="data actions"
              icon={<SpeedDialIcon />}
              sx={{ position: 'absolute', bottom: 0, right: 0 }}
              FabProps={{
                disabled: isLoading,
              }}
            >
              <SpeedDialAction
                icon={<DeleteIcon />}
                tooltipOpen
                tooltipTitle={'Delete'}
                onClick={deleteSelected}
                FabProps={{
                  disabled: !selected,
                }}
              />

              <SpeedDialAction
                icon={<EditIcon />}
                tooltipOpen
                tooltipTitle={'Edit'}
                onClick={() =>
                  router.push('?' + getActionQuery(URLParams.edit))
                }
                FabProps={{
                  disabled: !selected,
                }}
              />

              <SpeedDialAction
                icon={<AddIcon />}
                tooltipOpen
                tooltipTitle={'New'}
                onClick={() => router.push('?' + getActionQuery(URLParams.add))}
              />
            </SpeedDial>
          </Box>
        </Box>,
        document.body
      )
    : null;
}
