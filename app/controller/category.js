const { Controller } = require('egg')

class CategoryController extends Controller {
  async createOne() {
    const { ctx, service } = this
    const payload = ctx.state.body

    return ctx.model.Category.create(payload)
  }
  async queryList() {
    const { ctx, service } = this

    return service.category.queryList()
  }

  async queryOne() {
    const { service, ctx } = this
    const { id } = ctx.params

    return service.category.queryById(id)
  }
  async deleteOne() {
    const { ctx, service } = this
    const { id } = ctx.params

    await this.ctx.model.Category.findByIdAndRemove(id)
  }

  async updateOne() {
    const { ctx, service } = this
    const { id } = ctx.params
    const payload = ctx.state.body

    await this.ctx.model.Category.findByIdAndUpdate(id, { $set: payload })
  }
}

module.exports = CategoryController
