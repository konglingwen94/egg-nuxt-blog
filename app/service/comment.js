const { Service } = require('egg')

class CommentService extends Service {
  async queryList() {
    const { ctx } = this
    return  this.ctx.model.Comment.find().populate('article')
  }
  async createOne(payload) {
    return this.ctx.model.Comment.create(payload)
  }
  async queryByIdAndRemove(id) {
    return this.ctx.model.Comment.findByIdAndRemove(id)
  }
  async deleteMany(idList) {
    return await Promise.all(
      idList.map(id => this.ctx.model.Comment.findByIdAndRemove(id))
    )
  }
  async thumbup(id) {
    return this.ctx.model.Comment.findByIdAndUpdate(id, { $inc: { thumbupCount: 1 } })
  }
}

module.exports = CommentService
