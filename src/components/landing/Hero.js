import { navigate } from 'gatsby';
import TypeIt from 'typeit-react';
import React, { memo, useContext } from 'react';
import { FaGithub } from 'react-icons/fa';
import ModalContext from '../../contexts/ModalContext';
import UserContext from '../../contexts/UserContext';
import Button from '../shared/Button';
import Logo from '../shared/Logo';

const Hero = () => {
  const { emitter, events } = useContext(ModalContext);
  const { user, loading } = useContext(UserContext);

  const handleLogin = () => emitter.emit(events.AUTH_MODAL);

  const handleGotoApp = () => navigate('/app/dashboard');

  return (
    <div className="flex items-center">
      <Logo className="shadow-lg" size="256px" />

      <div className="ml-12">
        <h1 className="sr-only">Reactive Resume</h1>
        <div className="text-5xl font-bold">
          <TypeIt
            getBeforeInit={(instance) => {
              return instance
                .type('Creative Resume')
                .pause(500)
                .move(-11)
                .delete(4)
                .pause(250)
                .type('Reac')
                .move('END');
            }}
          />
        </div>
        <h2 className="mt-1 text-3xl text-primary-500">
          A free and open-source resume builder.
        </h2>

        <div className="mt-12 flex">
          {user ? (
            <Button onClick={handleGotoApp} isLoading={loading}>
              Go to App
            </Button>
          ) : (
            <Button onClick={handleLogin} isLoading={loading}>
              Login
            </Button>
          )}

          <a
            href="https://github.com/AmruthPillai/Reactive-Resume"
            rel="noreferrer"
            target="_blank"
          >
            <Button outline icon={FaGithub} className="ml-8">
              Source Code
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default memo(Hero);
