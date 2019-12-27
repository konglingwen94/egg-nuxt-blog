const { Service } = require('egg')
const TagModel = require('../model/tag')

class TagService extends Service {
  async queryList() {
    const { ctx } = this
    return TagModel.find()
      .populate('articleCount')
      .populate({ path: 'articlePublishedCount', match: { isPublished: true } })
  }
  async create(payload) {
    const doc = new TagModel(payload)
    return doc.save()
  }
}

module.exports = TagService
