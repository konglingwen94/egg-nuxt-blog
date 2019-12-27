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

CategorySchema.post('save', function(doc, next) {
  doc.populate('articleCount').populate({
    path: 'articlePublishedCount',
    match: {
      isPublished: true,
    },
  }).execPopulate(next)
})

CategorySchema.virtual('articleCount', {
  ref: 'Article',
  localField: '_id',
  foreignField: 'categoryID',
  count: true,
})

CategorySchema.virtual('articlePublishedCount', {
  ref: 'Article',
  localField: '_id',
  foreignField: 'categoryID',
  count: true,
})

module.exports = model('Category', CategorySchema)
