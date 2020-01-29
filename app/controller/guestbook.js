const { Controller } = require('egg')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const guestbookRule = require('../types/request').guestbook
const _ = require('lodash')

class GuestbookController extends Controller {
  async queryMessageList() {
    const { ctx } = this
    return ctx.model.Message.find()
  }
  async queryGuestbookList() {
    const { ctx } = this
    return ctx.model.Message.find({ parentID: { $exists: false } }).populate({
      path: 'dialogues',
      populate: {
        path: 'responseTo',
        // match:{}
      },
    })
  }
  async createOne() {
    const { ctx } = this

    const requiredFields = ['email', 'content', 'nickname']
    ctx.validate(_.pick(guestbookRule, requiredFields), ctx.request.body)

    const payload = _.pick(ctx.request.body, requiredFields)

    return ctx.model.Message.create(payload)
  }

  async responseToUser() {
    const { ctx } = this

    const MessageID = ctx.params.id

    const payload = ctx.state.body

    // let parentMessage = await ctx.model.Message.findById(MessageID)

    const doc = await mongoose.models.Response.create(payload)

    return doc
  }

  async deleteOneMessage() {
    const { id } = this.ctx.params
    return mongoose.models.Message.deleteOne({ _id: id })
  }

  async deleteOneGuestbook() {
    const { id } = this.ctx.params
    const GuestbookModel = this.ctx.model.Message.discriminators.Guestbook
    const result = await GuestbookModel.findByIdAndDelete(id)
    if (result) {
      return { n: 1, ok: 1, deletedCount: 1 }
    }

    return { ok: 0 }
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
      idList.map(id => mongoose.models.Guestbook.findByIdAndDelete(id))
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

    return mongoose.models.Guestbook.updateOne(
      { _id: id },
      {
        $inc: { diggCount: 1 },
      }
    )
  }
}

module.exports = GuestbookController
