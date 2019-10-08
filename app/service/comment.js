const { Service } = require('egg')
const CommentModel = require('../model/comment')

class CommentService extends Service {
  async aggregateList() {
    const { ctx } = this
    return await CommentModel.aggregate([
      // { $match: ctx.state.filter },
      {
        $lookup: {
          from: 'articles',
          localField: 'articleID',
          foreignField: '_id',
          as: 'article',
        },
      },
      {
        $project: {
          ...ctx.projectFields.comment,
          articleTitle: '$article.title',
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ])
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
