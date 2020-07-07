const MiniCssExtractPlugin = require("mini-css-extract-plugin");

exports.onCreateWebpackConfig = ({ actions, stage, getConfig }) => {
  if (stage === "build-javascript") {
    const config = getConfig();
    const index = config.plugins.findIndex((plugin) => {
      return plugin.constructor.name === "MiniCssExtractPlugin";
    });
    config.plugins[index] = new MiniCssExtractPlugin({ ignoreOrder: true });
    actions.replaceWebpackConfig(config);
  }
};
