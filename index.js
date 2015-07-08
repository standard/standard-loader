'use strict'

const standard = require('standard')
const format = require('util').format
const assign = require('object-assign')
const loaderUtils = require('loader-utils')

module.exports = function standardLoader (text) {
  const self = this
  const callback = this.async()

  const config = assign(
    this.options.standard || {},
    loaderUtils.parseQuery(this.query)
  )

  this.cacheable()

  standard.lintText(text, config, function (err, result) {
    if (err) return callback(err, text)
    if (result.errorCount === 0) return callback(err, text)

    const header = 'standard: Use JavaScript Standard Style ' +
      '(https://github.com/feross/standard)\n'

    const warnings = result.results.reduce(function (items, result) {
      return items.concat(result.messages.map(function (message) {
        return format(
          '%s:%d:%d: %s',
          result.filePath, message.line || 0, message.column || 0, message.message
        )
      }))
    }, [header])

    self.emitWarning(warnings.join('\n'))
    callback(err, text)
  })
}
