import { navigate } from 'gatsby';
import React, { memo, useContext } from 'react';
import { FaGithub } from 'react-icons/fa';
import ModalContext from '../../contexts/ModalContext';
import ThemeContext from '../../contexts/ThemeContext';
import UserContext from '../../contexts/UserContext';
import Button from '../shared/Button';
import Logo from '../shared/Logo';

const Hero = () => {
  const { emitter, events } = useContext(ModalContext);
  const { user, loading } = useContext(UserContext);
  const { toggleDarkMode } = useContext(ThemeContext);

  const handleLogin = () => emitter.emit(events.AUTH_MODAL);

  const handleGotoApp = () => navigate('/app/dashboard');

  return (
    <div className="flex items-center">
      <Logo className="shadow-lg" size="256px" />

      <div className="ml-12">
        <h1 className="text-5xl font-bold">Reactive Resume</h1>
        <h2 className="mt-1 text-3xl text-primary-500">
          A free and open-source resume builder.
        </h2>

        <div className="mt-12 flex">
          {user ? (
            <Button
              title="Go to App"
              onClick={handleGotoApp}
              isLoading={loading}
            />
          ) : (
            <Button title="Login" onClick={handleLogin} isLoading={loading} />
          )}
          <Button
            outline
            className="ml-8"
            title="GitHub"
            icon={FaGithub}
            onClick={toggleDarkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Hero);
