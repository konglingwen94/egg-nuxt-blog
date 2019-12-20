const { Service } = require('egg')
const CommentModel = require('../model/comment')

class CommentService extends Service {
  async queryList() {
    const { ctx } = this
    return  CommentModel.find().populate('article')
  }
  async createOne(payload) {
    return CommentModel.create(payload)
  }
  async queryByIdAndRemove(id) {
    return CommentModel.findByIdAndRemove(id)
  }
  async deleteMany(idList) {
    return await Promise.all(
      idList.map(id => CommentModel.findByIdAndRemove(id))
    )
  }
  async thumbup(id) {
    return CommentModel.findByIdAndUpdate(id, { $inc: { thumbupCount: 1 } })
  }
}

module.exports = CommentService
