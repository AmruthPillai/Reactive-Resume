import cx from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import React, { memo } from 'react';
import styles from './Logo.module.css';

const Logo = ({ size = '256px', className }) => {
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
      loading="eager"
      className={cx(styles.logo, className)}
      style={{ width: size, height: size }}
      fluid={file.childImageSharp.fluid}
    />
  );
};

export default memo(Logo);
