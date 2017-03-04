const path = require('path')
const config = {
  entry: {
    fail: path.join(__dirname, 'fail.js'),
    pass: path.join(__dirname, 'pass.js')
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].bundle.js'
  },

  module: {
    rules: [
      {
        // set up standard-loader as a preloader
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: path.join(__dirname, '..', '..', 'index.js'),
        options: {
          // config options passed to standard e.g.
          parser: 'babel-eslint'
        },
        exclude: /(node_modules|bower_components)/
      },
      {
        // ES6 transform
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        }
      }
    ],
  }
}

module.exports = config
