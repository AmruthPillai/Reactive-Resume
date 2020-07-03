import React, { useContext } from "react";
import { FaGithub } from "react-icons/fa";
import ThemeContext from "../../contexts/ThemeContext";
import ModalContext from "../../contexts/ModalContext";
import UserContext from "../../contexts/UserContext";
import Button from "../shared/Button";
import Logo from "../shared/Logo";

const Hero = () => {
  const { user, loading } = useContext(UserContext);
  const { toggleDarkMode } = useContext(ThemeContext);
  const { authModal } = useContext(ModalContext);

  const handleLogin = () => authModal.setOpen(true);

  return (
    <div className="flex items-center">
      <Logo size="256px" />

      <div className="ml-12">
        <h1 className="text-5xl font-bold">Reactive Resume</h1>
        <h2 className="mt-1 text-3xl text-gray-500">
          A free and open-source resume builder.
        </h2>

        <div className="mt-12 flex">
          {user ? (
            <Button
              title="Go to App"
              onClick={handleLogin}
              isLoading={loading || authModal.isOpen}
            />
          ) : (
            <Button
              title="Login"
              onClick={handleLogin}
              isLoading={loading || authModal.isOpen}
            />
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

export default Hero;
