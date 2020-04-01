import React, { useState } from 'react';

const PageContext = React.createContext(null);
const { Provider } = PageContext;

const StateProvider = ({ children }) => {
  const [panZoomRef, setPanZoomRef] = useState(null);
  const [pageRef, setPageRef] = useState(null);

  return (
    <Provider
      value={{
        pageRef,
        setPageRef,
        panZoomRef,
        setPanZoomRef,
      }}
    >
      {children}
    </Provider>
  );
};

export const PageProvider = StateProvider;
export const PageConsumer = PageContext.Consumer;

export default PageContext;
