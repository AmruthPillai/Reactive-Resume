import { Anchor, DeleteForever, Palette } from '@mui/icons-material';
import {
  Autocomplete,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Switch,
  TextField,
} from '@mui/material';
import { DateConfig, Resume } from '@reactive-resume/schema';
import dayjs from 'dayjs';
import get from 'lodash/get';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';
import { useMutation } from 'react-query';

import Heading from '@/components/shared/Heading';
import ThemeSwitch from '@/components/shared/ThemeSwitch';
import { Language, languageMap, languages } from '@/config/languages';
import { ServerError } from '@/services/axios';
import queryClient from '@/services/react-query';
import { loadSampleData, LoadSampleDataParams, resetResume, ResetResumeParams } from '@/services/resume';
import { setTheme, togglePageBreakLine, togglePageOrientation } from '@/store/build/buildSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setResumeState } from '@/store/resume/resumeSlice';
import { dateFormatOptions } from '@/utils/date';

const Settings = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { locale, ...router } = useRouter();

  const resume = useAppSelector((state) => state.resume);
  const theme = useAppSelector((state) => state.build.theme);
  const breakLine = useAppSelector((state) => state.build.page.breakLine);
  const orientation = useAppSelector((state) => state.build.page.orientation);

  const id: number = useMemo(() => get(resume, 'id'), [resume]);
  const slug: string = useMemo(() => get(resume, 'slug'), [resume]);
  const username: string = useMemo(() => get(resume, 'user.username'), [resume]);
  const dateConfig: DateConfig = useMemo(() => get(resume, 'metadata.date'), [resume]);

  const isDarkMode = useMemo(() => theme === 'dark', [theme]);
  const exampleString = useMemo(() => `Eg. ${dayjs().format(dateConfig.format)}`, [dateConfig.format]);
  const themeString = useMemo(() => (isDarkMode ? 'Matte Black Everything' : 'As bright as your future'), [isDarkMode]);

  const { mutateAsync: loadSampleDataMutation } = useMutation<Resume, ServerError, LoadSampleDataParams>(
    loadSampleData
  );
  const { mutateAsync: resetResumeMutation } = useMutation<Resume, ServerError, ResetResumeParams>(resetResume);

  const handleSetTheme = (value: boolean) => dispatch(setTheme({ theme: value ? 'dark' : 'light' }));

  const handleChangeDateFormat = (value: string | null) =>
    dispatch(setResumeState({ path: 'metadata.date.format', value }));

  const handleChangeLanguage = (value: Language | null) => {
    const { pathname, asPath, query, push } = router;
    const code = value?.code || 'en';

    document.cookie = `NEXT_LOCALE=${code}; path=/; expires=2147483647`;

    push({ pathname, query }, asPath, { locale: code });
  };

  const handleLoadSampleData = async () => {
    await loadSampleDataMutation({ id });

    queryClient.invalidateQueries(`resume/${username}/${slug}`);
  };

  const handleResetResume = async () => {
    await resetResumeMutation({ id });

    queryClient.invalidateQueries(`resume/${username}/${slug}`);
  };

  return (
    <>
      <Heading path="metadata.settings" name={t('builder.rightSidebar.sections.settings.heading')} />

      <List sx={{ padding: 0 }}>
        {/* Global Settings */}
        <>
          <ListSubheader className="rounded">
            {t('builder.rightSidebar.sections.settings.global.heading')}
          </ListSubheader>

          <ListItem>
            <ListItemIcon>
              <Palette />
            </ListItemIcon>
            <ListItemText
              primary={t('builder.rightSidebar.sections.settings.global.theme.primary')}
              secondary={themeString}
            />
            <ThemeSwitch checked={isDarkMode} onChange={(_, value: boolean) => handleSetTheme(value)} />
          </ListItem>

          <ListItem className="flex-col">
            <ListItemText
              className="w-full"
              primary={t('builder.rightSidebar.sections.settings.global.date.primary')}
              secondary={t('builder.rightSidebar.sections.settings.global.date.secondary')}
            />
            <Autocomplete<string, false, boolean, false>
              disableClearable
              className="my-2 w-full"
              options={dateFormatOptions}
              value={dateConfig.format}
              onChange={(_, value) => handleChangeDateFormat(value)}
              renderInput={(params) => <TextField {...params} helperText={exampleString} />}
            />
          </ListItem>

          <ListItem className="flex-col">
            <ListItemText
              className="w-full"
              primary={t('builder.rightSidebar.sections.settings.global.language.primary')}
              secondary={t('builder.rightSidebar.sections.settings.global.language.secondary')}
            />
            <Autocomplete<Language, false, boolean, false>
              disableClearable
              className="my-2 w-full"
              options={languages}
              value={languageMap[locale ?? 'en']}
              isOptionEqualToValue={(a, b) => a.code === b.code}
              onChange={(_, value) => handleChangeLanguage(value)}
              renderInput={(params) => <TextField {...params} />}
              getOptionLabel={(language) => {
                if (language.localName) {
                  return `${language.name} (${language.localName})`;
                }

                return language.name;
              }}
            />
          </ListItem>
        </>

        {/* Page Settings */}
        <>
          <ListSubheader className="rounded">{t('builder.rightSidebar.sections.settings.page.heading')}</ListSubheader>

          <ListItem>
            <ListItemText
              primary={t('builder.rightSidebar.sections.settings.page.orientation.primary')}
              secondary={t('builder.rightSidebar.sections.settings.page.orientation.secondary')}
            />
            <Switch
              color="secondary"
              checked={orientation === 'horizontal'}
              onChange={() => dispatch(togglePageOrientation())}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={t('builder.rightSidebar.sections.settings.page.break-line.primary')}
              secondary={t('builder.rightSidebar.sections.settings.page.break-line.secondary')}
            />
            <Switch color="secondary" checked={breakLine} onChange={() => dispatch(togglePageBreakLine())} />
          </ListItem>
        </>

        {/* Resume Settings */}
        <>
          <ListSubheader className="rounded">
            {t('builder.rightSidebar.sections.settings.resume.heading')}
          </ListSubheader>

          <ListItem>
            <ListItemButton onClick={handleLoadSampleData}>
              <ListItemIcon>
                <Anchor />
              </ListItemIcon>
              <ListItemText
                primary={t('builder.rightSidebar.sections.settings.resume.sample.primary')}
                secondary={t('builder.rightSidebar.sections.settings.resume.sample.secondary')}
              />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={handleResetResume}>
              <ListItemIcon>
                <DeleteForever />
              </ListItemIcon>
              <ListItemText
                primary={t('builder.rightSidebar.sections.settings.resume.reset.primary')}
                secondary={t('builder.rightSidebar.sections.settings.resume.reset.secondary')}
              />
            </ListItemButton>
          </ListItem>
        </>
      </List>
    </>
  );
};

export default Settings;
