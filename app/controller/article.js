const { Controller } = require('egg')
const { ObjectId } = require('mongoose').Types
const _ = require('lodash')

class ArticleController extends Controller {
  async queryListByOptions() {
    const { ctx, service } = this

    const {
      tagID: tagIdList,
      categoryID: categoryIdList,
      idList,
     
    } = ctx.queries
    const { sort: sortBy,
      number,}=ctx.query
    const filter = {}

    if (tagIdList) {
      ctx.validate(
        {
          tagIdList: {
            type: 'array',
            itemType: 'string',
            min: 1,
            rule: { max: 24, min: 24 },
          },
        },
        { tagIdList }
      )

      filter.tagIdList = { $in: tagIdList }
    }

    if (categoryIdList) {
      ctx.validate(
        {
          categoryIdList: {
            type: 'array',
            itemType: 'string',
            rule: {
              max: 24,
              min: 24,
            },
            min: 1,
          },
        },
        { categoryIdList }
      )

      filter.categoryID = { $in: categoryIdList }
    }

    if (idList) {
      ctx.validate(
        {
          idList: {
            type: 'array',
            itemType: 'objectId',
            min: 1,
          },
        },
        { idList }
      )

      filter._id = { $in: idList.map(id => ObjectId(id)) }
    }

    if (!ctx.path.startsWith('/api/admin')) {
      filter.isPublished = true
    }

    console.log(ctx.model.Article.find(filter))
    const result = ctx.model.Article.find(filter)
      .populate('commentCount')
      .populate('commentList')
      .populate('category')
      .populate('tagList')
      .sort('-createdAt')
    console.log(result.getOptions())

    const options = { sort: {} }

    if (sortBy) {
      ctx.validate(
        {
          sortBy: {
            type: 'emum',
            values: ['pv', 'startCount'],
          },
        },
        { sortBy }
      )
      options.sort = { sortBy: sortBy, createdAt: -1 }
    } else {
      options.sort = { createdAt: -1 }
    }

    if (number) {
      ctx.validate(
        {
          number: {
            type: 'integer',
            min: 1,
            convertType(value) {
              return parseInt(value)
            },
          },
        },
        { number }
      )

      options.limit = parseInt(number)
    }

    result.setOptions(options)
    console.log(result.getOptions())
    return result
  }

  async querySuggestionList() {
    const { ctx, service } = this
    let { tagIdList } = ctx.queries

    const { id } = ctx.params

    return ctx.model.Article.find({
      tagIdList: { $in: tagIdList },
      _id: { $ne: id },
    })
  }

  async queryOne() {
    const { ctx, service } = this
    const { id } = ctx.params

    return ctx.model.Article.findById(id)
      .populate('tagList')
      .populate('commentList')
      .populate('category')
  }
  async createOne() {
    const { ctx, service } = this

    const result = await ctx.model.Article.create(ctx.state.body)

    ctx.status = 201
    return result
  }
  async updateOne() {
    const { ctx, service } = this

    return ctx.model.Article.updateOne(
      { _id: ctx.params.id },
      {
        $set: ctx.request.body,
      }
    )
  }
  async deleteMany() {
    const { ctx, service } = this

    const { idList } = ctx.queries

    ctx.validate(
      {
        idList: {
          type: 'array',
          min: 1,
          itemType: 'string',
          rule: { min: 24, max: 24 },
        },
      },
      { idList }
    )

    return ctx.model.Article.deleteMany({ _id: idList })
  }
  async deleteOne() {
    const { ctx, service } = this

    return ctx.model.Article.deleteOne({ _id: ctx.params.id })
  }
  async updatePublishStatus() {
    const { ctx, service } = this

    const { isPublished } = ctx.request.body
    ctx.validate({ isPublished: 'boolean' }, { isPublished })

    return ctx.model.Article.updateOne(
      { _id: ctx.params.id },

      {
        $set: { isPublished },
      }
    )
  }
  async incrementPv() {
    const { ctx, service } = this

    return ctx.model.Article.updateOne(
      { _id: ctx.params.id },
      { $inc: { pv: 1 } }
    )
  }
  async starOne() {
    const { ctx, service } = this

    return ctx.model.Article.updateOne(
      { _id: ctx.params.id },
      { $inc: { starCount: 1 } }
    )
  }
}
module.exports = ArticleController
