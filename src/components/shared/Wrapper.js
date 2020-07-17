import React, { memo, useEffect } from 'react';
import { Slide, toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import ModalRegistrar from '../../modals/ModalRegistrar';

const Wrapper = ({ children }) => {
  useEffect(() => {
    toast.configure({
      role: 'alert',
      hideProgressBar: true,
      transition: Slide,
      closeButton: false,
      position: 'bottom-right',
      pauseOnFocusLoss: false,
    });
  }, []);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Reactive Resume</title>
        <meta
          name="description"
          content="A free and open source resume builder that’s built to make the mundane tasks of creating, updating and sharing your resume as easy as 1, 2, 3."
        />
        <link rel="canonical" href="https://rxresu.me" />
        <meta property="og:url" content="https://rxresu.me" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="A free and open source resume builder that’s built to make the mundane tasks of creating, updating and sharing your resume as easy as 1, 2, 3."
        />
        <meta property="og:image" content="http://rxresu.me/images/share.png" />
      </Helmet>

      {children}

      <ModalRegistrar />
    </>
  );
};

export default memo(Wrapper);
