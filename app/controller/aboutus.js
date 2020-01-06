const _ = require('lodash')
const { Controller } = require('egg')

class AboutController extends Controller {
  async getOne() {
    const { ctx, service, config } = this
    const result = (await service.aboutus.queryOne()) || config.aboutDefaultConfig
    return result
  }
  async overwriteOne() {
    const { ctx, config, service } = this
    const { id } = ctx.params
    const result = await ctx.model.Aboutus.findByIdAndUpdate(
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

    await service.aboutus.queryByIdAndUpdate(id, payload)
  }
  async createOne() {
    const { ctx } = this

    const result = await ctx.model.Aboutus.findOne()
    console.log(__filename, ctx.state.body)

    if (result) {
      ctx.throw('400', '重复的数据')
    }
    ctx.status = 201
    return ctx.model.Aboutus.create(ctx.state.body)
  }
}

module.exports = AboutController
