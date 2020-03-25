/* eslint-disable no-unused-vars */
import React, { useEffect, useContext } from 'react';

import Onyx from '../../templates/onyx';
import LeftSidebar from '../LeftSidebar/LeftSidebar';
import RightSidebar from '../RightSidebar/RightSidebar';
import AppContext from '../../context/AppContext';

const App = () => {
  const context = useContext(AppContext);
  const { dispatch } = context;

  useEffect(() => {
    const state = JSON.parse(localStorage.getItem('state'));
    dispatch({ type: 'import_data', payload: state });
  }, [dispatch]);

  return (
    <div className="h-screen overflow-hidden grid grid-cols-5 items-center">
      <LeftSidebar />

      <div className="z-0 h-screen col-span-3 flex justify-center items-center overflow-scroll">
        <div id="page" className="p-10 my-auto shadow-2xl overflow-scroll">
          <Onyx />
        </div>
      </div>

      <RightSidebar />
    </div>
  );
};

export default App;
