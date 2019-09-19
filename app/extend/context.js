const Ajv = require('ajv')

exports.ajv = new Ajv({
  jsonPointers: true,
  allErrors: true,
})
