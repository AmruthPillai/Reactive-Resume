import React, { useState } from 'react';

const PageContext = React.createContext(null);
const { Provider } = PageContext;

const StateProvider = ({ children }) => {
  const [pageRef, setPageRef] = useState(null);
  const [panZoomRef, setPanZoomRef] = useState(null);
  const [isPrintDialogOpen, setPrintDialogOpen] = useState(false);

  return (
    <Provider
      value={{
        pageRef,
        setPageRef,
        panZoomRef,
        setPanZoomRef,
        isPrintDialogOpen,
        setPrintDialogOpen,
      }}
    >
      {children}
    </Provider>
  );
};

export const PageProvider = StateProvider;
export const PageConsumer = PageContext.Consumer;

export default PageContext;
