const { Controller } = require('egg')
const { ObjectId } = require('mongoose').Types
const _ = require('lodash')

class ArticleController extends Controller {
  async queryListByOptions() {
    const { ctx } = this

    const { tagID, categoryID, number, sort: orderBy } = ctx.query
    const sortOpts = {}
    const filter={}
    if (tagID) {
      const tagIdList = tagID.split()
      ctx.validate(
        {
          tagIdList: 'objectIdList',
        },
        { tagIdList }
      )

      filter.tagIdList = { $in: tagIdList }
    }

    if (categoryID) {
      // const categoryIdList = categories.split()
      ctx.validate({ categoryID: 'objectId' }, { categoryID })

      filter.categoryID = categoryID
    }

    if (number) {
      ctx.validate(
        { number: { type: 'integer', min: 1, convertType(value){return parseInt(value)} } },
        { number }
      )
    }
    if (orderBy) {
      ctx.validate(
        { orderBy: { type: 'enum', values: ['pv', 'starCount'] } },
        { orderBy }
      )

      sortOpts[orderBy] = -1
    }

    if (!ctx.path.startsWith('/api/admin')) {
      filter.isPublished = true
    }

    return ctx.model.Article.find(filter)
      .sort({ ...sortOpts, createdAt: -1 })
      .limit(parseInt(number) || 0)
      .populate('commentCount')
      .populate('commentList')
      .populate('tagList')
      .populate('category')
  }
  

  async queryListByTagList() {
    const { ctx, service } = this
    let { tagIdList } = ctx.queries
// console.log(this)
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
    const { ctx,   } = this

    const result =   ctx.model.Article.create(ctx.state.body)

    ctx.status = 201
    return result
  }
  async updateOne() {
    const { ctx,   } = this

    return ctx.model.Article.updateOne(
      { _id: ctx.params.id },
      {
        $set: ctx.request.body,
      }
    )
  }
  async deleteMany() {
    const { ctx,   } = this

    const { idList } = ctx.queries

    ctx.validate(
      {
        idList: 'objectIdList',
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
