const _ = require('lodash')
const TagModel = require('../model/tag')
const { ParameterException } = require('../utils/httpExceptions')
const request = require('../types/request')
const projection = require('../types/projectFields')
const response = require('../types/response')

module.exports = {
  async createOne(ctx) {
    const required = ['name']
    const { name } = ctx.request.body

    const isValid = ctx.ajv.validate(
      { properties: request.tag, required },
      { name }
    )

    if (!isValid) {
      throw new ParameterException(ctx.ajv.errors)
    }

    const data = await TagModel.findOne({ name })

    if (data) {
      return ctx.throw(400, '重复的标签名称')
    }

    try {
      var result = await TagModel.create({ name })
    } catch (error) {
      throw error
    }

    return _.pick(result, response.tag)
  },
  async queryList(ctx) {

    const result = await TagModel.aggregate([
      {
        $project: projection.tag,
      },
    ])

    return result
  },

  async updateOne(ctx) {
    const { id } = ctx.params
    const { name } = ctx.request.body
    const schema = { required: ['id', 'name'], properties: request.tag }

    const isValid = ctx.ajv.validate(schema, { name, id })

    const data = await TagModel.findOne({ name })
    if (data) {
      return ctx.throw(400, '重复的标签名称')
    }

    if (!isValid) {
      throw new ParameterException(ctx.ajv.errors)
    }

    try {
      await TagModel.findByIdAndUpdate(id, { $set: { name } })
    } catch (error) {
      throw error
    }

    ctx.status = 204
  },

  async deleteOne(ctx) {
    const { id } = ctx.params

    const isValid = ctx.ajv.validate(
      { required: ['id'], properties: request.tag },
      { id }
    )

    if (!isValid) {
      throw new ParameterException(ctx.ajv.errors)
    }

    await TagModel.findByIdAndRemove(id)

    ctx.status = 204
  },
}
