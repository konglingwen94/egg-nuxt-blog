const { Schema, model } = require('mongoose')
const egg = require('egg')
const CommentModel = require('../model/comment')

const { ObjectId } = Schema.Types

const ArticleSchema = new Schema(
  {
    categoryID: ObjectId,

    title: String,
    tagIdList: [ObjectId],
    content: {
      type: Object,
      default: {
        html: '',
        text: '',
      },
    },
    starCount: {
      type: Number,
      default: 0,
    },
    cover: {
      type: Object,
      default: {
        name: '',
        path: '',
      },
    },

    pv: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

ArticleSchema.post('findOneAndRemove', function(model) {
  if (model && model.id) {
    return CommentModel.deleteMany({ article: model.id })
  }
})

ArticleSchema.virtual('comments', {
  ref: 'Comment', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'article', // is equal to `foreignField`
})
ArticleSchema.virtual('commentCount', {
  ref: 'Comment', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'article', // is equal to `foreignField`
  count: true,
})

ArticleSchema.virtual('category', {
  ref: 'Category',
  localField: 'categoryID',
  foreignField: '_id',
  justOne: true,
})

ArticleSchema.virtual('tagList', {
  ref: 'Tag',
  localField: 'tagIdList',
  foreignField: '_id',
})
module.exports = model('Article', ArticleSchema)
