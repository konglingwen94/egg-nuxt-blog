const { Service } = require('egg')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const ArticleModel = require('../model/article')

module.exports = class ArticleService extends Service {
  async queryList() {
    const { ctx } = this

    const result = ArticleModel.find(ctx.state.filter || {})
      .sort('-createdAt')
      .populate('tags')
      .populate('category')
      .populate('commentCount')

    return result
  }
  async queryCarouselList() {
    return await ArticleModel.find()
      .sort('-pv')
      .limit(4)
  }

  async create(payload) {
    const doc = new ArticleModel(payload)
    await doc.save()
    return doc
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
    console.log(__filename, ArticleModel.findOne({ tags: tagID }))
    return ArticleModel.findOne({ tags: tagID })
  }
  async queryByTagIdList(tagIdList) {
    const { ctx } = this
    return ArticleModel.find({ tagIdList })
  }
  async queryOneById(id) {
    const { ctx } = this

    const result = await ArticleModel.findById(id)
      .populate('category')
      .populate('comments')
      .populate('tags')
    console.log(__filename, id, result)
    return result
  }
  async queryByIdAndRemove(id) {
    return ArticleModel.findByIdAndRemove(id)
  }
  async deleteMany(idList) {
    return Promise.all(
      idList.map(id => {
        return ArticleModel.findByIdAndRemove(id)
      })
    )
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
