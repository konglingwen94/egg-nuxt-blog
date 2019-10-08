const { Schema, model } = require('mongoose')
const egg = require('egg')
const CommentModel = require('../model/comment')

const { ObjectId } = Schema.Types

const ArticleSchema = new Schema(
  {
    categoryID: { type: ObjectId, ref: 'Category' },

    title: String,
    tagIdList: [
      {
        type: [ObjectId],
        ref: 'Tag',
      },
    ],
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
   
  return CommentModel.deleteMany({ articleID: model.id })
})

module.exports = model('Article', ArticleSchema)
