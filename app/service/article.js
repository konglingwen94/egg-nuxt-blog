const { Service } = require('egg')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

class ArticleService extends Service {
  queryListByOptions(options = {}) {
    const { ctx } = this

    if (ctx.state.platformENV === 'web') {
      options.isPublished = true
    }

    const result = ctx.model.Article.find(options)

      .populate('tagList')
      .populate('category')
      .populate('commentCount')

    return result
  }

  async create(payload) {
    const { ctx } = this
    const doc = new ctx.model.Article(payload)
    console.log(__filename, doc)
    return doc.save()
  }

  async queryByTagIdList(tagIdList) {
    const { ctx } = this

    // console.log(__filename,id,tagIdList)
    return ctx.model.Article.find({ tagIdList })
  }

  async deleteMany(idList) {
    return this.ctx.model.Article.deleteMany({ _id: idList })
  }
}
module.exports = ArticleService
