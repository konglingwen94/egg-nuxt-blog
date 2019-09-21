const { Controller } = require('egg')
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

  async querySuggestionList() {
    const { ctx } = this
    let { categoryIdList } = ctx.query
    if (typeof categoryIdList === 'string') {
      categoryIdList = [categoryIdList].map(id => ObjectId(id))
    } else {
      categoryIdList = categoryIdList.map(id => ObjectId(id))
    }

    ctx.body = await ArticleModel.aggregate([
      {
        $match: {
          categoryIds: {
            $in: categoryIdList,
          },
        },
      },
      {
        $project: articleFields,
      },
    ])
  }
  async queryListByCategoryId() {
    const { ctx } = this

    const { id } = ctx.params

    const result = await ArticleModel.find({
      categoryIds: { $all: [id] },
    }).sort({ createdAt: -1 })
    ctx.body = result.map(item => {
      return _.pick(item, responseFields)
    })
  }
  async queryPublishedList() {
    const { ctx } = this
    const result = await ArticleModel.find({ isPublished: true })
      .populate('categoryIds')
      .sort({ createdAt: -1 })

    ctx.body = result.map(item => {
      item.categories = item.categoryIds
      item.categoryIds = item.categories.map(item => item._id)
      return _.pick(item, responseFields)
    })
  }

  async queryListByOptions() {
    const { ctx } = this
    const payload = _.pick(ctx.query, _.keys(properties))

    const valid = ctx.ajv.validate({ properties }, payload)

    if (!valid) {
      throw new ParameterException(ctx.ajv.errors)
    }

    const result = await ArticleModel.find(payload)
      .populate('categoryIds')
      .sort({ createdAt: -1 })

    ctx.body = result.map(item => {
      item.categories = item.categoryIds
      item.categoryIds = item.categories.map(item => item._id)
      return _.pick(item, responseFields)
    })
  }

  async queryOne() {
    const { ctx } = this
    const { id } = ctx.params
    const result = await ArticleModel.findById(id)

    ctx.body = _.pick(result, responseFields)
  }
  async createOne() {
    const { ctx } = this
    const required = ['title', 'content', 'categoryID']

    const data = _.pick(ctx.request.body, required.concat('tagIdList'))

    const { tagIdList } = data

    const valid = ctx.ajv.validate({ required, properties }, data)

    if (!valid) {
      throw new ParameterException(ctx.ajv.errors)
    }

    try {
      var result = await ArticleModel.create(data)
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
