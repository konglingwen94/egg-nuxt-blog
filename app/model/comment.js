const { Schema, model } = require('mongoose')
const { ObjectId } = Schema.Types

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    article: {
      type: ObjectId,
      ref: 'Article',
    },
    nickname: {
      type: String,
      default: '',
    },
    thumbupCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model('Comment', CommentSchema)
