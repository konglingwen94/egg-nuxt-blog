const { Controller } = require('egg')
const _ = require('lodash')
const { ParameterException } = require('../utils/httpExceptions')
const CategoryModel = require('../model/category')
const { articleCategory: properties } = require('../types/request')
const {
  articleCategory: categoryProjectFields,
} = require('../types/projectField')
const { article: articleFields } = require('../types/projectField')
const { articleCategories: responseFields } = require('../types/response')

class CategoryController extends Controller {
  async createOne() {
    const { ctx, service } = this
    const payload = ctx.state.body
    console.log(__filename, ctx.state.body)

    const result = await service.category.queryOneByName(payload.name)

    if (result) {
      ctx.throw(400, '重复的分类名称')
    }

    return service.category.create(payload)
  }
  async queryList() {
    const { ctx, service } = this

    let result = await service.category.queryList()

    return result
  }

  async queryOne() {
    const { ctx } = this
    const { id } = ctx.params

    var result = await CategoryModel.findById(id)

    return _.pick(result, responseFields)
  }
  async deleteOne() {
    const { ctx, service } = this
    const { id } = ctx.params

    const result = await service.article.queryByCategoryID(id)

    if (result) {
      return ctx.throw(403, '此分类下有文章，不能删除此分类')
    }

    try {
      await CategoryModel.findByIdAndRemove(id)
    } catch (error) {
      throw error
    }

    ctx.status = 204
  }

  async updateOne() {
    const { ctx, service } = this
    const { id } = ctx.params
    let schema = { properties }
    const required = ['name']
    if (!id) {
      schema.required = required
    }
    const payload = _.pick(ctx.request.body, required)

    const valid = ctx.ajv.validate(schema, payload)
    if (!valid) {
      throw new ctx.helper.ParameterException(ctx.ajv.errors)
    }

    const hasOne = await service.category.queryOneByName(payload.name)
    if (hasOne) {
      return ctx.throw(400, '重复的分类名称')
    }

    const result = await (id
      ? CategoryModel.findByIdAndUpdate(
          id,
          { $set: payload },
          { new: true }
        ).select(categoryProjectFields)
      : CategoryModel.create(payload))

    return _.pick(result, responseFields)
  }
}

module.exports = CategoryController
