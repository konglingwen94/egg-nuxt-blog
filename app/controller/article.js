const { Controller } = require('egg')
const { ObjectId } = require('mongoose').Types
const _ = require('lodash')
const responseFields = require('../types/response').article
const properties = require('../types/request').article
const { ParameterException } = require('../utils/httpExceptions')

class ArticleController extends Controller {
  async queryList() {
    const { service, ctx } = this
    const dataList = await service.article.queryList()

    return dataList
  }
  async queryCarouselList() {
    const { service, ctx } = this

    return await service.article.queryCarouselList()
  }
  async querySuggestionList() {
    const { ctx, service } = this
    let { tagIdList } = ctx.query

    if (!tagIdList) {
      return []
    }

    tagIdList =
      typeof tagIdList === 'string'
        ? [ObjectId(tagIdList)]
        : tagIdList.map(id => ObjectId(id))
    return await service.article.queryByTagIdList(tagIdList)
  }

  async queryOne() {
    const { ctx, service } = this
    const { id } = ctx.params
    const result = await service.article.queryOneById(id)

    return result
  }
  async createOne() {
    const { ctx, service } = this

    console.log(__filename,ctx.state.body)

    var result = await service.article.create(ctx.state.body)

    ctx.status = 201
    return result
  }
  async updateOne() {
    const { ctx, service } = this
   
    const { id } = ctx.params

    await service.article.queryByIdAndUpdate(id, ctx.state.body)
   
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

    // console.log(id)
    await service.article.queryByIdAndRemove(id)
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
