'use strict'

const config = {
  mode: 'development',
  context: __dirname,
  entry: {
    bundle: './index.js'
  },
  output: {
    path: __dirname,
    filename: 'build.js'
  },
  stats: {
    colors: true,
    reasons: true, // verbose errors
    chunks: false // clean summary output
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        // set up standard-loader as a preloader
        test: /\.jsx?$/,
        loader: '../',
        exclude: /(node_modules|bower_components)/,
        options: {
          // config options passed to standard e.g.
          parser: 'babel-eslint'
        }
      }
    ]
  }

}

module.exports = config
