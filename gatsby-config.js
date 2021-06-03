require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Reactive Resume',
    siteUrl: 'https://rxresu.me',
    description: 'A free and open source resume builder.',
    version: '2.7.1',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public|_this_is_virtual_fs_path_)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Reactive Resume',
        short_name: 'Reactive Resume',
        start_url: '/',
        background_color: '#212121',
        icon: `static/images/logo.png`,
        orientation: 'landscape',
        theme_color: '#212121',
        display: 'standalone',
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-plugin-webfonts',
      options: {
        fonts: {
          google: [
            {
              family: 'Lato',
              variants: ['400', '700'],
              subsets: ['latin-ext'],
            },
            {
              family: 'Montserrat',
              variants: ['400', '500', '600', '700'],
              subsets: ['latin-ext'],
            },
            {
              family: 'Nunito',
              variants: ['400', '600', '700'],
              subsets: ['latin-ext'],
            },
            {
              family: 'Open Sans',
              variants: ['400', '600', '700'],
              subsets: ['latin-ext'],
            },
            {
              family: 'Raleway',
              variants: ['400', '500', '700'],
              subsets: ['latin-ext'],
            },
            {
              family: 'Rubik',
              variants: ['400', '500', '700'],
              subsets: ['latin-ext'],
            },
            {
              family: 'Source Sans Pro',
              variants: ['400', '600', '700'],
              subsets: ['latin-ext'],
            },
            {
              family: 'Titillium Web',
              variants: ['400', '600', '700'],
              subsets: ['latin-ext'],
            },
          ],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: ['/app/*'] },
    },
    {
      resolve: 'gatsby-plugin-material-ui',
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'articles',
        path: `${__dirname}/src/articles`,
      },
    },
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/static/images/`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-firebase',
      options: {
        credentials: {
          apiKey: process.env.FIREBASE_APIKEY,
          authDomain: process.env.FIREBASE_AUTHDOMAIN,
          databaseURL: process.env.FIREBASE_DATABASEURL,
          projectId: process.env.FIREBASE_PROJECTID,
          storageBucket: process.env.FIREBASE_STORAGEBUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
          appId: process.env.FIREBASE_APPID,
          measurementId: process.env.FIREBASE_MEASUREMENTID,
        },
      },
    },
    'gatsby-plugin-sitemap',
  ],
};
