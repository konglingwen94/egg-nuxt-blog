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
    const {
      article: articleProject,
      comment: commentProject,
      tag: tagProject,
      category: categoryProject,
    } = ctx.projectFields

    const result = ArticleModel.aggregate()
      .match(ctx.state.filter || {})
      .lookup({
        from: 'categories',
        let: { categoryID: '$categoryID' },

        as: 'category',
        pipeline: [
          { $match: { $expr: { $eq: ['$$categoryID', '$_id'] } } },
          { $project: categoryProjectionFields },
        ],
      })
      .unwind('$category')
      .project(ctx.projectFields.article)
      .lookup({
        from: 'comments',
        let: { id: '$id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$$id', '$articleID'],
              },
            },
          },
          {
            $project: commentProjectFields,
          },
          {
            $sort: { createdAt: -1 },
          },
        ],
        as: 'comments',
      })
      .lookup({
        from: 'tags',
        let: { tagIdList: '$tagIdList' },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ['$_id', '$$tagIdList'],
              },
            },
          },
          {
            $project: tagProjectionFields,
          },
        ],
        as: 'tagList',
      })
      .sort({ createdAt: -1 })

    return result
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

    const result = await ArticleModel.aggregate()
      .match({ _id: ObjectId(id) })
      .lookup({
        from: 'tags',
        as: 'tagList',
        foreignField: '_id',
        localField: 'tagIdList',
      })
      .lookup({
        from: 'comments',
        as: 'commentList',
        foreignField: 'articleID',
        localField: '_id',
      })
      .project({
        ...ctx.projectFields.article,
        tagList: { name: 1, updatedAt: 1, createdAt: 1, id: '$_id' },
        commentList: {
          content: 1,
          nickname: 1,
          thumbupCount: 1,
          updatedAt: 1,
          createdAt: 1,
          id: '$_id',
        },
      })

    return result[0]
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
