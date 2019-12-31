const { Service } = require('egg')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

module.exports = class ArticleService extends Service {
  async queryList() {
    const { ctx } = this

    const result = ctx.model.Article.find(ctx.state.filter || {})
      .sort('-createdAt')
      .populate('tagList')
      .populate('category')
      .populate('commentCount')

    return result
  }
  async queryCarouselList() {
    return this.ctx.model.Article.find()
      .sort('-pv')
      .limit(4)
  }

  async create(payload) {
    const {ctx}=this
    const doc = new ctx.model.Article(payload)
    return doc.save()
  }
  async queryByIdAndUpdate(id, payload) {
    const {ctx}=this
    return ctx.model.Article.findByIdAndUpdate(id, {
      $set: payload,
    })
  }
  async queryByCategoryID(categoryID) {
    return this.ctx.model.Article.findOne({ categoryID })
  }
  // async queryOneByTagID(tagID) {
  //   return this.ctx.model.Article.findOne({ tagIdList: tagID })
  // }
  async queryByTagIdList(tagIdList) {
    const { ctx } = this

    // console.log(__filename,id,tagIdList)
    return ctx.model.Article.find({ tagIdList })
  }
  async queryOneById(id) {
    const { ctx } = this

    const result = ctx.model.Article.findById(id)
      .populate('category')
      .populate('comments')
      .populate('tagList')

    return result
  }
  async queryByIdAndRemove(id) {
    return this.ctx.model.Article.findByIdAndRemove(id)
  }
  async deleteMany(idList) {
    return this.ctx.model.Article.deleteMany({ id: idList })
  }

  async incrementPv(id) {
    return this.ctx.model.Article.findByIdAndUpdate(id, {
      $inc: { pv: 1 },
    })
  }
  async queryByIdAndStarOne(id) {
    return this.ctx.model.Article.findByIdAndUpdate(id, { $inc: { starCount: 1 } })
  }
}
