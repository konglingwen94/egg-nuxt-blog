const { Service } = require('egg')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const ArticleModel = require('../model/article')

module.exports = class ArticleService extends Service {
  async queryList() {
    const { ctx } = this

    const result = ArticleModel.find(ctx.state.filter || {})
      .sort('-createdAt')
      .populate('tagList')
      .populate('category')
      .populate('commentCount')

    return result
  }
  async queryCarouselList() {
    return ArticleModel.find()
      .sort('-pv')
      .limit(4)
  }

  async create(payload) {
    const doc = new ArticleModel(payload)
    return doc.save()
  }
  async queryByIdAndUpdate(id, payload) {
    return ArticleModel.findByIdAndUpdate(id, {
      $set: payload,
    })
  }
  async queryByCategoryID(categoryID) {
    return ArticleModel.findOne({ categoryID })
  }
  async queryOneByTagID(tagID) {
    return ArticleModel.findOne({ tagIdList: tagID })
  }
  async queryByTagIdList(tagIdList) {
    const { ctx } = this

    // console.log(__filename,id,tagIdList)
    return ArticleModel.find({ tagIdList })
  }
  async queryOneById(id) {
    const { ctx } = this

    const result = ArticleModel.findById(id)
      .populate('category')
      .populate('comments')
      .populate('tagList')

    return result
  }
  async queryByIdAndRemove(id) {
    return ArticleModel.findByIdAndRemove(id)
  }
  async deleteMany(idList) {
    return ArticleModel.deleteMany({ id: idList })
  }

  async incrementPv(id) {
    return ArticleModel.findByIdAndUpdate(id, {
      $inc: { pv: 1 },
    })
  }
  async queryByIdAndStarOne(id) {
    return ArticleModel.findByIdAndUpdate(id, { $inc: { starCount: 1 } })
  }
}
