const Ajv = require('ajv')
const requestParams = require('../types/request')
const responseFields = require('../types/response')

const projectFields = require('../types/projectField')


const ajv = new Ajv({ allErrors: true, jsonPointers: true })



module.exports = {
  requestParams,
  responseFields,
  projectFields,
  ajv,
}
