import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { logout } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';
import getGravatarUrl from '@/utils/getGravatarUrl';

import styles from './Avatar.module.scss';

type Props = {
  size?: number;
  interactive?: boolean;
};

const Avatar: React.FC<Props> = ({ size = 64, interactive = true }) => {
  const router = useRouter();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const user = useAppSelector((state) => state.auth.user);
  const email = user?.email || '';

  const handleOpen = (event: React.MouseEvent<Element>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenProfile = () => {
    dispatch(setModalState({ modal: 'auth.profile', state: { open: true } }));
    handleClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();

    router.push('/');
  };

  return (
    <>
      <IconButton onClick={handleOpen} disabled={!interactive}>
        <Image
          width={size}
          height={size}
          className={styles.avatar}
          src={getGravatarUrl(email, size)}
          alt={user?.name ?? 'User Avatar'}
        />
      </IconButton>

      <Menu anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
        <MenuItem onClick={handleOpenProfile}>
          <div>
            <span className="text-xs opacity-50">{t('common.avatar.menu.greeting')},</span>
            <p>{user?.name}</p>
          </div>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>{t('common.avatar.menu.logout')}</MenuItem>
      </Menu>
    </>
  );
};

export default Avatar;
