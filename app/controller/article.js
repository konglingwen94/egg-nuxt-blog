const { Controller } = require('egg')
const { ObjectId } = require('mongoose').Types
const _ = require('lodash')
const ArticleModel = require('../model/article')
const CategoryModel = require('../model/category')
const {
  article: responseFields,
  articleCategories: categoryFields,
} = require('../types/response')
const { article: properties } = require('../types/request')
const { ParameterException } = require('../utils/httpExceptions')

module.exports = class ArticleController extends Controller {
  async queryList() {
    const { service, ctx } = this

    ctx.body = await service.article.queryList()
  }
  async queryCarouselList() {
    const { service, ctx } = this

    
    const result = service.article
      .queryList()
      .sort({ pv: 1 })
      .limit(4)
    ctx.body = await result
  }
  async querySuggestionList() {
    const { ctx, service } = this
    let { tagIdList } = ctx.query
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
    const { ctx } = this
    const data = _.pick(ctx.request.body, _.keys(properties))
    const { id } = ctx.params

    const valid = ctx.ajv.validate({ properties }, data)
    if (!valid) {
      throw new ParameterException(ctx.ajv.errors)
    }

    try {
      await ArticleModel.findByIdAndUpdate(id, {
        $set: data,
      })
    } catch (err) {
      throw err
    }
    ctx.status = 204
  }
  async delete() {
    const { ctx } = this

    const { idList } = ctx.request.body
    const schema = { properties, required: ['idList'] }
    const data = { idList }

    const valid = ctx.ajv.validate(schema, data)

    if (!valid) {
      throw new ParameterException(ctx.ajv.errors)
    }

    try {
      const isPublishedList = (await Promise.all(
        idList.map(id => {
          return ArticleModel.findByIdAndRemove(id).select('isPublished')
        })
      )).map(item => item.isPublished)

      await Promise.all(
        idList.map((id, index) => {
          return CategoryModel.updateMany(
            { articleIdList: id },
            {
              $pull: {
                articleIdList: id,
              },
              $inc: {
                publishedArticleCount: isPublishedList[index] ? -1 : 0,
              },
            }
          )
        })
      )
    } catch (error) {
      throw error
    }

    ctx.status = 204
  }
  async deleteOne() {
    const { ctx } = this
    const { id } = ctx.params
    try {
      await ArticleModel.findByIdAndRemove(id)
    } catch (error) {
      throw error
    }
    ctx.status = 204
  }
  async updatePublishStatus() {
    const { ctx } = this
    const required = ['isPublished']

    const { isPublished } = ctx.request.body

    const valid = ctx.ajv.validate({ properties, required }, { isPublished })

    if (!valid) {
      throw new ParameterException(ctx.ajv.errors)
    }

    const { id } = ctx.params
    try {
      await Promise.all([
        ArticleModel.findByIdAndUpdate(id, { $set: { isPublished } }),
        CategoryModel.updateMany(
          { articleIdList: id },
          { $inc: { publishedArticleCount: isPublished ? 1 : -1 } }
        ),
      ])
    } catch (error) {
      throw error
    }

    ctx.status = 204
  }
  async incrementPv() {
    const { ctx } = this
    try {
      var result = await ArticleModel.findByIdAndUpdate(ctx.params.id, {
        $inc: { pv: 1 },
      })
    } catch (error) {
      throw error
    }

    ctx.status = 204
  }
  async starOne() {
    const { ctx } = this
    const { id } = ctx.params
    const isValid = ctx.ajv.validate({ required: ['id'], properties }, { id })

    if (!isValid) {
      throw new ParameterException(ctx.ajv.errors)
    }

    await ArticleModel.findByIdAndUpdate(id, { $inc: { starCount: 1 } })

    ctx.status = 204
  }
}
