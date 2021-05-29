exports.onCreateWebpackConfig = ({ stage, actions, plugins, getConfig }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        path: require.resolve('path-browserify'),
      },
      fallback: {
        fs: false,
      },
    },
  });

  if (stage === 'build-javascript' || stage === 'develop') {
    actions.setWebpackConfig({
      plugins: [plugins.provide({ process: 'process/browser' })],
    });
  }

  const config = getConfig();
  const miniCssExtractPlugin = config.plugins.find(
    (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin',
  );
  miniCssExtractPlugin && (miniCssExtractPlugin.options.ignoreOrder = true);
  actions.replaceWebpackConfig(config);

  if (stage === 'build-html') {
    actions.setWebpackConfig({
      externals: [/^firebase/],
    });
  }
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/r/)) {
    page.matchPath = '/r/*';
    createPage(page);
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const blogTemplate = require.resolve(`./src/components/Blog.js`);

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: blogTemplate,
      context: {
        slug: node.frontmatter.slug,
      },
    });
  });
};
