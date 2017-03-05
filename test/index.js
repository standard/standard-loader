var test = require('tape')
var webpack = require('webpack')
var config = require('./fixtures/webpack.config')
var assign = require('object-assign')

test('logs error with snazzy', function (t) {
  webpack(config, function (err, stats) {
    t.ifError(err)
    t.ok(stats.compilation.warnings.length === 2)
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

test('excludes files matching ignore pattern', function (t) {
  var preloader = assign({}, config.module.preLoaders[0], {
    query: {
      cwd: 'test/fixtures'
    }
  })

  config.module.preLoaders[0] = preloader

  webpack(config, function (err, stats) {
    t.ifError(err)
    t.ok(stats.compilation.warnings.length === 1)
    t.end()
  })
})
