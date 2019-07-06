# standard-loader

`webpack` loader for linting your code with [JavaScript Standard Style](https://github.com/standard/standard)

[![Build Status](https://travis-ci.org/standard/standard-loader.png?branch=master)](https://travis-ci.org/standard/standard-loader)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

[![NPM](https://nodei.co/npm/standard-loader.png?downloads=true)](https://nodei.co/npm/standard-loader/)
[![NPM](https://nodei.co/npm-dl/standard-loader.png?months=3&height=2)](https://nodei.co/npm/standard-loader/)

## Installation

* Install the desired version of `standard` alongside `standard-loader`.

```
npm install --save-dev standard-loader standard
```

## Usage

### webpack 2+

```js
// webpack.config.js
const webpack = require('webpack')

const config = {
  // ...
  module: {
    rules: [
      {
        // set up standard-loader as a preloader
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'standard-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          // config options to be passed through to standard e.g.
          parser: 'babel-eslint'
        }
      },
      // other loaders...
    ]
  }
}

```

### webpack 1

webpack 1.x is no longer supported as of [`standard-loader` version `6.0.0`](https://github.com/standard/standard-loader/compare/5.0.0...6.0.0).  PRs for webpack 1.x support will be accepted on the [5.x branch](https://github.com/standard/standard-loader/tree/5.x).

### Configuration Options

```js
{
  // Emit errors instead of warnings (default = false)
  error: false,
  // enable snazzy output (default = true)
  snazzy: true,
  // configure alternative checker e.g. 'standardx' (default = 'standard')
  standard: 'standard',
  // all other config options are passed through to standard e.g.
  parser: 'babel-eslint'
}
```

### Example Input

```js
//code not conforming to standard style

module.exports = function(a,b) {
    console.log( a, b);
}

```

### Example Output

```
> webpack
Hash: c5c5efad42144b469dcd
Version: webpack 4.0.1
Time: 974ms
Built at: 2018-3-3 19:54:20
   Asset      Size  Chunks             Chunk Names
build.js  3.38 KiB  bundle  [emitted]  bundle
Entrypoint bundle = build.js
[./index.js] 592 bytes {bundle} [built] [1 warning]
       single entry ./index.js  bundle

WARNING in ./index.js

/Users/timoxley/Projects/standard-loader/example/index.js
  1:1   error  Expected space or tab after '//' in comment   spaced-comment
  3:26  error  Missing space before function parentheses     space-before-function-paren
  3:28  error  A space is required after ','                 comma-spacing
  4:1   error  Expected indentation of 2 spaces but found 4  indent
  4:16  error  There should be no spaces inside this paren   space-in-parens
  4:23  error  Extra semicolon                               semi
  6:1   error  More than 1 blank line not allowed            no-multiple-empty-lines

✖ 7 problems
```

## Licence

ISC
