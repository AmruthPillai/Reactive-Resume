import React, { useRef, useEffect, useContext, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import AppContext from '../../context/AppContext';
import PageContext from '../../context/PageContext';

import LeftSidebar from '../LeftSidebar/LeftSidebar';
import RightSidebar from '../RightSidebar/RightSidebar';

import templates from '../../templates';

const App = () => {
  const pageRef = useRef(null);
  const { i18n } = useTranslation();

  const context = useContext(AppContext);
  const { state, dispatch } = context;
  const { theme, settings } = state;

  const pageContext = useContext(PageContext);
  const { setPageElement } = pageContext;

  useEffect(() => {
    setPageElement(pageRef);
    i18n.changeLanguage(settings.language);
    const storedState = JSON.parse(localStorage.getItem('state'));
    dispatch({ type: 'import_data', payload: storedState });
  }, [dispatch, setPageElement, i18n, settings.language]);

  return (
    <Suspense fallback="Loading...">
      <div className="h-screen overflow-hidden grid grid-cols-5 items-center">
        <LeftSidebar />

        <div className="z-0 h-screen col-span-3 flex overflow-scroll justify-center items-center">
          <div id="page" ref={pageRef} className="shadow-2xl">
            {templates.find(x => theme.layout.toLowerCase() === x.key).component()}
          </div>
        </div>

        <RightSidebar />
      </div>
    </Suspense>
  );
};

export default App;
