const { Controller } = require('egg')
const { ObjectId } = require('mongoose').Types
const { ParameterException } = require('../utils/httpExceptions')
const GuestbookModel = require('../model/guestbook')
const { guestbook: properties } = require('../types/request')
const { guestbook: $project } = require('../types/projectField')
const { guestbook: responseFields } = require('../types/response')
const _ = require('lodash')
const { models } = require('mongoose')

module.exports = class GuestbookController extends Controller {
  async queryList() {
    const { ctx } = this
    // console.log(__filename,await models.Dialogue.find())
    let result
    if (ctx.state.platformENV === 'web') {
      result = GuestbookModel.find({ responseTo: { $exists: 0 } }).populate({
        path: 'dialogues',
        populate: 'responseTo',
      })
    } else {
      result = GuestbookModel.find()
    }

    console.log(__filename, GuestbookModel)

    return result
  }
  async createOne() {
    const { ctx } = this

    const { content, nickname, responseTo } = ctx.request.body
    const payload = { content, nickname }

    const result = await GuestbookModel.create(payload)

    return result
  }

  async responseToUser() {
    const { ctx } = this

    const { id } = ctx.params
    const { content, responseTo, nickname, kind } = ctx.request.body
    const payload = { responseTo, content, nickname }
    const doc = await GuestbookModel.create(payload)
    const result = await GuestbookModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { dialogues: doc.id },
      },
      { new: true }
    ).populate({ path: 'dialogues', populate: 'responseTo' })

    return result
  }
  async deleteOne() {
    const { ctx } = this

    const { id } = ctx.params

    const result = await GuestbookModel.findByIdAndRemove(id)
  }
  async deleteMany() {
    const { ctx } = this

    const { idList } = ctx.request.body

    const schema = {
      required: ['idList'],
      properties: {
        idList: {
          type: 'array',
          minItems: 1,
          items: { type: 'string', minLength: 24, maxLength: 24 },
        },
      },
    }

    const payload = { idList }

    const validResult = ctx.ajv.validate(schema, payload)

    if (!validResult) {
      throw new ParameterException(ctx.ajv.errors)
    }

    await GuestbookModel.deleteMany({ _id: { $in: idList } })
    ctx.status = 204
  }

  async deleteManyResponse() {
    const { ctx } = this

    const { idList } = ctx.request.body
    const { id } = ctx.params

    const guestbookDoc = await GuestbookModel.findById(id)
    idList.forEach(id => {
      guestbookDoc.dialogues.pull(id)
    })
    await guestbookDoc.save()
    ctx.status = 204
  }

  async diggGuestbook() {
    const { ctx } = this

    const { id } = ctx.params

    await GuestbookModel.findByIdAndUpdate(id, {
      $inc: { diggCount: 1 },
    })
  }
}
