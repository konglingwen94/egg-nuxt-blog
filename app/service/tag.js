const { Service } = require('egg')

class TagService extends Service {
  async queryList() {
    const { ctx } = this

    const result = this.ctx.model.Tag.find()
      .populate('articleCount')
      .populate({ path: 'articlePublishedCount', match: { isPublished: true } }).exec()

    
    return result
  }
  async create(payload) {
    const doc = new this.ctx.model.Tag(payload)
    return doc.save()
  }
}

module.exports = TagService