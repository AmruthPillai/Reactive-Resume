require('dotenv').config();

module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Lato',
            variants: ['400', '700'],
          },
          {
            family: 'Montserrat',
            variants: ['400', '500', '600', '700'],
          },
          {
            family: 'Nunito',
            variants: ['400', '600', '700'],
          },
          {
            family: 'Open Sans',
            variants: ['400', '600', '700'],
          },
          {
            family: 'Raleway',
            variants: ['400', '500', '700'],
          },
          {
            family: 'Rubik',
            variants: ['400', '500', '700'],
          },
          {
            family: 'Source Sans Pro',
            variants: ['400', '600', '700'],
          },
          {
            family: 'Titillium Web',
            variants: ['400', '600', '700'],
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: ['/app/*'] },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Reactive Resume',
        short_name: 'RxResume',
        description: 'A free and open-source resume builder.',
        start_url: '/?source=pwa',
        icon: `static/images/logo.png`,
        background_color: '#FFFFFF',
        theme_color: '#444444',
        display: 'standalone',
        shortcuts: [
          {
            name: 'Dashboard',
            short_name: 'Dashboard',
            description: 'View/manage all your resumes at a glance',
            url: '/app/dashboard?source=pwa',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: ['', '/app/*'],
      },
    },
    'gatsby-plugin-lodash',
    {
      resolve: `gatsby-plugin-material-ui`,
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
  ],
};
