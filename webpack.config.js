'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const path = require('path');
const webpack = require('webpack');
const entries = require('./js/entry');

let config = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, './build/js/'),
    publicPath: 'build/js',
    filename: '[name].js',
    chunkFilename: 'vendor.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
  plugins: [],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 9000,
  },
  devtool: NODE_ENV == 'development' ? 'eval-source-map' : false,
};

module.exports = config;
