const { Service } = require('egg')
const TagModel = require('../model/tag')

class TagService extends Service {
  async aggretageList() {
    const { ctx } = this
    return TagModel.aggregate()
      .project(ctx.projectFields.tag)
      .lookup({
        from: 'articles',
        let: { tagID: '$id' },
        pipeline: [
          {
            $match: { $expr: { $in: ['$$tagID', '$tagIdList'] } },
          },
          {
            $project: ctx.projectFields.article,
          },
        ],
        as: 'articles',
      })
  }
  async create(payload) {
    const doc = new TagModel(payload)
    await doc.save()
    return doc
  }
 
}

module.exports = TagService
