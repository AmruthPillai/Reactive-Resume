import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import animation from '../assets/panzoom.mp4';

const PanZoomAnimation = () => {
  const { t } = useTranslation();
  const [animationVisible, setAnimationVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimationVisible(true), 500);
    setTimeout(() => setAnimationVisible(false), 3000);
  }, []);

  return (
    <div
      className={`centered absolute inset-0 w-1/4 mt-24 transition-all duration-1000 ease-in-out ${
        animationVisible ? 'opacity-100 z-20' : 'opacity-0 z-0'
      }`}
    >
      <div className="px-12 rounded-lg shadow-2xl bg-white">
        <video src={animation} autoPlay muted loop />
        <p className="px-6 pb-6 text-sm text-gray-800 font-medium text-center">
          {t('panZoomAnimation.helpText')}
        </p>
      </div>
    </div>
  );
};

export default PanZoomAnimation;
