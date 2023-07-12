import {
  ContentCopy,
  DeleteOutline,
  DriveFileRenameOutline,
  Link as LinkIcon,
  MoreVert,
  OpenInNew,
} from '@mui/icons-material';
import { ButtonBase, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { Resume } from 'schema';

import { RESUMES_QUERY } from '@/constants/index';
import { ServerError } from '@/services/axios';
import queryClient from '@/services/react-query';
import { deleteResume, DeleteResumeParams, duplicateResume, DuplicateResumeParams } from '@/services/resume';
import { useAppDispatch } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';
import { getRelativeTime } from '@/utils/date';
import getResumeUrl from '@/utils/getResumeUrl';

import styles from './ResumePreview.module.scss';

type Props = {
  resume: Resume;
};

const ResumePreview: React.FC<Props> = ({ resume }) => {
  const router = useRouter();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const { mutateAsync: duplicateMutation } = useMutation<Resume, ServerError, DuplicateResumeParams>(duplicateResume);

  const { mutateAsync: deleteMutation } = useMutation<void, ServerError, DeleteResumeParams>(deleteResume);

  const handleOpen = () => {
    handleClose();

    router.push({
      pathname: '/[username]/[slug]/build',
      query: { username: resume.user.username, slug: resume.slug },
    });
  };

  const handleOpenMenu = (event: React.MouseEvent<Element>) => {
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
            onComplete: () => {
              queryClient.invalidateQueries(RESUMES_QUERY);
            },
          },
        },
      }),
    );
  };

  const handleDuplicate = async () => {
    handleClose();

    await duplicateMutation({ id: resume.id });

    queryClient.invalidateQueries(RESUMES_QUERY);
  };

  const handleShareLink = async () => {
    handleClose();

    const url = getResumeUrl(resume, { withHost: true });
    await navigator.clipboard.writeText(url);

    toast.success(t('common.toast.success.resume-link-copied'));
  };

  const handleDelete = async () => {
    handleClose();

    await deleteMutation({ id: resume.id });

    queryClient.invalidateQueries(RESUMES_QUERY);
  };

  return (
    <section className={styles.resume}>
      <Link
        passHref
        href={{
          pathname: '/[username]/[slug]/build',
          query: { username: resume.user.username, slug: resume.slug },
        }}
      >
        <ButtonBase className={styles.preview}>
          {resume.image ? <Image src={resume.image} alt={resume.name} priority width={400} height={0} /> : null}
        </ButtonBase>
      </Link>

      <footer>
        <div className={styles.meta}>
          <p>{resume.name}</p>
          <p>{t('dashboard.resume.timestamp', { timestamp: getRelativeTime(resume.updatedAt) })}</p>
        </div>

        <ButtonBase className={styles.menu} onClick={handleOpenMenu}>
          <MoreVert />
        </ButtonBase>

        <Menu anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
          <MenuItem onClick={handleOpen}>
            <ListItemIcon>
              <OpenInNew className="scale-90" />
            </ListItemIcon>
            <ListItemText>{t('dashboard.resume.menu.open')}</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleRename}>
            <ListItemIcon>
              <DriveFileRenameOutline className="scale-90" />
            </ListItemIcon>
            <ListItemText>{t('dashboard.resume.menu.rename')}</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleDuplicate}>
            <ListItemIcon>
              <ContentCopy className="scale-90" />
            </ListItemIcon>
            <ListItemText>{t('dashboard.resume.menu.duplicate')}</ListItemText>
          </MenuItem>

          {resume.public ? (
            <MenuItem onClick={handleShareLink}>
              <ListItemIcon>
                <LinkIcon className="scale-90" />
              </ListItemIcon>
              <ListItemText>{t('dashboard.resume.menu.share-link')}</ListItemText>
            </MenuItem>
          ) : (
            <Tooltip arrow placement="right" title={t('dashboard.resume.menu.tooltips.share-link')}>
              <div>
                <MenuItem>
                  <ListItemIcon>
                    <LinkIcon className="scale-90" />
                  </ListItemIcon>
                  <ListItemText>{t('dashboard.resume.menu.share-link')}</ListItemText>
                </MenuItem>
              </div>
            </Tooltip>
          )}

          <Tooltip arrow placement="right" title={t('dashboard.resume.menu.tooltips.delete')}>
            <MenuItem onClick={handleDelete}>
              <ListItemIcon>
                <DeleteOutline className="scale-90" />
              </ListItemIcon>
              <ListItemText>{t('dashboard.resume.menu.delete')}</ListItemText>
            </MenuItem>
          </Tooltip>
        </Menu>
      </footer>
    </section>
  );
};

export default ResumePreview;
