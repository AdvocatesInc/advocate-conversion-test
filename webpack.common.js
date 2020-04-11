const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    landing: './src/js/landing.js',
    after: './src/js/after.js',
  },
  module: {
    rules: [
      { 
        test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ 
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: 'src/img', to: 'img' },
    ]),
    new HtmlWebpackPlugin({
      title: 'Conversion Tester | Advocate',
      template: 'src/html/index.html',
      favicon: './src/img/favicon.png',
      chunks: ['landing'],
    }),
    new HtmlWebpackPlugin({
      title: 'Conversion Tester | Advocate',
      template: 'src/html/index.html',
      filename: 'conversion/index.html',
      favicon: './src/img/favicon.png',
      chunks: ['after'],
    }),
  ],
  output: {
    filename: '[name]-[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};
