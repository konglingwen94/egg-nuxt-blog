const { Controller } = require('egg')

class TagController extends Controller {
  async createOne() {
    const { ctx, service } = this

    const { name } = ctx.state.body

    return this.ctx.model.Tag.create({ name })
  }
  async queryList() {
    const { ctx, service } = this

    return service.tag.queryList()
  }

  async updateOne() {
    const { ctx } = this

    const { id } = ctx.params
    const { name } = ctx.state.body

    return  this.ctx.model.Tag.findByIdAndUpdate(
      id,
      { $set: { name } },
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
