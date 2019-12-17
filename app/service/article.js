const { Service } = require('egg')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const ArticleModel = require('../model/article')
const {
  article: articleFields,
  comment: commentProjectFields,
  category: categoryProjectionFields,
  tag: tagProjectionFields,
} = require('../types/projectField')

const {
  articleCategory: articleCategoryFields,
} = require('../types/projectField')

module.exports = class ArticleService extends Service {
  async queryList() {
    const { ctx } = this

    const result = await ArticleModel.find(ctx.state.filter || {})
      .sort('-createdAt')
      .populate('tagIdList')
      .populate('category')
      .populate('commentList')

    console.log(result)

    return result
  }
  async queryCarouselList() {
    return await ArticleModel.find()
      .sort('-pv')
      .limit(4)
  }
  async publishedCount() {
    return ArticleModel.count({ isPublished: true })
  }
  async countOwnCategoryArticle(categoryID) {
    const articleCount = await ArticleModel.countDocuments({ categoryID })
    const articlePublishedCount = await ArticleModel.countDocuments({
      categoryID,
      isPublished: true,
    })
    return { articleCount, articlePublishedCount }
  }
  async countOwnTagArticle(tagID) {
    const articleCount = await ArticleModel.countDocuments({ tagIdList: tagID })
    const articlePublishedCount = await ArticleModel.countDocuments({
      tagIdList: tagID,
      isPublished: true,
    })

    return { articleCount, articlePublishedCount }
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
    return ArticleModel.findOne({ tagIdList: tagID })
  }
  async queryByTagIdList(tagIdList) {
    const { ctx } = this
    return ArticleModel.aggregate()
      .match({
        $and: [
          {
            tagIdList: {
              $in: tagIdList,
            },
          },
          { isPublished: true },
        ],
      })
      .project(ctx.projectFields.article)
  }
  async queryOneById(id) {
    const { ctx } = this

    const result = await ArticleModel.findById(id)
      .populate('category')
      .populate('comments')
      // .populate('tags')

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
  async updatePublishStatus(id, isPublished) {
    return ArticleModel.findByIdAndUpdate(id, { $set: { isPublished } })
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
