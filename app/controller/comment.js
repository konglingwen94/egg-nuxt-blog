const { Controller } = require('egg')

const { ObjectId } = require('mongoose').Types
const _ = require('lodash')

class CommentController extends Controller {
  async queryList() {
    const { ctx, service } = this

    // console.log(__filename, await service.comment.queryList())
    return ctx.model.Comment.find().populate('article')
  }
  async createOne() {
    const { ctx, service } = this


    const articleID = ctx.params.id

// ctx.validate({article})

    const payload = { ...ctx.state.body, articleID }

    return ctx.model.Comment.create(payload)
  }
  async deleteOne() {
    const { ctx, service } = this

    const { id } = ctx.params

    return ctx.model.Comment.deleteOne({ _id: id })
  }

  async deleteMany() {
    const { ctx, service } = this

    const { idList } = ctx.queries

    return ctx.model.Comment.deleteMany({ _id: idList })
  }
  async thumbup() {
    const { ctx, service } = this

    const { id } = ctx.params

    await service.comment.thumbup(id)
  }
}
module.exports = CommentController
