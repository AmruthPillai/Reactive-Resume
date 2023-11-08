import { sectionScrollIntoView } from '@/utils/editor';
import { ResumeBuilderContext } from '@/wrappers/BuilderContext';
import { Box } from '@mui/material';
import React, { useContext } from 'react';

type ScrollSectionInViewProps = {
  sectionId: string;
  template: string;
};

export const ScrollSectionInView: React.FC<React.PropsWithChildren<ScrollSectionInViewProps>> = ({
  sectionId,
  children,
  template,
}) => {
  const builderContext = useContext(ResumeBuilderContext);
  const { enableSelectToScroll, highlight } = builderContext;
  return (
    <Box
      component={'section'}
      id={`${template}_${sectionId}`}
      sx={{
        // Enable Hover Styling
        ...(enableSelectToScroll && {
          ':hover': {
            boxShadow: 2,
            scale: '1.1',
            padding: '10px',
            background: 'aqua',
            cursor: 'pointer',
          },
        }),
        // Enable Highlighting current section
        ...(highlight?.enable &&
          highlight.sectionId === sectionId && {
            boxShadow: 2,
            scale: '1.1',
            padding: '10px',
            background: 'aqua',
            cursor: 'pointer',
          }),
      }}
      onClick={() => enableSelectToScroll && sectionScrollIntoView(sectionId)}
    >
      {children}
    </Box>
  );
};

export default ScrollSectionInView;
