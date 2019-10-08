const { Controller } = require('egg')

const { ObjectId } = require('mongoose').Types
const _ = require('lodash')
const { ParameterException } = require('../utils/httpExceptions')
const properties = require('../types/request').comment
const commentResponseFields = require('../types/response').comment

class CommentController extends Controller {
  async queryList() {
    const { ctx, service } = this
    ctx.body = await service.comment.aggregateList()
  }
  async createOne() {
    const { ctx, service } = this

    const required = ['content', 'nickname', 'articleID']
    const { articleID } = ctx.params
    const schema = { required, properties }
    const payload = _.assign(_.pick(ctx.request.body, required), {
      articleID,
    })

    const valid = ctx.ajv.validate(schema, payload)

    if (!valid) {
      throw new ParameterException(ctx.ajv.errors)
    }

    const result = await service.comment.createOne(payload)

    ctx.body = _.pick(result, commentResponseFields)
  }
  async deleteOne() {
    const { ctx, service } = this

    const { id } = ctx.params

    const validResult = ctx.ajv.validate(
      { properties, required: ['id'] },
      { id }
    )

    if (!validResult) {
      throw new ParameterException(ctx.ajv.errors)
    }

    await service.comment.queryByIdAndRemove(id)
    ctx.status = 204
  }

  async deleteList() {
    const { ctx, service } = this

    const { idList } = ctx.request.body

    const validResult = ctx.ajv.validate(
      { required: ['idList'], properties },
      { idList }
    )

    if (!validResult) {
      throw new ParameterException(ctx.ajv.errors)
    }

    const result = await service.comment.deleteMany(idList)

    if (result.length !== idList.length) {
      return ctx.throw(400, '删除失败')
    }

    ctx.status = 204
  }
  async thumbup() {
    const { ctx, service } = this

    const { id } = ctx.params
    const validResult = ctx.ajv.validate(
      { required: ['id'], properties },
      { id }
    )

    if (!validResult) {
      throw new ParameterException(ctx.ajv.errors)
    }

    await service.comment.thumbup(id)

    ctx.status = 204
  }
}
module.exports = CommentController
