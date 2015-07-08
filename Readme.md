# standard-loader

webpack loader for linting your code with [feross/standard](https://github.com/feross/standard)

## Usage

```js
const webpack = require('webpack')

const config = {
  ...
  module: {
    preLoaders: [
      {
        // set up standard-loader as a preloader
        test: /\.jsx?$/,
        loader: 'standard',
        exclude: /(node_modules|bower_components)/
      }
    ],
    loaders: [
      ...
    ]
  },
  standard: {
    // config options passed to standard e.g.
    parser: 'babel-eslint'
  }
}

module.exports = config
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
Hash: 757e85681387cfef939a
Version: webpack 1.9.11
Time: 1152ms
   Asset     Size  Chunks             Chunk Names
build.js  2.01 kB       0  [emitted]  bundle
    + 1 hidden modules

WARNING in ./index.js
standard: Use JavaScript Standard Style (https://github.com/feross/standard)

<text>:1:0: Expected space or tab after // in comment.
<text>:3:25: Missing space before function parentheses.
<text>:3:27: A space is required after ','.
<text>:4:2: Expected indentation of 2 characters.
<text>:4:15: There should be no spaces inside this paren.
<text>:4:23: Extra semicolon.
<text>:7:0: Multiple blank lines not allowed.
```

## Licence

ISC
