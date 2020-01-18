const { Controller } = require('egg')
const { ObjectId } = require('mongoose').Types
const _ = require('lodash')

class ArticleController extends Controller {
  async queryOwnerCategoriesList() {
    const { ctx, service } = this

    const categoryIdList = ctx.queries.categoryID

    ctx.validate(
      {
        categoryIdList: {
          type: 'array',
          itemType: 'string',
          min: 1,
          rule: {
            min: 24,
            max: 24,
          },
        },
      },
      { categoryIdList }
    )

    return service.article
      .queryListByOptions({
        categoryID: { $in: categoryIdList },
      })
      .sort('-createdAt')
  }
  async queryOwnerTagsList() {
    const { ctx, service } = this

    const tagIdList = ctx.queries.tagID

    ctx.validate(
      {
        tagIdList: {
          type: 'array',
          itemType: 'string',
          min: 1,
          rule: {
            min: 24,
            max: 24,
          },
        },
      },
      { tagIdList }
    )

    return service.article
      .queryListByOptions({
        tagIdList: { $in: tagIdList },
      })
      .sort('-createdAt')
  }
  async queryList() {
    const { ctx, service } = this

    return service.article.queryListByOptions().sort('-createdAt')
  }
  async queryCarouselList() {
    const { service, ctx, config } = this
    const defaultCarouselConfig = config.aboutusDefaultConfig.carousel
    const aboutusResult = (await this.ctx.model.Aboutus.findOne({})) || {
      carousel: defaultCarouselConfig,
    }

    const { number, sort: sortBy } = aboutusResult.carousel

    const sort = { [sortBy]: -1 }

    const data = await service.article
      .queryListByOptions()
      .sort(sort)

      .limit(number)

    return { data, configOptions: aboutusResult.carousel }
  }
  async querySuggestionList() {
    const { ctx, service } = this
    let { tagIdList } = ctx.queries

    const { id } = ctx.params

    return service.article.queryListByOptions({
      tagIdList: { $in: tagIdList },
      _id: { $ne: id },
    })
  }

  async queryOne() {
    const { ctx, service } = this
    const { id } = ctx.params

    console.log(
      '------------',
       await ctx.model.Article.findById(id)
        .populate('tagList')
        .populate('comments').exec()
    )
    return ctx.model.Article.findById(id)
      .populate('tagList')
      .populate('comments')
  }
  async createOne() {
    const { ctx, service } = this

    var result = await service.article.create(ctx.state.body)

    ctx.status = 201
    return result
  }
  async updateOne() {
    const { ctx, service } = this

    return ctx.state.ActiveQueryWithParamId.updateOne(
      {},
      { $set: ctx.request.body }
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

    return ctx.state.ActiveQueryWithParamId.deleteOne()
  }
  async updatePublishStatus() {
    const { ctx, service } = this

    const { isPublished } = ctx.request.body
    ctx.validate({ isPublished: 'boolean' }, { isPublished })

    return ctx.state.ActiveQueryWithParamId.updateOne(
      {},
      {
        $set: { isPublished },
      }
    )
  }
  async incrementPv() {
    const { ctx, service } = this

    return ctx.state.ActiveQueryWithParamId.updateOne({}, { $inc: { pv: 1 } })
  }
  async starOne() {
    const { ctx, service } = this

    return ctx.state.ActiveQueryWithParamId.updateOne(
      {},
      { $inc: { starCount: 1 } }
    )
  }
}
module.exports = ArticleController
