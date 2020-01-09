const { Controller } = require('egg')

class TagController extends Controller {
  async createOne() {
    const { ctx, service } = this

    const payload = ctx.state.body

    return this.ctx.model.Tag.create(payload)
  }

  async queryOne() {
    const { ctx } = this
    return this.ctx.model.Tag.findById(ctx.params.id)
      .populate('articleCount') 
      .populate({ path: 'articlePublishedCount', match: { isPublished: true } })
  }

  async queryList() { 
    const { ctx, service } = this

    return service.tag.queryList()
  }

  async updateOne() {
    const { ctx } = this

    const { id } = ctx.params
    const payload = ctx.state.body

    return this.ctx.model.Tag.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true }
    )
  }

  async deleteOne() {
    const { ctx, service } = this

    const { id } = ctx.params

    return this.ctx.model.Tag.findByIdAndRemove(id)
  }
}
module.exports = TagController
