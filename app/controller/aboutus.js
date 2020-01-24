 const _ = require('lodash')
const { Controller } = require('egg')

class AboutController extends Controller {
  async getOne() {
    const { ctx, service, config } = this
    const result = await ctx.model.Aboutus.findOne()
    const isPublishedArticleCount = await ctx.model.Article.countDocuments({
      isPublished: true,
    })
    result.carousel.number = Math.min(
      result.carousel.number,
      isPublishedArticleCount
    )
    result._doc.carousel.isPublishedArticleCount = isPublishedArticleCount
    console.log(result)
    return result
  }
  async overwriteOne() {
    const { ctx, config, service } = this
    const { id } = ctx.params
    return ctx.model.Aboutus.updateOne({ _id: id }, config.aboutDefaultConfig)
  }
  async updateOne() {
    const { ctx, service } = this
    const { id } = ctx.params
    const payload = ctx.request.body

    const result = await ctx.model.Aboutus.findById(id)

    _.merge(result, payload)

    return result.save()
  }
  async createOne() {
    const { ctx } = this

    const result = await ctx.model.Aboutus.findOne()

    if (result) {
      ctx.throw('400', '重复的数据')
    }
    ctx.status = 201
    const newDoc = await ctx.model.Aboutus.create(ctx.request.body)

    return newDoc
  }
}

module.exports = AboutController
