/* eslint-disable no-unused-vars */
import React, { useEffect, useContext } from 'react';

import LeftSidebar from '../LeftSidebar/LeftSidebar';
import RightSidebar from '../RightSidebar/RightSidebar';
import AppContext from '../../context/AppContext';

// Resume Templates
import Onyx from '../../templates/onyx';
import Pikachu from '../../templates/pikachu/Pikachu';
import Gengar from '../../templates/gengar/Gengar';

const App = () => {
  const context = useContext(AppContext);
  const { state, dispatch } = context;
  const { theme } = state;

  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem('state'));
    dispatch({ type: 'import_data', payload: storedState });
  }, [dispatch]);

  const renderTemplate = () => {
    switch (theme.layout) {
      case 'Onyx':
        return <Onyx />;
      case 'Pikachu':
        return <Pikachu />;
      case 'Gengar':
        return <Gengar />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen overflow-hidden grid grid-cols-5 items-center">
      <LeftSidebar />

      <div className="z-0 h-screen col-span-3 flex justify-center items-center overflow-scroll">
        <div
          id="page"
          className="animated fadeIn my-auto shadow-2xl"
          style={{ animationDelay: '500ms' }}
        >
          {renderTemplate()}
        </div>
      </div>

      <RightSidebar />
    </div>
  );
};

export default App;
