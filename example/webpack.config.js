'use strict'

const webpack = require('webpack')

const config = {
  context: __dirname,
  entry: {
    bundle: './index.js',
  },
  output: {
    path: __dirname,
    filename: 'build.js',
  },
  stats: {
    colors: true,
    reasons: true, // verbose errors
    chunks: false  // clean summary output
  },
  module: {
    preLoaders: [
      {test: /\.jsx?$/, loader: '../', exclude: /(node_modules|bower_components)/}
    ],
    loaders: [
      {
        // Lint ES6 with standard
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader?optional[]=runtime'
      }
    ]
  },
  standard: {
    // config options passed to standard
    global: [ "globalVar", "globalVar2" ]
  }
}

module.exports = config

