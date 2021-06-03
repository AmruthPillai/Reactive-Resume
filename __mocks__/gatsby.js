import React from 'react';

import { delay } from '../src/utils/index';

const Gatsby = jest.requireActual('gatsby');

const imageData = {
  images: {
    fallback: {
      src: `image_src.jpg`,
      srcSet: `image_src_set.jpg 1x`,
    },
  },
  layout: `fixed`,
  width: 1,
  height: 2,
};
const childImageSharp = { gatsbyImageData: imageData };

const useStaticQuery = () => ({
  site: {
    siteMetadata: {
      title: 'Test title',
      description: 'Test description',
      author: 'Test author',
      siteUrl: 'https://testsiteurl/',
    },
  },
  file: {
    childImageSharp,
  },
  onyx: {
    childImageSharp,
  },
  pikachu: {
    childImageSharp,
  },
  gengar: {
    childImageSharp,
  },
  castform: {
    childImageSharp,
  },
  glalie: {
    childImageSharp,
  },
  celebi: {
    childImageSharp,
  },
});

const defaultDelayInMilliseconds = 100;

const navigate = async () => {
  await delay(defaultDelayInMilliseconds);

  return Promise.resolve();
};

module.exports = {
  ...Gatsby,
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(({ to, ...rest }) =>
    React.createElement('a', {
      ...rest,
      href: to,
    }),
  ),
  navigate: jest.fn(navigate),
  useStaticQuery,
};
