const { Controller } = require('egg')
const _ = require('lodash')
const TagModel = require('../model/tag')
const { ParameterException } = require('../utils/httpExceptions')
const request = require('../types/request')
const projection = require('../types/projectField')
const response = require('../types/response')

module.exports = class TagController extends Controller {
  async createOne() {
    const { ctx, service } = this

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
    const count = await service.article.countOwnTagArticle(result.id)
    ctx.body = _.defaults(_.pick(result, response.tag), count)
  }
  async queryList() {
    const { ctx, service } = this

    const result = await service.tag.aggretageList()

    await Promise.all(
      result.map(async item => {
        const count = await service.article.countOwnTagArticle(item.id)
        _.assign(item, count)
      })
    )
    ctx.body = result
  }

  async updateOne() {
    const { ctx } = this

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
  }

  async deleteOne() {
    const { ctx, service } = this

    const { id } = ctx.params

    const isValid = ctx.ajv.validate(
      { required: ['id'], properties: request.tag },
      { id }
    )
    const result = await service.article.queryOneByTagID(id)
    
    if (result) {
      
      return ctx.throw(403, '此标签下有文章')
    }
    if (!isValid) {
      throw new ParameterException(ctx.ajv.errors)
    }

    await TagModel.findByIdAndRemove(id)

    ctx.status = 204
  }
}
