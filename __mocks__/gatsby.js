import React from 'react';

const Gatsby = jest.requireActual('gatsby');

const fluidImageShapes = [
  {
    aspectRatio: 2,
    src: 'test_image.jpg',
    srcSet: 'some srcSet',
    srcSetWebp: 'some srcSetWebp',
    sizes: '(max-width: 600px) 100vw, 600px',
    base64: 'string_of_base64',
  },
  {
    aspectRatio: 3,
    src: 'test_image_2.jpg',
    srcSet: 'some other srcSet',
    srcSetWebp: 'some other srcSetWebp',
    sizes: '(max-width: 400px) 100vw, 400px',
    base64: 'string_of_base64',
  },
];

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
    childImageSharp: {
      fluid: fluidImageShapes[0],
    },
  },
  onyx: {
    childImageSharp: {
      fluid: fluidImageShapes[0],
    },
  },
  pikachu: {
    childImageSharp: {
      fluid: fluidImageShapes[1],
    },
  },
  gengar: {
    childImageSharp: {
      fluid: fluidImageShapes[0],
    },
  },
  castform: {
    childImageSharp: {
      fluid: fluidImageShapes[1],
    },
  },
  glalie: {
    childImageSharp: {
      fluid: fluidImageShapes[0],
    },
  },
  celebi: {
    childImageSharp: {
      fluid: fluidImageShapes[1],
    },
  },
});

module.exports = {
  ...Gatsby,
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(({ to, ...rest }) =>
    React.createElement('a', {
      ...rest,
      href: to,
    }),
  ),
  useStaticQuery,
};
