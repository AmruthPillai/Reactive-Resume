import { CopyAll } from '@mui/icons-material';
import { Checkbox, FormControlLabel, IconButton, List, ListItem, ListItemText, Switch, TextField } from '@mui/material';
import get from 'lodash/get';
import { useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import Heading from '@/components/shared/Heading';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setResumeState } from '@/store/resume/resumeSlice';
import getResumeUrl from '@/utils/getResumeUrl';

const Sharing = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [showShortUrl, setShowShortUrl] = useState(false);

  const resume = useAppSelector((state) => state.resume.present);
  const isPublic = useMemo(() => get(resume, 'public'), [resume]);
  const url = useMemo(() => getResumeUrl(resume, { withHost: true }), [resume]);
  const shortUrl = useMemo(() => getResumeUrl(resume, { withHost: true, shortUrl: true }), [resume]);

  const handleSetVisibility = (value: boolean) => dispatch(setResumeState({ path: 'public', value }));

  const handleCopyToClipboard = async () => {
    const text = showShortUrl ? shortUrl : url;

    await navigator.clipboard.writeText(text);

    toast.success(t('common.toast.success.resume-link-copied'));
  };

  return (
    <>
      <Heading path="metadata.sharing" name={t('builder.rightSidebar.sections.sharing.heading')} />

      <List sx={{ padding: 0 }}>
        <ListItem className="flex flex-col" sx={{ padding: 0 }}>
          <div className="flex w-full items-center justify-between">
            <ListItemText
              primary={t('builder.rightSidebar.sections.sharing.visibility.title')}
              secondary={t('builder.rightSidebar.sections.sharing.visibility.subtitle')}
            />
            <Switch color="secondary" checked={isPublic} onChange={(_, value) => handleSetVisibility(value)} />
          </div>

          <div className="mt-2 w-full">
            <TextField
              disabled
              fullWidth
              value={showShortUrl ? shortUrl : url}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleCopyToClipboard}>
                    <CopyAll />
                  </IconButton>
                ),
              }}
            />
          </div>

          <div className="mt-1 flex w-full">
            <FormControlLabel
              label={t('builder.rightSidebar.sections.sharing.short-url.label')}
              control={
                <Checkbox className="mr-1" checked={showShortUrl} onChange={(_, value) => setShowShortUrl(value)} />
              }
            />
          </div>
        </ListItem>
      </List>
    </>
  );
};

export default Sharing;
