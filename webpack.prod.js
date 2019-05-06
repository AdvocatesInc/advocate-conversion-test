const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: "[name]-[hash].css",
    }),
    new webpack.DefinePlugin({
      HOST: JSON.stringify(process.env.CONVERSION_API_HOST || 'api.adv.gg'),
      PROTOCOL: JSON.stringify(process.env.CONVERSION_API_PROTOCOL || 'https'),
    })
  ]
});
