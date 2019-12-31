module.exports = app => {
  const { Schema, model } = app.mongoose

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

  TagSchema.pre('findOneAndRemove', async function(doc, next) {
    const tagDoc = await this.model
      .findById(this._conditions._id)
      .populate('articleCount')

    if (tagDoc.articleCount > 0) {
      const error = new Error('此标签下有文章')
      error.status = 403
      throw error
    }
    next()
  })

  

  return model('Tag', TagSchema)
}
