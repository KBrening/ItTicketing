const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
  devServer: {
    publicPath: '/',
    port: 8080,

    compress: true,
    historyApiFallback: true,
    hotOnly: true,

    noInfo: true,
    quiet: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['react-refresh/babel'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
});