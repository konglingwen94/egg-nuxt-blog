const gravatar = require('gravatar')

module.exports = app => {
  const { Schema, model } = app.mongoose
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
      articleID: {
        type: ObjectId,
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

  CommentSchema.virtual('article', {
    ref: 'Article',
    localField: 'articleID',
    foreignField: '_id',
    justOne: true,
  })

  CommentSchema.post('save', function(next) {
    return this.populate('article').execPopulate(next)
  })

  CommentSchema.virtual('avatar').get(function() {
    return gravatar.url(this.email)
  })

  return model('Comment', CommentSchema)
}
