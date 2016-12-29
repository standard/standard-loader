var test = require('tape')
var webpack = require('webpack')
var config = require('./fixtures/webpack.config')
var assign = require('object-assign')

test('logs warning with snazzy', function (t) {
  webpack(config, function (err, stats) {
    t.ifError(err)
    t.ok(stats.compilation.warnings.length, 'has warnings')
    t.ok(!stats.compilation.errors.length, 'has no errors')
    var warning = stats.compilation.warnings[0]
    t.ok(warning && /semicolon/gm.test(warning.warning), 'has warning about semicolon')
    t.ok(warning && warning.warning.indexOf('\n\u001b') !== -1, 'uses snazzy output')
    t.end()
  })
})

test('can disable snazzy output', function (t) {
  var preloader = assign({}, config.module.preLoaders[0], {
    query: {
      snazzy: false
    }
  })

  config.module.preLoaders[0] = preloader
  webpack(config, function (err, stats) {
    t.ifError(err)
    t.ok(stats.compilation.warnings.length, 'has warnings')
    t.ok(!stats.compilation.errors.length, 'has no errors')
    var warning = stats.compilation.warnings[0]
    t.ok(warning && /semicolon/gm.test(warning.warning), 'has warning about semicolon')
    t.equal(warning.warning.indexOf('\n\u001b'), -1, 'snazzy output disabled')
    t.end()
  })
})

test('logs error', function (t) {
  config.standard.emitErrors = true
  webpack(config, function (err, stats) {
    t.ifError(err)
    t.ok(stats.compilation.errors.length, 'has errors')
    const error = stats.compilation.errors[0]
    t.ok(error && /semicolon/gm.test(error.error), 'has error about semicolon')
    t.end()
  })
})
