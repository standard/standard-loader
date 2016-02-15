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
    preLoaders: [
      {
        // set up standard-loader as a preloader
        test: /\.jsx?$/,
        loader: path.join(__dirname, '..', '..', 'index.js'),
        exclude: /(node_modules|bower_components)/
      }
    ],
    loaders: [
      {
        // ES6 transform
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        }
      }
    ]
  },
  standard: {
    // config options passed to standard e.g.
    parser: 'babel-eslint'
  }
}

module.exports = config
