const { Controller } = require('egg')
const _ = require('lodash')
const { ParameterException } = require('../utils/httpExceptions')
const ArticleCategoryModel = require('../model/category')
const { articleCategory: properties } = require('../types/request')
const {
  articleCategory: categoryProjectFields,
} = require('../types/projectFields')
const { article: articleFields } = require('../types/projectFields')
const { articleCategories: responseFields } = require('../types/response')

class CategoryController extends Controller {
  async createOne(ctx) {
    const required = ['name']

    const payload = _.pick(ctx.request.body, required)

    const schema = { properties, required }
    const valid = ctx.ajv.validate(schema, payload)

    if (!valid) {
      throw ParameterException(ctx.ajv.errors)
    }
    const result = await ArticleCategoryModel.findOne({ name: payload.name })

    if (result) {
      return ctx.throw(400, '重复的分类名称')
    }

    try {
      var data = await ArticleCategoryModel.create(payload)
    } catch (error) {
      throw error
    }
    ctx.state.status = 201

    return _.pick(data, responseFields)
  }
  async queryList(ctx) {
    var result = await ArticleCategoryModel.aggregate([
      {
        $project: categoryProjectFields,
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ])

    ctx.body = result
  }

  async queryOne(ctx) {
    const { id } = ctx.params

    var result = await ArticleCategoryModel.findById(id)

    ctx.body = _.pick(result, responseFields)
  }
  async deleteOne(ctx) {
    const { id } = ctx.params

    const result = await ArticleCategoryModel.findById(id)

    if (result.articleIdList.length) {
      return ctx.throw(400, '此分类下有文章，不能删除此分类')
    }
    await ArticleCategoryModel.findById(id)

    try {
      await ArticleCategoryModel.findByIdAndRemove(id)
    } catch (error) {
      throw error
    }

    ctx.state.status = 204
  }

  async updateOne(ctx) {
    const { id } = ctx.params
    let schema = { properties }
    const required = ['name']
    if (!id) {
      schema.required = required
    }
    const payload = _.pick(ctx.request.body, required)

    const valid = ctx.ajv.validate(schema, payload)
    if (!valid) {
      throw new ParameterException(ctx.ajv.errors)
    }

    const hasOne = await ArticleCategoryModel.findOne({ name: payload.name })
    if (hasOne) {
      return ctx.throw(400, '重复的分类名称')
    }

    try {
      var result = await (id
        ? ArticleCategoryModel.findByIdAndUpdate(
            id,
            { $set: payload },
            { new: true }
          ).select(categoryProjectFields)
        : ArticleCategoryModel.create(payload))
    } catch (error) {
      throw error
    }
    ctx.body = _.pick(result, responseFields)
  }
}

module.exports = CategoryController
