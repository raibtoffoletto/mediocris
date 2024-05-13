'use client';

import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  DeleteForever as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useData } from '@contexts/DataStore';

export default function Actions() {
  const { selected, isLoading, deleteSelected } = useData();
  const [mounted, setMounted] = useState(false);

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
                FabProps={{
                  disabled: !selected,
                }}
              />

              <SpeedDialAction
                icon={<AddIcon />}
                tooltipOpen
                tooltipTitle={'New'}
              />
            </SpeedDial>
          </Box>
        </Box>,
        document.body
      )
    : null;
}
