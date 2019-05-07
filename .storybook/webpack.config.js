const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("babel-loader"),
    options: {
      presets: [["react-app", { flow: false, typescript: true }]]
    }
  });
  config.module.rules.push({
    test: /\.less$/,
    use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
  });
  config.resolve.extensions.push(".ts", ".tsx");

  config.plugins.push(new MiniCssExtractPlugin());
  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env": {
        ...process.env,
        LESS: true
      }
    })
  );

  return config;
};
