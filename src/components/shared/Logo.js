import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { memo } from 'react';
import cx from 'classnames';
import * as styles from './Logo.module.css';

const Logo = ({ size = '256px', className }) => {
  const { file } = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED)
        }
      }
    }
  `);

  return (
    <GatsbyImage
      loading="eager"
      alt="Reactive Resume"
      className={cx(styles.logo, className)}
      style={{ width: size, height: size }}
      image={file.childImageSharp.gatsbyImageData}
    />
  );
};

export default memo(Logo);
