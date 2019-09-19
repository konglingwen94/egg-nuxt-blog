const _ = require('lodash')

const {
  article: responseFields,
  articleCategories: categoryFields,
} = require('../types/response')
const { article: properties } = require('../types/request')
const { ParameterException } = require('../utils/httpExceptions')

module.exports = {
  async queryList(ctx, next) {
    return Service.queryList()
  },

  async querySuggestionList(ctx) {
    let { categoryIdList } = ctx.query
    if (typeof categoryIdList === 'string') {
      categoryIdList = [categoryIdList].map(id => ObjectId(id))
    } else {
      categoryIdList = categoryIdList.map(id => ObjectId(id))
    }

    return await ArticleModel.aggregate([
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
  },
  async queryListByCategoryId(ctx) {
    const { id } = ctx.params

    const result = await ArticleModel.find({
      categoryIds: { $all: [id] },
    }).sort({ createdAt: -1 })
    return result.map(item => {
      return _.pick(item, responseFields)
    })
  },
  async queryPublishedList(ctx) {
    const result = await ArticleModel.find({ isPublished: true })
      .populate('categoryIds')
      .sort({ createdAt: -1 })

    return result.map(item => {
      item.categories = item.categoryIds
      item.categoryIds = item.categories.map(item => item._id)
      return _.pick(item, responseFields)
    })
  },

  async queryListByOptions(ctx) {
    const payload = _.pick(ctx.query, _.keys(properties))

    const valid = ctx.ajv.validate({ properties }, payload)

    if (!valid) {
      throw new ParameterException(ctx.ajv.errors)
    }

    const result = await ArticleModel.find(payload)
      .populate('categoryIds')
      .sort({ createdAt: -1 })

    return result.map(item => {
      item.categories = item.categoryIds
      item.categoryIds = item.categories.map(item => item._id)
      return _.pick(item, responseFields)
    })
  },

  async queryOne(ctx) {
    const { id } = ctx.params
    const result = await ArticleModel.findById(id)

    return _.pick(result, responseFields)
  },
  async createOne(ctx) {
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
    return _.pick(result, responseFields)
  },
  async updateOne(ctx) {
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
  },
  async delete(ctx) {
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
          return ArticleCategoryModel.updateMany(
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

    ctx.state.status = 204
  },
  async deleteOne(ctx) {
    const { id } = ctx.params
    try {
      await ArticleModel.findByIdAndRemove(id)
    } catch (error) {
      throw error
    }

    ctx.status = 204
  },
  async updatePublishStatus(ctx) {
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
        ArticleCategoryModel.updateMany(
          { articleIdList: id },
          { $inc: { publishedArticleCount: isPublished ? 1 : -1 } }
        ),
      ])
    } catch (error) {
      throw error
    }

    ctx.status = 204
  },
  async incrementPv(ctx) {
    try {
      var result = await ArticleModel.findByIdAndUpdate(ctx.params.id, {
        $inc: { pv: 1 },
      })
    } catch (error) {
      throw error
    }

    ctx.status = 204
  },
  async starOne(ctx) {
    const { id } = ctx.params
    const isValid = ctx.ajv.validate({ required: ['id'], properties }, { id })

    if (!isValid) {
      throw new ParameterException(ctx.ajv.errors)
    }

    await ArticleModel.findByIdAndUpdate(id, { $inc: { starCount: 1 } })

    ctx.status = 204
  },
}
