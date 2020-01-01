const { Controller } = require('egg')
const { ObjectId } = require('mongoose').Types
const _ = require('lodash')

class ArticleController extends Controller {
  async queryList() {
    const { service} = this

    return service.article.queryList().sort('-createdAt')
  }
  async queryCarouselList() {
    const { service } = this
    return service.article
      .queryList()
      .sort('-pv -createdAt')
      .limit(3)
  }
  async querySuggestionList() {
    const { ctx, service } = this
    let { tagIdList } = ctx.queries

    const { id } = ctx.params

    return this.ctx.model.Article.find({
      tagIdList:{$in:tagIdList},
      _id: { $ne: id },
    })
  }

  async queryOne() {
    const { ctx, service } = this
    const { id } = ctx.params

    const result = await service.article.queryOneById(id)
    return result
  }
  async createOne() {
    const { ctx, service } = this

    var result = await service.article.create(ctx.state.body)

    ctx.status = 201
    return result
  }
  async updateOne() {
    const { ctx, service } = this

    const { id } = ctx.params

    await service.article.queryByIdAndUpdate(id, ctx.state.body)
  }
  async delete() {
    const { ctx, service } = this

    const { idList } = ctx.request.body

    await service.article.deleteMany(idList)
  }
  async deleteOne() {
    const { ctx, service } = this
    const { id } = ctx.params

    await service.article.queryByIdAndRemove(id)
  }
  async updatePublishStatus() {
    const { ctx, service } = this

    const { isPublished } = ctx.request.body

    const { id } = ctx.params
    await this.ctx.model.Article.findByIdAndUpdate(id, {
      $set: { isPublished },
    })
  }
  async incrementPv() {
    const { ctx, service } = this

    await service.article.incrementPv(ctx.params.id)
  }
  async starOne() {
    const { ctx, service } = this
    const { id } = ctx.params

    await service.article.queryByIdAndStarOne(id)
  }
}
module.exports = ArticleController
