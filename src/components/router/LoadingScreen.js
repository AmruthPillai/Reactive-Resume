import { Fade, Modal } from '@material-ui/core';
import React, { memo } from 'react';
import { getRandomTip } from '../../data/tips';
import Logo from '../shared/Logo';

const LoadingScreen = () => {
  return (
    <Modal open hideBackdrop>
      <Fade in>
        <div className="w-screen h-screen flex justify-center items-center outline-none">
          <div className="flex flex-col items-center">
            <Logo size="48px" className="mb-4" />
            <span className="font-medium opacity-75">{getRandomTip()}</span>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default memo(LoadingScreen);
