import React, { createContext, useMemo } from 'react';

type RBContextProps = {
  enableSelectToScroll?: boolean;
  highlight?: {
    enable: boolean;
    sectionId?: string;
  };
};

export const ResumeBuilderContext = createContext<RBContextProps>({} as RBContextProps);

export const BuilderContext: React.FC<React.PropsWithChildren<RBContextProps>> = (props) => {
  const value = useMemo(() => {
    return props;
  }, [props]);
  return <ResumeBuilderContext.Provider value={value}>{props.children}</ResumeBuilderContext.Provider>;
};

export default BuilderContext;
