const { Controller } = require('egg')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const _ = require('lodash')

class MessageController extends Controller {
  async queryList() {
    const { ctx } = this
    return ctx.model.Message.find().sort('-createdAt')
  }

  async createOne() {
    const { ctx } = this

    const payload = ctx.state.body

    return ctx.model.Message.create(payload)
  }

  async responseToUser() {
    const { ctx } = this

    const parentID = ctx.params.id

    const payload = ctx.state.body

    // let parentMessage = await ctx.model.Message.findById(MessageID)

    const doc = ctx.model.Message.create({ ...payload, parentID })

    return doc
  }

  async deleteOneMessage() {
    const { id } = this.ctx.params
     
    return this.ctx.model.Message.findByIdAndDelete(id)
  }

  async deleteMany() {
    const { ctx } = this

    const { idList } = ctx.request.body

    ctx.validate(
      {
        idList: {
          type: 'array',
          min: 1,
          itemType: 'string',
          rule: { min: 24, max: 24 },
        },
      },
      { idList }
    )

    const result = await Promise.all(
      idList.map(id => ctx.model.Message.findByIdAndDelete(id))
    )

    if (result.length) {
      return { ok: 1, deletedCount: result.length, n: result.length }
    }
    return {
      ok: 0,
    }
  }

  async diggGuestbook() {
    const { ctx } = this

    const { id } = ctx.params

    return ctx.model.Message.updateOne(
      { _id: id },
      {
        $inc: { thumbupCount: 1 },
      }
    )
  }
}

module.exports = MessageController
