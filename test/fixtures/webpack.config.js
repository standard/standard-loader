const path = require('path')
const config = {
  mode: 'development',
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
        enforce: 'pre',
        // set up standard-loader as a preloader
        test: /\.jsx?$/,
        loader: path.join(__dirname, '..', '..', 'index.js'),
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
