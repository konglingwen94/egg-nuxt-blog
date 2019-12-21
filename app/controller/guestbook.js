const { Controller } = require('egg')
const { ObjectId } = require('mongoose').Types
const { ParameterException } = require('../utils/httpExceptions')
const GuestbookModel = require('../model/guestbook')
const { guestbook: properties } = require('../types/request')
const { guestbook: $project } = require('../types/projectField')
const { guestbook: responseFields } = require('../types/response')
const _ = require('lodash')

module.exports = class GuestbookController extends Controller {
  async queryList() {
    const { ctx } = this

    const result = await GuestbookModel.find().populate({
      path: 'dialogues.responseTo',
    })

    return result
  }
  async createOne() {
    const { ctx } = this

    const { content, nickname } = ctx.state.body
    const payload = { content, nickname }

    const result = await GuestbookModel.create(payload)

    return result
  }
  async deleteOne() {
    const { ctx } = this

    const { id } = ctx.params

    const validResult = ctx.ajv.validate(
      { required: ['id'], properties },
      { id }
    )

    if (!validResult) {
      throw new ParameterException(ctx.ajv.errors)
    }

    await GuestbookModel.findByIdAndRemove(id)

    ctx.status = 204
  }
  async responseToUser() {
    const { ctx } = this

    const { id } = ctx.params
    const { content, responseTo, nickname } = ctx.state.body
    const payload = { id, responseTo, content, nickname }

     

    const parentTarget = await GuestbookModel.findById(id)

    await parentTarget.dialogues.push(_.omit(payload, 'id'))

    await parentTarget.save()

    let doc = parentTarget.toObject()
    doc.dialogues.forEach((item, index, array) => {
      item.responseToUser = array.find(response => {
        if (response._id && item.responseTo) {
          return response._id.toString() === item.responseTo.toString()
        }
      })

      item.id = item._id
      delete item._id
    })
    doc.id = doc._id

    doc.dialogues.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

    ctx.body = _.pick(doc, responseFields)
  }
  async deleteOneResponse() {
    const { ctx } = this

    const { id, responseID } = ctx.params

    const schema = { properties, required: ['id', 'responseID'] }
    const validResult = ctx.ajv.validate(schema, { id, responseID })

    if (!validResult) {
      throw new ParameterException(ctx.ajv.errors)
    }

    const result = await GuestbookModel.findById(id)

    result.dialogues.id(responseID).remove()

    await result.save()

    ctx.status = 204
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

  async diggOneResponse() {
    const { ctx } = this

    const { id, responseID } = ctx.params
    const schema = { required: ['id', 'responseID'], properties }
    const data = { id, responseID }

    const isValid = ctx.ajv.validate(schema, data)

    if (!isValid) {
      throw new ParameterException(ctx.ajv.errors)
    }

    const parent = await GuestbookModel.findById(id)

    parent.dialogues.id(responseID).diggCount++

    const result = await parent.save()
    ctx.status = 204
  }

  async diggGuestbook() {
    const { ctx } = this

    const { id } = ctx.params

    const isValid = ctx.ajv.validate({ required: ['id'], properties }, { id })

    if (!isValid) {
      throw new ParameterException(ctx.ajv.errors)
    }

    const result = await GuestbookModel.findByIdAndUpdate(id, {
      $inc: { diggCount: 1 },
    })

    ctx.status = 204
  }
}
