const _ = require('lodash')
const { Controller } = require('egg')

class AboutController extends Controller {
  async getOne() {
    const { ctx, service } = this
    const result = await service.about.queryOne()
    ctx.body = _.pick(result, ctx.responseFields.about)
  }
  async createOne() {
    const { ctx, service } = this
    // const required = ['platform', 'profile']
    const payload = _.pick(ctx.request.body, _.keys(ctx.requestParams.about))
    const schema = { properties: ctx.requestParams.about }
    const isValid = ctx.ajv.validate(schema, payload)

    if (!isValid) {
      throw new ctx.helper.ParameterException(ctx.ajv.errors)
    }
    const result = await service.about.create(payload)

    ctx.status = 201
    ctx.body = _.pick(result, ctx.responseFields.about)
  }
  async updateOne() {
    const { ctx, service } = this
    const { id } = ctx.params
    const payload = _.pick(ctx.request.body, _.keys(ctx.requestParams.about))

    const isValid = ctx.ajv.validate(
      { properties: ctx.requestParams.about, required: ['id'] },
      { ...payload, id }
    )

    if (!isValid) {
      throw new ctx.helper.ParameterException(ctx.ajv.errors)
    }
     
    await service.about.queryByIdAndUpdate(id, payload)
    ctx.status = 204
  }
  async deleteOne() {
    const { service, ctx } = this
    const { id } = ctx.params

    const isValid = ctx.ajv.validate(
      {
        properties: ctx.requestParams.about,
        required: ['id'],
      },
      { id }
    )

    if (!isValid) {
      throw new ctx.helper.ParameterException(ctx.ajv.errors)
    }

    await service.about.queryByIdAndRemove(id)
    ctx.status = 204
  }
}

module.exports = AboutController
