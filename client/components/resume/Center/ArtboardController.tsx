import {
  AlignHorizontalCenter,
  AlignVerticalCenter,
  Download,
  FilterCenterFocus,
  InsertPageBreak,
  Link,
  RedoOutlined,
  UndoOutlined,
  ViewSidebar,
  ZoomIn,
  ZoomOut,
} from '@mui/icons-material';
import { ButtonBase, Divider, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import get from 'lodash/get';
import { useTranslation } from 'next-i18next';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { ReactZoomPanPinchHandlers } from 'react-zoom-pan-pinch';
import { ActionCreators } from 'redux-undo';

import { ServerError } from '@/services/axios';
import { printResumeAsPdf, PrintResumeAsPdfParams } from '@/services/printer';
import { togglePageBreakLine, togglePageOrientation, toggleSidebar } from '@/store/build/buildSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import getResumeUrl from '@/utils/getResumeUrl';
import { cn } from '@/utils/styles';

import styles from './ArtboardController.module.scss';

const ArtboardController: React.FC<ReactZoomPanPinchHandlers> = ({ zoomIn, zoomOut, centerView }) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const dispatch = useAppDispatch();

  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const { past, present: resume, future } = useAppSelector((state) => state.resume);
  const pages = get(resume, 'metadata.layout');
  const { left, right } = useAppSelector((state) => state.build.sidebar);
  const orientation = useAppSelector((state) => state.build.page.orientation);

  const { mutateAsync, isLoading } = useMutation<string, ServerError, PrintResumeAsPdfParams>(printResumeAsPdf);

  const handleUndo = () => dispatch(ActionCreators.undo());
  const handleRedo = () => dispatch(ActionCreators.redo());

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
    const updatedAt = get(resume, 'updatedAt');

    const url = await mutateAsync({ username, slug, lastUpdated: dayjs(updatedAt).unix().toString() });

    download(url);
  };

  return (
    <div
      className={cn({
        [styles.container]: true,
        [styles.pushLeft]: left.open,
        [styles.pushRight]: right.open,
      })}
    >
      <div className={styles.controller}>
        <Tooltip arrow placement="top" title={t('builder.controller.tooltip.undo')}>
          <ButtonBase onClick={handleUndo} className={cn({ 'pointer-events-none opacity-50': past.length < 2 })}>
            <UndoOutlined fontSize="medium" />
          </ButtonBase>
        </Tooltip>

        <Tooltip arrow placement="top" title={t('builder.controller.tooltip.redo')}>
          <ButtonBase onClick={handleRedo} className={cn({ 'pointer-events-none opacity-50': future.length === 0 })}>
            <RedoOutlined fontSize="medium" />
          </ButtonBase>
        </Tooltip>

        <Divider />

        <Tooltip arrow placement="top" title={t('builder.controller.tooltip.zoom-in')}>
          <ButtonBase onClick={() => zoomIn(0.25)}>
            <ZoomIn fontSize="medium" />
          </ButtonBase>
        </Tooltip>

        <Tooltip arrow placement="top" title={t('builder.controller.tooltip.zoom-out')}>
          <ButtonBase onClick={() => zoomOut(0.25)}>
            <ZoomOut fontSize="medium" />
          </ButtonBase>
        </Tooltip>

        <Tooltip arrow placement="top" title={t('builder.controller.tooltip.center-artboard')}>
          <ButtonBase onClick={() => centerView(0.95)}>
            <FilterCenterFocus fontSize="medium" />
          </ButtonBase>
        </Tooltip>

        <Divider />

        {isDesktop && (
          <>
            <Tooltip arrow placement="top" title={t('builder.controller.tooltip.toggle-orientation')}>
              <ButtonBase
                onClick={handleTogglePageOrientation}
                className={cn({ 'pointer-events-none opacity-50': pages.length === 1 })}
              >
                {orientation === 'vertical' ? (
                  <AlignHorizontalCenter fontSize="medium" />
                ) : (
                  <AlignVerticalCenter fontSize="medium" />
                )}
              </ButtonBase>
            </Tooltip>

            <Tooltip arrow placement="top" title={t('builder.controller.tooltip.toggle-page-break-line')}>
              <ButtonBase onClick={handleTogglePageBreakLine}>
                <InsertPageBreak fontSize="medium" />
              </ButtonBase>
            </Tooltip>

            <Tooltip arrow placement="top" title={t('builder.controller.tooltip.toggle-sidebars')}>
              <ButtonBase onClick={handleToggleSidebar}>
                <ViewSidebar fontSize="medium" />
              </ButtonBase>
            </Tooltip>

            <Divider />
          </>
        )}

        <Tooltip arrow placement="top" title={t('builder.controller.tooltip.copy-link')}>
          <ButtonBase onClick={handleCopyLink}>
            <Link fontSize="medium" />
          </ButtonBase>
        </Tooltip>

        <Tooltip arrow placement="top" title={t('builder.controller.tooltip.export-pdf')}>
          <ButtonBase onClick={handleExportPDF} disabled={isLoading}>
            <Download fontSize="medium" />
          </ButtonBase>
        </Tooltip>
      </div>
    </div>
  );
};

export default ArtboardController;
