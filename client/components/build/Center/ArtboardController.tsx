import {
  AlignHorizontalCenter,
  AlignVerticalCenter,
  Download,
  FilterCenterFocus,
  InsertPageBreak,
  Link,
  ViewSidebar,
  ZoomIn,
  ZoomOut,
} from '@mui/icons-material';
import { ButtonBase, Divider, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import clsx from 'clsx';
import { get } from 'lodash';
import { useTranslation } from 'next-i18next';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';

import { ServerError } from '@/services/axios';
import { printResumeAsPdf, PrintResumeAsPdfParams } from '@/services/printer';
import { togglePageBreakLine, togglePageOrientation, toggleSidebar } from '@/store/build/buildSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import getResumeUrl from '@/utils/getResumeUrl';

import styles from './ArtboardController.module.scss';

const ArtboardController: React.FC<ReactZoomPanPinchRef> = ({ zoomIn, zoomOut, centerView }) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const dispatch = useAppDispatch();

  const resume = useAppSelector((state) => state.resume);
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const { left, right } = useAppSelector((state) => state.build.sidebar);
  const orientation = useAppSelector((state) => state.build.page.orientation);

  const { mutateAsync, isLoading } = useMutation<string, ServerError, PrintResumeAsPdfParams>(printResumeAsPdf);

  const handleTogglePageBreakLine = () => dispatch(togglePageBreakLine());

  const handleTogglePageOrientation = () => dispatch(togglePageOrientation());

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar({ sidebar: 'left' }));
    dispatch(toggleSidebar({ sidebar: 'right' }));
  };

  const handleCopyLink = async () => {
    const url = getResumeUrl(resume, { withHost: true });
    await navigator.clipboard.writeText(url);

    toast.success(t('common.toast.success.resume-link-copied'));
  };

  const handleExportPDF = async () => {
    const download = (await import('downloadjs')).default;

    const slug = get(resume, 'slug');
    const username = get(resume, 'user.username');

    const url = await mutateAsync({ username, slug });

    download(`/api${url}`);
  };

  return (
    <div
      className={clsx({
        [styles.container]: true,
        [styles.pushLeft]: left.open,
        [styles.pushRight]: right.open,
      })}
    >
      <div className={styles.controller}>
        <Tooltip arrow placement="top" title={t('builder.controller.tooltip.zoom-in') as string}>
          <ButtonBase onClick={() => zoomIn(0.25)}>
            <ZoomIn fontSize="medium" />
          </ButtonBase>
        </Tooltip>

        <Tooltip arrow placement="top" title={t('builder.controller.tooltip.zoom-out') as string}>
          <ButtonBase onClick={() => zoomOut(0.25)}>
            <ZoomOut fontSize="medium" />
          </ButtonBase>
        </Tooltip>

        <Tooltip arrow placement="top" title={t('builder.controller.tooltip.center-artboard') as string}>
          <ButtonBase onClick={() => centerView(0.95)}>
            <FilterCenterFocus fontSize="medium" />
          </ButtonBase>
        </Tooltip>

        <Divider />

        {isDesktop && (
          <>
            <Tooltip arrow placement="top" title={t('builder.controller.tooltip.toggle-orientation') as string}>
              <ButtonBase onClick={handleTogglePageOrientation}>
                {orientation === 'vertical' ? (
                  <AlignHorizontalCenter fontSize="medium" />
                ) : (
                  <AlignVerticalCenter fontSize="medium" />
                )}
              </ButtonBase>
            </Tooltip>

            <Tooltip arrow placement="top" title={t('builder.controller.tooltip.toggle-page-break-line') as string}>
              <ButtonBase onClick={handleTogglePageBreakLine}>
                <InsertPageBreak fontSize="medium" />
              </ButtonBase>
            </Tooltip>

            <Tooltip arrow placement="top" title={t('builder.controller.tooltip.toggle-sidebars') as string}>
              <ButtonBase onClick={handleToggleSidebar}>
                <ViewSidebar fontSize="medium" />
              </ButtonBase>
            </Tooltip>

            <Divider />
          </>
        )}

        <Tooltip arrow placement="top" title={t('builder.controller.tooltip.copy-link') as string}>
          <ButtonBase onClick={handleCopyLink}>
            <Link fontSize="medium" />
          </ButtonBase>
        </Tooltip>

        <Tooltip arrow placement="top" title={t('builder.controller.tooltip.export-pdf') as string}>
          <ButtonBase onClick={handleExportPDF} disabled={isLoading}>
            <Download fontSize="medium" />
          </ButtonBase>
        </Tooltip>
      </div>
    </div>
  );
};

export default ArtboardController;
