import { sectionScrollIntoView } from '@/utils/editor';
import { Box } from '@mui/material';
import React from 'react';

type ScrollSectionInViewProps = {
  sectionId: string;
  enable?: boolean;
};

export const ScrollSectionInView: React.FC<React.PropsWithChildren<ScrollSectionInViewProps>> = ({
  sectionId,
  children,
  enable = false,
}) => {
  return (
    <Box
      component={'section'}
      id={`Pikachu_${sectionId}`}
      sx={
        enable
          ? {
              ':hover': {
                boxShadow: 2,
                scale: '1.1',
                padding: '10px',
                background: 'aqua',
                cursor: 'pointer',
              },
            }
          : {}
      }
      onClick={() => sectionScrollIntoView(sectionId)}
    >
      {children}
    </Box>
  );
};

export default ScrollSectionInView;
