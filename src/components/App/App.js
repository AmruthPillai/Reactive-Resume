/* eslint-disable no-unused-vars */
import React from 'react';

import Onyx from '../../templates/onyx/Onyx';
import LeftSidebar from '../LeftSidebar/LeftSidebar';

const App = () => {
  return (
    <div className="grid grid-cols-5 items-center">
      <LeftSidebar />

      <div className="col-span-3">
        <div id="page" className="p-12 my-auto mx-auto shadow-2xl">
          <Onyx />
        </div>
      </div>

      <div id="rightSidebar" className="h-screen bg-white col-span-1 shadow-2xl overflow-scroll">
        This is the right sidebar
      </div>
    </div>
  );
};

export default App;
