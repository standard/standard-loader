'use strict'

var standard = require('standard')
var format = require('util').format
var assign = require('object-assign')
var loaderUtils = require('loader-utils')
var snazzy = require('snazzy')
var pkgConf = require('pkg-conf')
var multimatch = require('multimatch')

module.exports = function standardLoader (text) {
  var self = this
  var callback = this.async()
  var loaderOpts = loaderUtils.getLoaderConfig(this, 'standard')
  var packageOpts = pkgConf.sync('standard', { cwd: loaderOpts.cwd || process.cwd() })
  var ignoredFile = !!multimatch(this.resourcePath, packageOpts.ignore).length

  if (ignoredFile) return callback(null, text)

  var config = assign(
    packageOpts,
    loaderOpts,
    loaderUtils.parseQuery(this.query)
  )

  this.cacheable()

  standard.lintText(text, config, function (err, result) {
    if (err) return callback(err, text)
    if (result.errorCount === 0) return callback(err, text)

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
        self.emitWarning(data)
      })
      .end(warnings)
    } else {
      self.emitWarning(warnings)
    }
    callback(err, text)
  })
}
