const { Controller } = require('egg')
const { ObjectId } = require('mongoose').Types

module.exports = class GuestbookController extends Controller {
  async queryList() {
    const { ctx } = this

    let result
    if (ctx.state.platformENV === 'web') {
      result = this.ctx.model.Guestbook.find({
        responseTo: { $exists: 0 },
      }).populate({
        path: 'dialogues',
        populate: 'responseTo',
      })
    } else {
      result = this.ctx.model.Guestbook.find()
    }

    return result.sort({ createdAt: -1 })
  }
  async createOne() {
    const { ctx } = this

    const { content, nickname, responseTo } = ctx.request.body
    const payload = { content, nickname }

    return this.ctx.model.Guestbook.create(payload)
  }

  async responseToUser() {
    const { ctx } = this

    const { id } = ctx.params

    const payload = ctx.state.body

    let guestbookResult = await ctx.model.Guestbook.findById(id)

    const responseToIds = guestbookResult.dialogues.concat(guestbookResult._id)

    if (!responseToIds.includes(ObjectId(payload.responseTo))) {
      ctx.throw('404', `未知的responseTo:${payload.responseTo}`)
    }

    const doc = await ctx.model.Guestbook.create(payload)

    guestbookResult.dialogues.addToSet(doc.id)

    guestbookResult = (await guestbookResult.save())
      .populate({
        path: 'dialogues',
        populate: 'responseTo',
      })
      .execPopulate()

    return guestbookResult
  }
  async deleteOne() {
    const { id } = ctx.params

    return this.ctx.model.Guestbook.deleteOne({ _id: id })
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

    return this.ctx.model.Guestbook.deleteMany({ _id: idList })
  }

  async diggGuestbook() {
    const { ctx } = this

    const { id } = ctx.params

    return this.ctx.model.Guestbook.updateOne(
      { _id: id },
      {
        $inc: { diggCount: 1 },
      }
    )
  }
}
