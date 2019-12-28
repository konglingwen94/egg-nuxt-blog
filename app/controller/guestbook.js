const { Controller } = require('egg')
const { ObjectId } = require('mongoose').Types
 
const GuestbookModel = require('../model/guestbook')
 
const _ = require('lodash')
 

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

    

    return result.sort({createdAt:-1})
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

   

     
 

    await GuestbookModel.deleteMany({ _id:     idList   })
     
  }

   

  async diggGuestbook() {
    const { ctx } = this

    const { id } = ctx.params

    await GuestbookModel.findByIdAndUpdate(id, {
      $inc: { diggCount: 1 },
    })
  }
}
