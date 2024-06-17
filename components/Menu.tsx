'use client';

import { ApiRoutes, i18nNS, languageLabel, languages } from '@constants';
import d from '@lib/dynamic';
import { useTranslation } from '@lib/i18n/client';
import useApi from '@lib/useApi';
import {
  InsertChart as InsertChartIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Translate as TranslateIcon,
} from '@mui/icons-material';
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
} from '@mui/material';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const icon = d(24, 32);

const MenuItem = ({
  onClick,
  label,
  disabled,
  Icon,
  dense,
  selected,
}: MenuItemProps) => (
  <MuiMenuItem
    onClick={onClick}
    disabled={disabled}
    dense={dense}
    selected={selected}
  >
    <ListItemText sx={{ flexGrow: 1, pl: dense ? 1.5 : 0 }}>
      {label}
    </ListItemText>

    {Icon && (
      <ListItemIcon sx={{ minWidth: '0 !important' }}>{Icon}</ListItemIcon>
    )}
  </MuiMenuItem>
);

export default function Menu() {
  const path = usePathname();
  const router = useRouter();
  const { lang } = useParams();
  const [submenu, setSubmenu] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const t = useTranslation(`${lang}`, i18nNS.App);
  const { callApi } = useApi();

  const handleClose = () => {
    setAnchor(null);
  };

  const signOut = async () => {
    handleClose();

    await callApi(ApiRoutes.auth, 'DELETE');
  };

  const changeLanguage = (_lang: string) => {
    setSubmenu(false);
    handleClose();

    console.log(path.replace(`${lang}`, _lang));
    router.push(path.replace(`${lang}`, _lang));
  };

  const items: (MenuItemProps | DividerProps)[] = [
    {
      label: `${t('menu.languages', 'Languages')}`,
      onClick: () => setSubmenu((_) => !_),
      Icon: <TranslateIcon fontSize="small" />,
    },
    ...(submenu
      ? languages.map((l) => ({
          label: languageLabel[l],
          onClick: () => changeLanguage(l),
          dense: true,
          selected: l === lang,
          disabled: l === lang,
        }))
      : []),
    { divider: true },
    {
      label: `${t('menu.charts', 'Charts')}`,
      onClick: () => undefined,
      Icon: <InsertChartIcon />,
      disabled: true,
    },
    {
      label: `${t('menu.sign_out', 'Sign out')}`,
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
          sx: { minWidth: 160 },
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
        {items.map((props, i) =>
          'divider' in props ? (
            <Divider key={i} />
          ) : (
            <MenuItem key={props.label} {...props} />
          )
        )}
      </MuiMenu>
    </>
  );
}
