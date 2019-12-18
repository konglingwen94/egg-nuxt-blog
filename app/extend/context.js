const Ajv = require('ajv')
const validationRule = require('../types/request')
const responseFields = require('../types/response')

const projectFields = require('../types/projectField')

const ajv = new Ajv({ allErrors: true, jsonPointers: true })

module.exports = {
  // requestParams,
  responseFields,
  projectFields,
  validationRule,
  ajv
}
