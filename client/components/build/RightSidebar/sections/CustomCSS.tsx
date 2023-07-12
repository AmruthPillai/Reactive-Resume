import Editor from '@monaco-editor/react';
import { useTheme } from '@mui/material';
import clsx from 'clsx';
import get from 'lodash/get';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { CustomCSS as CustomCSSType } from 'schema';

import Heading from '@/components/shared/Heading';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setResumeState } from '@/store/resume/resumeSlice';

const CustomCSS = () => {
  const theme = useTheme();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const customCSS: CustomCSSType = useAppSelector((state) =>
    get(state.resume.present, 'metadata.css', {} as CustomCSSType),
  );

  const handleChange = (value: string | undefined) => {
    dispatch(setResumeState({ path: 'metadata.css.value', value }));
  };

  return (
    <>
      <Heading path="metadata.css" name={t('builder.rightSidebar.sections.css.heading')} isHideable />

      <Editor
        height="200px"
        language="css"
        value={customCSS.value}
        onChange={handleChange}
        className={clsx({ 'opacity-50': !customCSS.visible })}
        theme={theme.palette.mode === 'dark' ? 'vs-dark' : 'light'}
        options={{
          minimap: { enabled: false },
          overviewRulerLanes: 0,
          scrollBeyondLastColumn: 5,
          overviewRulerBorder: false,
          scrollBeyondLastLine: true,
        }}
      />
    </>
  );
};

export default CustomCSS;
