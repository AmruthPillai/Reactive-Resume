/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect, useContext, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { PanZoom } from 'react-easy-panzoom';

import AppContext from '../../context/AppContext';
import PageContext from '../../context/PageContext';

import LeftSidebar from '../LeftSidebar/LeftSidebar';
import RightSidebar from '../RightSidebar/RightSidebar';

import templates from '../../templates';
import PageController from '../../shared/PageController';
import PrintDialog from '../../shared/PrintDialog';
import PanZoomAnimation from '../../shared/PanZoomAnimation';

const App = () => {
  const pageRef = useRef(null);
  const panZoomRef = useRef(null);
  const { i18n } = useTranslation();

  const context = useContext(AppContext);
  const { state, dispatch } = context;
  const { theme, settings } = state;

  const pageContext = useContext(PageContext);
  const { setPageRef, setPanZoomRef } = pageContext;

  useEffect(() => {
    setPageRef(pageRef);
    setPanZoomRef(panZoomRef);
    i18n.changeLanguage(settings.language);
    const storedState = JSON.parse(localStorage.getItem('state'));
    dispatch({ type: 'import_data', payload: storedState });
  }, [dispatch, setPageRef, setPanZoomRef, i18n, settings.language]);

  return (
    <Suspense fallback="Loading...">
      <div className="h-screen grid grid-cols-5 items-center">
        <LeftSidebar />

        <div className="relative z-10 h-screen overflow-hidden col-span-3 flex justify-center items-center">
          <PanZoom
            ref={panZoomRef}
            minZoom="0.4"
            autoCenter
            autoCenterZoomLevel={0.7}
            enableBoundingBox
            boundaryRatioVertical={0.8}
            boundaryRatioHorizontal={0.8}
            style={{ outline: 'none' }}
          >
            <div id="page" ref={pageRef} className="shadow-2xl break-words">
              {templates.find(x => theme.layout.toLowerCase() === x.key).component()}
            </div>
          </PanZoom>

          <PageController />
        </div>

        <div id="printPage" className="break-words">
          {templates.find(x => theme.layout.toLowerCase() === x.key).component()}
        </div>

        <RightSidebar />

        <PanZoomAnimation />
        <PrintDialog />
      </div>
    </Suspense>
  );
};

export default App;
