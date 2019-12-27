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
  foreignField: 'tagIdList',
  count: true,
  // autopopulate: true,
})
TagSchema.virtual('articlePublishedCount', {
  ref: 'Article',
  localField: '_id',
  foreignField: 'tagIdList',
  count: true,
  // autopopulate: true,
})

TagSchema.post('save', (doc, next) => {
  doc
    .populate('articleCount')
    .populate({ path: 'articlePublishedCount', match: { isPublished: true } })
    .execPopulate(next)
})

 

// TagSchema.plugin(require('mongoose-autopopulate'))

module.exports = model('Tag', TagSchema)
