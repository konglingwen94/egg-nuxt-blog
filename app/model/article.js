const { Schema, model } = require('mongoose')
const ArticleCategoryModel = require('./category')
const TagModel = require('./tag')

const { ObjectId } = Schema.Types

const ArticleSchema = new Schema(
  {
    categoryID: { type: ObjectId, ref: 'ArticleCategory' },
    commentIdList: [{ type: ObjectId, ref: 'Comment' }],
    title: String,
    tagIdList: {
      type: [ObjectId],
      default: [],
    },
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
    comment: {
      type: String,
      default: '',
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

module.exports = model('Article', ArticleSchema)
