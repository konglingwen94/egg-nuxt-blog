const { Schema, model } = require('mongoose')
const egg = require('egg')
const CommentModel = require('../model/comment')

const { ObjectId } = Schema.Types

const ArticleSchema = new Schema(
  {
    category: {
      type: ObjectId,
      ref: 'Category',
    },

    title: String,
    tags: [
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
  if (model && model.id) {
    return CommentModel.deleteMany({ articleID: model.id })
  }
})

ArticleSchema.virtual('comments', {
  ref: 'Comment', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'article', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false,
})

module.exports = model('Article', ArticleSchema)
