import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import styles from './Screenshots.module.css';

const Screenshots = () => {
  const screenshots = useStaticQuery(graphql`
    query {
      screen1: file(relativePath: { eq: "screenshots/screen-1.png" }) {
        childImageSharp {
          original {
            src
          }
          fixed(width: 320) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      screen2: file(relativePath: { eq: "screenshots/screen-2.png" }) {
        childImageSharp {
          original {
            src
          }
          fixed(width: 320) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      screen3: file(relativePath: { eq: "screenshots/screen-3.png" }) {
        childImageSharp {
          original {
            src
          }
          fixed(width: 320) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      screen4: file(relativePath: { eq: "screenshots/screen-4.png" }) {
        childImageSharp {
          original {
            src
          }
          fixed(width: 320) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      screen5: file(relativePath: { eq: "screenshots/screen-5.png" }) {
        childImageSharp {
          original {
            src
          }
          fixed(width: 320) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <div className="mt-24 mb-4">
      <div className="text-xl uppercase font-bold mb-8">Screenshots</div>

      <div className="flex w-full overflow-x-scroll">
        {Object.keys(screenshots).map((x) => (
          <a
            target="_blank"
            rel="noreferrer"
            className={styles.screenshot}
            key={screenshots[x].childImageSharp.original.src}
            href={screenshots[x].childImageSharp.original.src}
          >
            <span className="sr-only">Reactive Resume Screenshot</span>
            <GatsbyImage
              fixed={screenshots[x].childImageSharp.fixed}
              alt="Reactive Resume Screenshot"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Screenshots;
