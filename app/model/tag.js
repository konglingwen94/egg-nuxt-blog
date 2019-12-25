const { Schema, model } = require('mongoose')

const { ObjectId } = Schema.Types

const TagSchema = new Schema(
  {
    name: {
      type: String,
      default: '',
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)

TagSchema.virtual('articleCount', {
  ref: 'Article',
  localField: '_id',
  foreignField: 'tags',
  count: true,
})
TagSchema.virtual('articlePublishedCount', {
  ref: 'Article',
  localField: '_id',
  foreignField: 'tags',
  count: true,
})

module.exports = model('Tag', TagSchema)
