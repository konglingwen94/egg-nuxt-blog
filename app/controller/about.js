const _ = require('lodash')
const { Controller } = require('egg')

class AboutController extends Controller {
  async getOne() {
    const { ctx, service, config } = this
    const result = (await service.about.queryOne()) || config.aboutDefaultConfig
    return result
  }
  async overwriteOne() {
    const { ctx, config, service } = this
    const { id } = ctx.params
    const result = await ctx.model.About.findByIdAndUpdate(
      id,
      config.aboutDefaultConfig,
      { new: true }
    )
    console.log(__filename, result)
    return result
  }
  async updateOne() {
    const { ctx, service } = this
    const { id } = ctx.params
    const payload = ctx.state.body

    await service.about.queryByIdAndUpdate(id, payload)
  }
  async createOne() {
    const { ctx } = this
    ctx.status = 201
    console.log(__filename,ctx.state.body)
    return ctx.model.About.create(ctx.state.body)
  }
}

module.exports = AboutController
