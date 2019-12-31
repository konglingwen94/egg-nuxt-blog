const { Service } = require('egg')

class TagService extends Service {
  async queryList() {
    const { ctx } = this
    return this.ctx.model.Tag.find()
      .populate('articleCount')
      .populate({ path: 'articlePublishedCount', match: { isPublished: true } })
  }
  async create(payload) {
    const doc = new this.ctx.model.Tag(payload)
    return doc.save()
  }
}

module.exports = TagService
