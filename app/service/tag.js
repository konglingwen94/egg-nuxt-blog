const { Service } = require('egg')
const TagModel = require('../model/tag')

class TagService extends Service {
  async aggretageList() {
    const { ctx } = this
    return TagModel.aggregate().project(ctx.projectFields.tag)
  }
}

module.exports = TagService
