/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Montserrat`,
            variants: [`400`, `500`, `600`, `700`],
          },
        ],
      },
    },
    `gatsby-plugin-lodash`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Reactive Resume`,
        short_name: `RxResume`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#444444`,
        display: `standalone`,
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/assets/images/`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyCfC075KJNwsMWDTm6k8QCtWno48okM7wY",
          authDomain: "rx-resume.firebaseapp.com",
          databaseURL: "https://rx-resume.firebaseio.com",
          projectId: "rx-resume",
          storageBucket: "rx-resume.appspot.com",
          messagingSenderId: "493152774539",
          appId: "1:493152774539:web:ecaa1222f5e1bcf8fb678e",
          measurementId: "G-83G3Y6DPJ6",
        },
      },
    },
  ],
};
