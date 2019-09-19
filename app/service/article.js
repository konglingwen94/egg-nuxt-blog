const { Service } = require('egg')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const ArticleModel = require('../model/article')
const ArticleCategoryModel = require('../model/category')
const TagModel = require('../model/tag')
const {
  article: articleFields,
  comment: commentProjectFields,
  articleCategory: categoryProjectionFields,
  tag: tagProjectionFields,
} = require('../types/projectFields')

const {
  articleCategory: articleCategoryFields,
} = require('../types/projectFields')

module.exports = class ArticleService extends Service {
  async queryList(ctx) {
    const result = await ArticleModel.aggregate([
      // {
      //   $match: ctx.state.filter,
      // },
      {
        $lookup: {
          from: 'articlecategories',
          let: { categoryID: '$categoryID' },

          as: 'category',
          pipeline: [
            { $match: { $expr: { $eq: ['$$categoryID', '$_id'] } } },
            { $project: categoryProjectionFields },
          ],
        },
      },
      {
        $unwind: '$category',
      },
      {
        $project: articleFields,
      },
      {
        $lookup: {
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
        },
      },
      {
        $lookup: {
          from: 'tags',
          let: { id: '$id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$$id', '$articleIdList'],
                },
              },
            },
            {
              $project: tagProjectionFields,
            },
          ],
          as: 'tagList',
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ])

    return result
  }
  async createOne(ctx) {}
}
