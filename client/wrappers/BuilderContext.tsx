import React, { createContext, useMemo } from 'react';

type RBContextProps = { enableSelectToScroll?: boolean };

export const ResumeBuilderContext = createContext<RBContextProps>({} as RBContextProps);

export const BuilderContext: React.FC<React.PropsWithChildren<unknown>> = (props) => {
  const value = useMemo(() => {
    return { enableSelectToScroll: true };
  }, []);
  return <ResumeBuilderContext.Provider value={value}>{props.children}</ResumeBuilderContext.Provider>;
};

export default BuilderContext;
