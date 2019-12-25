const { Controller } = require('egg')

const { ObjectId } = require('mongoose').Types
const _ = require('lodash')
const { ParameterException } = require('../utils/httpExceptions')
const properties = require('../types/request').comment
const commentResponseFields = require('../types/response').comment

class CommentController extends Controller {
  async queryList() {
    const { ctx, service } = this

    console.log(__filename,await service.comment.queryList())
    return  service.comment.queryList()
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
     

    await service.comment.thumbup(id)

    
  }
}
module.exports = CommentController
