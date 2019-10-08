const { Controller } = require('egg')
const { ObjectId } = require('mongoose').Types
const _ = require('lodash')
const responseFields = require('../types/response').article
const properties = require('../types/request').article
const { ParameterException } = require('../utils/httpExceptions')

class ArticleController extends Controller {
  async queryList() {
    const { service, ctx } = this

    ctx.body = await service.article.queryList()
  }
  async queryCarouselList() {
    const { service, ctx } = this

    const result = await service.article.queryList()

    ctx.body = result.sort((b, a) => a.pv - b.pv).slice(0, 4)
  }
  async querySuggestionList() {
    const { ctx, service } = this
    let { tagIdList } = ctx.query

    if (!tagIdList) {
      return (ctx.body = [])
    }

    tagIdList =
      typeof tagIdList === 'string'
        ? [ObjectId(tagIdList)]
        : tagIdList.map(id => ObjectId(id))
    ctx.body = await service.article.queryByTagIdList(tagIdList)
  }

  async queryOne() {
    const { ctx, service } = this
    const { id } = ctx.params
    const result = await service.article.queryOneById(id)

    ctx.body = result
  }
  async createOne() {
    const { ctx, service } = this
    const required = ['title', 'content', 'categoryID', 'isPublished']

    const data = _.pick(ctx.request.body, required.concat('tagIdList'))

    const { tagIdList } = data

    const valid = ctx.ajv.validate({ required, properties }, data)
    if (!valid) {
      throw new ParameterException(ctx.ajv.errors)
    }

    try {
      var result = await service.article.create(data)
    } catch (error) {
      throw error
    }

    ctx.state.status = 201
    ctx.body = _.pick(result, responseFields)
  }
  async updateOne() {
    const { ctx, service } = this
    const data = _.pick(ctx.request.body, _.keys(properties))
    const { id } = ctx.params

    const valid = ctx.ajv.validate({ properties }, data)
    if (!valid) {
      throw new ParameterException(ctx.ajv.errors)
    }

    try {
      await service.article.queryByIdAndUpdate(id, data)
    } catch (err) {
      throw err
    }
    ctx.status = 204
  }
  async delete() {
    const { ctx, service } = this

    const { idList } = ctx.request.body
    const schema = { properties, required: ['idList'] }
    const data = { idList }

    const valid = ctx.ajv.validate(schema, data)

    if (!valid) {
      throw new ParameterException(ctx.ajv.errors)
    }

    try {
      await service.article.deleteMany(idList)
    } catch (error) {
      throw error
    }

    ctx.status = 204
  }
  async deleteOne() {
    const { ctx, service } = this
    const { id } = ctx.params
    try {
      await service.article.queryByIdAndRemove(id)
    } catch (error) {
      throw error
    }
    ctx.status = 204
  }
  async updatePublishStatus() {
    const { ctx, service } = this
    const required = ['isPublished']

    const { isPublished } = ctx.request.body

    const valid = ctx.ajv.validate({ properties, required }, { isPublished })

    if (!valid) {
      throw new ParameterException(ctx.ajv.errors)
    }

    const { id } = ctx.params
    try {
      await service.article.updatePublishStatus(id, isPublished)
    } catch (error) {
      throw error
    }

    ctx.status = 204
  }
  async incrementPv() {
    const { ctx, service } = this
    try {
      await service.article.incrementPv(ctx.params.id)
    } catch (error) {
      throw error
    }

    ctx.status = 204
  }
  async starOne() {
    const { ctx, service } = this
    const { id } = ctx.params
    const isValid = ctx.ajv.validate({ required: ['id'], properties }, { id })

    if (!isValid) {
      throw new ParameterException(ctx.ajv.errors)
    }
    await service.article.queryByIdAndStarOne(id)

    ctx.status = 204
  }
}
module.exports = ArticleController
