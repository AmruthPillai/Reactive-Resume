import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { memo } from 'react';
import cx from 'classnames';
import * as styles from './Templates.module.css';
import { handleKeyUp } from '../../../../utils';
import { useDispatch, useSelector } from '../../../../contexts/ResumeContext';
import Heading from '../../../shared/Heading';
import templateOptions from '../../../../data/templateOptions';

const Templates = ({ id }) => {
  const dispatch = useDispatch();
  const template = useSelector('metadata.template');

  const previews = useStaticQuery(graphql`
    query {
      onyx: file(relativePath: { eq: "templates/onyx.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, height: 240)
        }
      }
      pikachu: file(relativePath: { eq: "templates/pikachu.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, height: 240)
        }
      }
      gengar: file(relativePath: { eq: "templates/gengar.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, height: 240)
        }
      }
      castform: file(relativePath: { eq: "templates/castform.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, height: 240)
        }
      }
      glalie: file(relativePath: { eq: "templates/glalie.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, height: 240)
        }
      }
      celebi: file(relativePath: { eq: "templates/celebi.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, height: 240)
        }
      }
    }
  `);

  const handleClick = (value) => {
    dispatch({
      type: 'on_input',
      payload: {
        path: 'metadata.template',
        value,
      },
    });
  };

  return (
    <section>
      <Heading id={id} />

      <div className="grid grid-cols-2 gap-8">
        {templateOptions.map((x) => (
          <div
            key={x.id}
            tabIndex="0"
            role="button"
            onKeyUp={(e) => handleKeyUp(e, () => handleClick(x.id))}
            onClick={() => handleClick(x.id)}
            className={cx(styles.template, {
              [styles.selected]: template === x.id,
            })}
          >
            <GatsbyImage
              alt={x.name}
              image={previews[x.id].childImageSharp.gatsbyImageData}
            />
            <span>{x.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(Templates);
