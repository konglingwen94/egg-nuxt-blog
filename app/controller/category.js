const { Controller } = require('egg')

class CategoryController extends Controller {
  async createOne() {
    const { ctx, service } = this

    const payload = ctx.state.body

    return ctx.model.Category.create(payload)
  }
  async queryList() {
    const { ctx, service } = this

    return ctx.model.Category.find()
      .populate('articleCount')
      .populate({ path: 'articlePublishedCount', match: { isPublished: true } })
  }

  async queryOne() {
    const { service, ctx } = this
    const { id } = ctx.params

    return ctx.model.Category.findById(id)
      .populate({ path: 'articleList', populate: { path: 'tagList' } })
      .populate('articleCount')
      .populate({ path: 'articlePublishedCount', match: { isPublished: true } })
  }
  async deleteOne() {
    const { ctx, service } = this

    return ctx.model.Category.deleteOne({ _id: ctx.params.id })
  }

  async updateOne() {
    const { ctx, service } = this
    const payload = ctx.state.body

    return ctx.model.Category.updateOne(
      { _id: ctx.params.id },
      { $set: payload }
    )
  }
}

module.exports = CategoryController
