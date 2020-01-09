const { Service } = require('egg')

class CategoryService extends Service {
  async queryList() {
    const { ctx } = this

    const result = this.ctx.model.Category.find()
      .sort({ createdAt: -1 })
      .populate('articleCount')
      .populate({ path: 'articlePublishedCount', match: { isPublished: true } })

    return result
  }
  async queryById(id) {
    return this.ctx.model.Category.findById(id)
      // .populate('articleList')
      .populate({ path: 'articleCount' })
      .populate({ path: 'articlePublishedCount', match: { isPublished: true } })
      .exec()
  }
}

module.exports = CategoryService
