import { PictureAsPdf, Schema } from '@mui/icons-material';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import dayjs from 'dayjs';
import get from 'lodash/get';
import pick from 'lodash/pick';
import { useTranslation } from 'next-i18next';
import { useMutation } from 'react-query';

import Heading from '@/components/shared/Heading';
import { ServerError } from '@/services/axios';
import { printResumeAsPdf, PrintResumeAsPdfParams } from '@/services/printer';
import { useAppSelector } from '@/store/hooks';

const Export = () => {
  const { t } = useTranslation();

  const resume = useAppSelector((state) => state.resume.present);

  const { mutateAsync, isLoading } = useMutation<string, ServerError, PrintResumeAsPdfParams>(printResumeAsPdf);

  const pdfListItemText = {
    normal: {
      primary: t('builder.rightSidebar.sections.export.pdf.normal.primary'),
      secondary: t('builder.rightSidebar.sections.export.pdf.normal.secondary'),
    },
    loading: {
      primary: t('builder.rightSidebar.sections.export.pdf.loading.primary'),
      secondary: t('builder.rightSidebar.sections.export.pdf.loading.secondary'),
    },
  };

  const handleExportJSON = async () => {
    const nanoid = (await import('nanoid')).nanoid;
    const download = (await import('downloadjs')).default;

    const redactedResume = pick(resume, ['basics', 'sections', 'metadata', 'public']);
    const jsonString = JSON.stringify(redactedResume, null, 4);
    const jsonBlob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
    const filename = `RxResume_JSONExport_${nanoid()}.json`;

    download(jsonBlob, filename);
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
    <>
      <Heading path="metadata.export" name={t('builder.rightSidebar.sections.export.heading')} />

      <List sx={{ padding: 0 }}>
        <ListItem sx={{ padding: 0 }}>
          <ListItemButton className="gap-6" onClick={handleExportJSON}>
            <Schema />

            <ListItemText
              primary={t('builder.rightSidebar.sections.export.json.primary')}
              secondary={t('builder.rightSidebar.sections.export.json.secondary')}
            />
          </ListItemButton>
        </ListItem>

        <ListItem sx={{ padding: 0 }}>
          <ListItemButton className="gap-6" onClick={handleExportPDF} disabled={isLoading}>
            <PictureAsPdf />

            <ListItemText {...(isLoading ? pdfListItemText.loading : pdfListItemText.normal)} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};

export default Export;
