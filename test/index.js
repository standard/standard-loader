var test = require('tape')
var webpack = require('webpack')
var config = require('./fixtures/webpack.config')
var assign = require('object-assign')
var hasAnsi = require('has-ansi')

test('logs warning with snazzy', function (t) {
  webpack(config, function (err, stats) {
    t.ifError(err)
    t.ok(stats.compilation.warnings.length, 'has warnings')
    t.ok(!stats.compilation.errors.length, 'has no errors')
    t.ok(stats.compilation.warnings.some(function (warning) {
      return /semicolon/gm.test(warning.message)
    }), 'has warning about semicolon')

    t.ok(stats.compilation.warnings.every(function (warning) {
      return hasAnsi(warning.message)
    }), 'uses snazzy output')
    t.end()
  })
})

test('can disable snazzy output', function (t) {
  var preloader = assign({}, config.module.rules[0], {
    options: {
      snazzy: false
    }
  })

  config.module.rules[0] = preloader
  webpack(config, function (err, stats) {
    t.ifError(err)
    t.ok(stats.compilation.warnings.length, 'has warnings')
    t.ok(!stats.compilation.errors.length, 'has no errors')
    t.ok(stats.compilation.warnings.some(function (warning) {
      return /semicolon/gm.test(warning.message)
    }), 'has warning about semicolon')

    t.ok(stats.compilation.warnings.every(function (warning) {
      return !hasAnsi(warning.message)
    }), 'snazzy output disabled')
    t.end()
  })
})

test('can work with standardx', function (t) {
  var preloader = assign({}, config.module.rules[0], {
    options: {
      standard: 'standardx'
    }
  })

  const old = config.module.rules[0]
  config.module.rules[0] = preloader
  webpack(config, function (err, stats) {
    t.ifError(err)
    t.ok(!stats.compilation.errors.length, 'has no errors')
    t.ok(stats.compilation.warnings.length, 'has some warnings')
    t.ok(!stats.compilation.warnings.some(function (warning) {
      return /semicolon/gm.test(warning.message)
    }), 'has no error about semicolon')
    t.end()
  })
  config.module.rules[0] = old
})

test('can work with standardx as a module', function (t) {
  var preloader = assign({}, config.module.rules[0], {
    options: {
      standard: require('standardx')
    }
  })

  const old = config.module.rules[0]
  config.module.rules[0] = preloader
  webpack(config, function (err, stats) {
    t.ifError(err)
    t.ok(!stats.compilation.errors.length, 'has no errors')
    t.ok(stats.compilation.warnings.length, 'has some warnings')
    t.ok(!stats.compilation.warnings.some(function (warning) {
      return /semicolon/gm.test(warning.message)
    }), 'has no error about semicolon')
    t.end()
  })
  config.module.rules[0] = old
})

test('logs error', function (t) {
  var preloader = assign({}, config.module.rules[0], {
    options: {
      error: true
    }
  })

  config.module.rules[0] = preloader
  webpack(config, function (err, stats) {
    t.ifError(err)
    t.ok(stats.compilation.errors.length, 'has errors')
    t.ok(!stats.compilation.warnings.length, 'has no warnings')

    t.ok(stats.compilation.errors.some(function (error) {
      return /semicolon/gm.test(error.message)
    }), 'has error about semicolon')
    t.end()
  })
})

test('works without options', function (t) {
  var preloader = assign({}, config.module.rules[0])
  delete preloader.options

  config.module.rules[0] = preloader
  webpack(config, function (err, stats) {
    t.ifError(err)
    t.ok(stats.compilation.warnings.length, 'has warnings')
    t.ok(!stats.compilation.errors.length, 'has no errors')
    t.end()
  })
})
