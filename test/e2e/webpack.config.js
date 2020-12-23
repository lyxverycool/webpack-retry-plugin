const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackRetryPlugin } = require('../../src');

module.exports = {
  devtool: false,
  entry: path.join(__dirname, '..', 'integration', 'fixtures', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin(),
    new WebpackRetryPlugin(),
  ],
};
