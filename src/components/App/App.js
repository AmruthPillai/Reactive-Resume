/* eslint-disable no-unused-vars */
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Onyx from '../../templates/onyx';
import LeftSidebar from '../LeftSidebar/LeftSidebar';
import RightSidebar from '../RightSidebar/RightSidebar';

toast.configure({
  autoClose: 3000,
  closeButton: false,
  hideProgressBar: true,
  position: toast.POSITION.BOTTOM_RIGHT,
});

const App = () => {
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
