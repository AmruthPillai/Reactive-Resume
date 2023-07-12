import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  CopyAll,
  Delete,
  DriveFileRenameOutline,
  Home as HomeIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import {
  AppBar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import get from 'lodash/get';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { Resume } from 'schema';

import { RESUMES_QUERY } from '@/constants/index';
import { ServerError } from '@/services/axios';
import queryClient from '@/services/react-query';
import { deleteResume, DeleteResumeParams, duplicateResume, DuplicateResumeParams } from '@/services/resume';
import { setSidebarState, toggleSidebar } from '@/store/build/buildSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';
import getResumeUrl from '@/utils/getResumeUrl';
import { cn } from '@/utils/styles';

import styles from './Header.module.scss';

const Header = () => {
  const theme = useTheme();

  const router = useRouter();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const resume = useAppSelector((state) => state.resume.present);
  const { left, right } = useAppSelector((state) => state.build.sidebar);

  const { mutateAsync: deleteMutation } = useMutation<void, ServerError, DeleteResumeParams>(deleteResume);
  const { mutateAsync: duplicateMutation } = useMutation<Resume, ServerError, DuplicateResumeParams>(duplicateResume);

  const name = useMemo(() => get(resume, 'name'), [resume]);

  useEffect(() => {
    if (isDesktop) {
      dispatch(setSidebarState({ sidebar: 'left', state: { open: true } }));
      dispatch(setSidebarState({ sidebar: 'right', state: { open: true } }));
    } else {
      dispatch(setSidebarState({ sidebar: 'left', state: { open: false } }));
      dispatch(setSidebarState({ sidebar: 'right', state: { open: false } }));
    }
  }, [isDesktop, dispatch]);

  const toggleLeftSidebar = () => dispatch(toggleSidebar({ sidebar: 'left' }));

  const toggleRightSidebar = () => dispatch(toggleSidebar({ sidebar: 'right' }));

  const goBack = () => router.push('/dashboard');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRename = () => {
    handleClose();

    dispatch(
      setModalState({
        modal: 'dashboard.rename-resume',
        state: {
          open: true,
          payload: {
            item: resume,
            onComplete: (newResume: Resume) => {
              queryClient.invalidateQueries(RESUMES_QUERY);

              router.push(`/${resume.user.username}/${newResume.slug}/build`);
            },
          },
        },
      }),
    );
  };

  const handleDuplicate = async () => {
    handleClose();

    const newResume = await duplicateMutation({ id: resume.id });

    queryClient.invalidateQueries(RESUMES_QUERY);

    router.push(`/${resume.user.username}/${newResume.slug}/build`);
  };

  const handleDelete = async () => {
    handleClose();

    await deleteMutation({ id: resume.id });

    queryClient.invalidateQueries(RESUMES_QUERY);

    goBack();
  };

  const handleShareLink = async () => {
    handleClose();

    const url = getResumeUrl(resume, { withHost: true });
    await navigator.clipboard.writeText(url);

    toast.success(t('common.toast.success.resume-link-copied'));
  };

  return (
    <AppBar elevation={0} position="fixed">
      <Toolbar
        variant="regular"
        className={cn({
          [styles.header]: true,
          [styles.pushLeft]: left.open,
          [styles.pushRight]: right.open,
        })}
      >
        <IconButton onClick={toggleLeftSidebar}>{left.open ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>

        <div className={styles.title}>
          <IconButton className="opacity-50 hover:opacity-100" onClick={goBack}>
            <HomeIcon />
          </IconButton>

          <span className="opacity-50">{'/'}</span>

          <h1>{name}</h1>

          <IconButton onClick={handleClick}>
            <KeyboardArrowDownIcon />
          </IconButton>

          <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
            <MenuItem onClick={handleRename}>
              <ListItemIcon>
                <DriveFileRenameOutline className="scale-90" />
              </ListItemIcon>
              <ListItemText>{t('builder.header.menu.rename')}</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleDuplicate}>
              <ListItemIcon>
                <CopyAll className="scale-90" />
              </ListItemIcon>
              <ListItemText>{t('builder.header.menu.duplicate')}</ListItemText>
            </MenuItem>

            {resume.public ? (
              <MenuItem onClick={handleShareLink}>
                <ListItemIcon>
                  <LinkIcon className="scale-90" />
                </ListItemIcon>
                <ListItemText>{t('builder.header.menu.share-link')}</ListItemText>
              </MenuItem>
            ) : (
              <Tooltip arrow placement="right" title={t('builder.header.menu.tooltips.share-link')}>
                <div>
                  <MenuItem>
                    <ListItemIcon>
                      <LinkIcon className="scale-90" />
                    </ListItemIcon>
                    <ListItemText>{t('builder.header.menu.share-link')}</ListItemText>
                  </MenuItem>
                </div>
              </Tooltip>
            )}

            <Tooltip arrow placement="right" title={t('builder.header.menu.tooltips.delete')}>
              <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                  <Delete className="scale-90" />
                </ListItemIcon>
                <ListItemText>{t('builder.header.menu.delete')}</ListItemText>
              </MenuItem>
            </Tooltip>
          </Menu>
        </div>

        <IconButton onClick={toggleRightSidebar}>{right.open ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
