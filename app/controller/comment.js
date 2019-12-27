const { Controller } = require('egg')

const { ObjectId } = require('mongoose').Types
const _ = require('lodash')
const { ParameterException } = require('../utils/httpExceptions')
const properties = require('../types/request').comment
const commentResponseFields = require('../types/response').comment

class CommentController extends Controller {
  async queryList() {
    const { ctx, service } = this

    console.log(__filename, await service.comment.queryList())
    return service.comment.queryList()
  }
  async createOne() {
    const { ctx, service } = this

    const article = ctx.params.id

    const payload = { ...ctx.state.body, article }

    const result = await service.comment.createOne(payload)

    return result
  }
  async deleteOne() {
    const { ctx, service } = this

    const { id } = ctx.params

    await service.comment.queryByIdAndRemove(id)
  }

  async deleteList() {
    const { ctx, service } = this

    const { idList } = ctx.queries

    const result = await service.comment.deleteMany(idList)

     
  }
  async thumbup() {
    const { ctx, service } = this

    const { id } = ctx.params

    await service.comment.thumbup(id)
  }
}
module.exports = CommentController
