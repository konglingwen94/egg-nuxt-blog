const { Service } = require('egg')
const TagModel = require('../model/tag')

class TagService extends Service {
  async queryList() {
    const { ctx } = this
    return TagModel.find()
      
  }
  async create(payload) {
    const doc = new TagModel(payload)
    await doc.save()
    return doc
  }
 
}

module.exports = TagService
