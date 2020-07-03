import React, { useContext } from "react";
import { useStaticQuery, graphql } from "gatsby";
import GatsbyImage from "gatsby-image";
import ThemeContext from "../../contexts/ThemeContext";
import ModalContext from "../../contexts/ModalContext";
import UserContext from "../../contexts/UserContext";
import Button from "../shared/Button";

const Hero = () => {
  const { user, loading } = useContext(UserContext);
  const { toggleDarkMode } = useContext(ThemeContext);
  const { authModal } = useContext(ModalContext);
  const { file } = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fixed(width: 256, height: 256) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const handleLogin = () => authModal.setOpen(true);

  return (
    <div className="flex items-center">
      <GatsbyImage
        className="shadow-md rounded"
        fixed={file.childImageSharp.fixed}
      />

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
            title="Source Code"
            onClick={toggleDarkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
