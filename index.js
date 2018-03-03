'use strict'

var standard = require('standard')
var format = require('util').format
var loaderUtils = require('loader-utils')
var snazzy = require('snazzy')
var assign = require('object-assign')

module.exports = function standardLoader (input, map) {
  var webpack = this
  var callback = webpack.async()

  var config = assign({}, loaderUtils.getOptions(webpack))
  config.filename = webpack.resourcePath
  webpack.cacheable()

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
    .join('\n')

    if (config.snazzy !== false) {
      snazzy({encoding: 'utf8'})
      .on('data', function (data) {
        emit(data)
      })
      .end(warnings)
    } else {
      emit(warnings)
    }

    callback(null, input, map)
  })

  function emit (data) {
    if (config.error) return webpack.emitError(data)
    webpack.emitWarning(data)
  }
}
