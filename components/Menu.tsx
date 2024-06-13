'use client';

import { ApiRoutes } from '@constants';
import d from '@lib/dynamic';
import useApi from '@lib/useApi';
import {
  InsertChart as InsertChartIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
} from '@mui/material';
import { useState } from 'react';

const icon = d(24, 32);

const MenuItem = ({ onClick, label, Icon }: MenuItemProps) => (
  <MuiMenuItem onClick={onClick}>
    <ListItemText sx={{ flexGrow: 1 }}>{label}</ListItemText>

    <ListItemIcon sx={{ minWidth: '0 !important' }}>{Icon}</ListItemIcon>
  </MuiMenuItem>
);

export default function Menu() {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const { callApi } = useApi();

  const handleClose = () => {
    setAnchor(null);
  };

  const signOut = async () => {
    handleClose();

    await callApi(ApiRoutes.auth, 'DELETE');
  };

  const items: MenuItemProps[] = [
    {
      label: 'Charts',
      onClick: () => undefined,
      Icon: <InsertChartIcon />,
    },
    {
      label: 'Sign out',
      onClick: signOut,
      Icon: <LogoutIcon fontSize="small" />,
    },
  ];

  return (
    <>
      <IconButton id="app-menu" onClick={(e) => setAnchor(e.currentTarget)}>
        <MenuIcon sx={{ width: icon, height: icon }} />
      </IconButton>

      <MuiMenu
        id="app-menu-dialog"
        anchorEl={anchor}
        open={!!anchor}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx: { minWidth: 128 },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {items.map((i) => (
          <MenuItem key={i.label} {...i} />
        ))}
      </MuiMenu>
    </>
  );
}
