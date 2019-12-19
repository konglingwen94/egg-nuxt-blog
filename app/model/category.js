const { Schema, model } = require('mongoose')
const { ObjectId } = Schema.Types

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

CategorySchema.virtual('articleCount', {
  ref: 'Article',
  localField: '_id',
  foreignField: 'category',
  // count: true,
})

CategorySchema.virtual('publishedArticleCount', {
  ref: 'Article',
  localField: '_id',
  foreignField: 'category',
  // count: true,
  options: { isPublished: true },
})

module.exports = model('Category', CategorySchema)
