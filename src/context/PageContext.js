import React, { useState } from 'react';

const PageContext = React.createContext(null);
const { Provider } = PageContext;

const StateProvider = ({ children }) => {
  const [pageElement, setPageElement] = useState(null);
  return (
    <Provider
      value={{
        pageElement,
        setPageElement,
      }}
    >
      {children}
    </Provider>
  );
};

export const PageProvider = StateProvider;
export const PageConsumer = PageContext.Consumer;

export default PageContext;
