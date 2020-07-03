import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import GatsbyImage from "gatsby-image";

const Logo = ({ size = "256px" }) => {
  const { file } = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 512) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <GatsbyImage
      className="shadow-md rounded"
      style={{ width: size, height: size }}
      fluid={file.childImageSharp.fluid}
    />
  );
};

export default Logo;
