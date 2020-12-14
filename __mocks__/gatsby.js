import React from 'react';
const Gatsby = jest.requireActual('gatsby');

const fluidImagesShapeMock = [
  {
    aspectRatio: 2,
    src: `test_image.jpg`,
    srcSet: `some srcSet`,
    srcSetWebp: `some srcSetWebp`,
    sizes: `(max-width: 600px) 100vw, 600px`,
    base64: `string_of_base64`,
  },
  {
    aspectRatio: 3,
    src: `test_image_2.jpg`,
    srcSet: `some other srcSet`,
    srcSetWebp: `some other srcSetWebp`,
    sizes: `(max-width: 600px) 100vw, 600px`,
    base64: `string_of_base64`,
    media: `only screen and (min-width: 768px)`,
  },
];

module.exports = {
  ...Gatsby,
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(({ to, ...rest }) =>
    React.createElement(`a`, {
      ...rest,
      href: to,
    }),
  ),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn().mockReturnValue({
    site: {
      siteMetadata: {
        title: '',
        description: '',
        author: '',
        siteUrl: '',
      },
    },
    file: {
      childImageSharp: {
        fluid: fluidImagesShapeMock[0],
      },
    },
  }),
};
