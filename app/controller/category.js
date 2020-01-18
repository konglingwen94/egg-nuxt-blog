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

    return ctx.state.ActiveQueryWithParamId.findOne()
  }
  async deleteOne() {
    const { ctx, service } = this
   

    return ctx.state.ActiveQueryWithParamId.deleteOne()
  }

  async updateOne() {
    const { ctx, service } = this
    const { id } = ctx.params
    const payload = ctx.request.body

    return ctx.state.ActiveQueryWithParamId.updateOne({}, { $set: payload })
  }
}

module.exports = CategoryController
