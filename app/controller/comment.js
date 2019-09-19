const { Controller } = require('egg')

const { ObjectId } = require('mongoose').Types
const _ = require('lodash')
const CommentModel = require('../model/comment')
const { ParameterException } = require('../utils/httpExceptions')
const { comment: commentProjectFields } = require('../types/projectFields')
const { comment: properties } = require('../types/request')
const { comment: commentResponseFields } = require('../types/response')

module.exports = class CommentController extends Controller {
  async queryList(ctx) {
    return await CommentModel.aggregate([
      { $match: ctx.state.filter },
      {
        $lookup: {
          from: 'articles',
          localField: 'articleID',
          foreignField: '_id',
          as: 'article',
        },
      },
      {
        $project: { ...commentProjectFields, articleTitle: '$article.title' },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ])
  }
  async createOne(ctx) {
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

    const result = await CommentModel.create(payload)

    return _.pick(result, commentResponseFields)
  }
  async deleteOne(ctx) {
    const { id } = ctx.params

    const validResult = ctx.ajv.validate(
      { properties, required: ['id'] },
      { id }
    )

    if (!validResult) {
      throw new ParameterException(ctx.ajv.errors)
    }

    await CommentModel.findByIdAndRemove(id)
    ctx.status = 204
  }

  async deleteList(ctx) {
    const { idList } = ctx.request.body

    const validResult = ctx.ajv.validate(
      { required: ['idList'], properties },
      { idList }
    )

    if (!validResult) {
      throw new ParameterException(ctx.ajv.errors)
    }

    const result = await Promise.all(
      idList.map(id => CommentModel.findByIdAndRemove(id))
    )

    if (result.length !== idList.length) {
      return ctx.throw(400, '删除失败')
    }

    ctx.status = 204
  }
  async thumbup(ctx) {
    const { id } = ctx.params
    const validResult = ctx.ajv.validate(
      { required: ['id'], properties },
      { id }
    )

    if (!validResult) {
      throw new ParameterException(ctx.ajv.errors)
    }

    await CommentModel.findByIdAndUpdate(id, { $inc: { thumbupCount: 1 } })

    ctx.status = 204
  }
}
