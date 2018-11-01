'use strict'

var format = require('util').format
var loaderUtils = require('loader-utils')
var snazzy = require('snazzy')
var assign = require('object-assign')

module.exports = function standardLoader (input, map) {
  let standard
  var webpack = this
  var callback = webpack.async()
  webpack.cacheable()

  var config = assign({}, loaderUtils.getOptions(webpack))
  config.filename = webpack.resourcePath

  // allow configurable 'standard' e.g. standardx
  if (config.standard && typeof config.standard === 'string') {
    standard = require(config.standard)
  }
  // IF standard is not defined after checking config standard, set standard require standard :-)
  if (standard === undefined) {
    standard = require('standard')
  }

  delete config.standard

  standard.lintText(input, config, function (err, result) {
    if (err) return callback(err, input, map)
    if (result.errorCount === 0) return callback(null, input, map)

    var warnings = result.results.reduce(function (items, result) {
      return items.concat(result.messages.map(function (message) {
        return format(
          '%s:%d:%d: %s%s',
          result.filePath, message.line || 0, message.column || 0, message.message,
          !config.verbose ? ' (' + message.ruleId + ')' : ''
        )
      }))
    }, [])

    if (config.snazzy !== false) {
      snazzy({encoding: 'utf8'})
        .on('data', function (data) {
          emit(new StandardJSError(data))
        })
        .end(warnings.join('\n'))
    } else {
      warnings.forEach(function (warning) {
        emit(new StandardJSError(warning))
      })
    }

    callback(null, input, map)
  })

  function emit (data) {
    if (config.error) return webpack.emitError(data)
    webpack.emitWarning(data)
  }
}

class StandardJSError extends Error {
  constructor (messages) {
    super()
    this.name = 'StandardJSError'
    this.message = messages
    this.stack = ''
  }

  inspect () {
    return this.message
  }
}
