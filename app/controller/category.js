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

    const required = ['name']
    console.log(ctx.requestParams)
    const payload = _.pick(ctx.request.body, required)

    const schema = { properties: ctx.requestParams.category, required }
    const valid = ctx.ajv.validate(schema, payload)

    if (!valid) {
      throw new ctx.helper.ParameterException(ctx.ajv.errors)
    }

    const result = await service.category.queryOneByName(payload.name)

    if (result) {
      return ctx.throw(400, '重复的分类名称')
    }

    try {
      var data = await service.category.create(payload)
    } catch (error) {
      throw error
    }
    ctx.status = 201

    ctx.body = _.pick(data, ctx.responseFields.category)
  }
  async queryList() {
    const { ctx, service } = this

    // const result = await service.category.List()
    const result = await service.category.aggregateList()
    
    ctx.body = result
  }

  async queryOne() {
    const { ctx } = this
    const { id } = ctx.params

    var result = await CategoryModel.findById(id)

    ctx.body = _.pick(result, responseFields)
  }
  async deleteOne() {
    const { ctx, service } = this
    const { id } = ctx.params

    const result = await service.article.queryByCategoryID(id)
     
     
    if (result) {
      return ctx.throw(400, '此分类下有文章，不能删除此分类')
    }
   

    try {
      await CategoryModel.findByIdAndRemove(id)
    } catch (error) {
      throw error
    }

    ctx.status = 204
  }

  async updateOne() {
    const { ctx } = this
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

    const hasOne = await CategoryModel.findOne({ name: payload.name })
    if (hasOne) {
      return ctx.throw(400, '重复的分类名称')
    }

    try {
      var result = await (id
        ? CategoryModel.findByIdAndUpdate(
            id,
            { $set: payload },
            { new: true }
          ).select(categoryProjectFields)
        : CategoryModel.create(payload))
    } catch (error) {
      throw error
    }
    ctx.body = _.pick(result, responseFields)
  }
}

module.exports = CategoryController
