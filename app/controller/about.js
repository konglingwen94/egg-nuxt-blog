const _ = require('lodash')
const { Controller } = require('egg')

class AboutController extends Controller {
  async getOne() {
    const { ctx, service } = this
    const result = await service.about.queryOne()
    return result
  }
  async createOne() {
    const { ctx, service } = this

    const payload = ctx.state.body

    ctx.status = 201

    return service.about.create(payload)
  }
  async updateOne() {
    const { ctx, service } = this
    const { id } = ctx.params
    const payload = ctx.state.body

    await service.about.queryByIdAndUpdate(id, payload)
  }
  async deleteOne() {
    const { service, ctx } = this
    const { id } = ctx.params

    await service.about.queryByIdAndRemove(id)
  }
}

module.exports = AboutController
