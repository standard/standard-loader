var test = require('tape')
var webpack = require('webpack')
var config = require('./fixtures/webpack.config')

test('logs error', function (t) {
  webpack(config, function (err, stats) {
    t.ifError(err)
    t.ok(stats.compilation.warnings.length, 'has warnings')
    const warning = stats.compilation.warnings[0]
    warning && t.ok(/semicolon/gm.test(warning.warning), 'has warning about semicolon')
    t.end()
  })
})
