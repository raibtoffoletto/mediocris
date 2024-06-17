'use client';

import { URLParams, i18nNS } from '@constants';
import { useData } from '@contexts/DataStore';
import getActionQuery from '@lib/getActionQuery';
import { useTranslation } from '@lib/i18n/client';
import {
  Add as AddIcon,
  DeleteForever as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Actions({ params: { lang } }: IParams) {
  const [mounted, setMounted] = useState(false);
  const { selected, isLoading, deleteSelected, changeSelected } = useData();
  const router = useRouter();
  const t = useTranslation(lang, i18nNS.Main);

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
                tooltipTitle={t('actions.delete', 'Delete')}
                onClick={() => (!selected ? undefined : deleteSelected())}
                FabProps={{
                  disabled: !selected,
                }}
              />

              <SpeedDialAction
                icon={<EditIcon />}
                tooltipOpen
                tooltipTitle={t('actions.edit', 'Edit')}
                onClick={() =>
                  !selected
                    ? undefined
                    : router.push('?' + getActionQuery(URLParams.edit))
                }
                FabProps={{
                  disabled: !selected,
                }}
              />

              <SpeedDialAction
                icon={<AddIcon />}
                tooltipOpen
                tooltipTitle={t('actions.new', 'New')}
                onClick={() => {
                  changeSelected();

                  router.push('?' + getActionQuery(URLParams.add));
                }}
              />
            </SpeedDial>
          </Box>
        </Box>,
        document.body
      )
    : null;
}
