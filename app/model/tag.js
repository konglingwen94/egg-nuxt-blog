module.exports = app => {
  const { Schema, model, models } = app.mongoose

  const { ObjectId } = Schema.Types

  const TagSchema = new Schema(
    {
      name: {
        type: String,
        default: '',
        unique: true,
      },
      cover: {
        type: Object,
        default: {
          name: '',
          path: '',
        },
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
  })
  TagSchema.virtual('articlePublishedCount', {
    ref: 'Article',
    localField: '_id',
    foreignField: 'tagIdList',
    count: true,
  })

  TagSchema.virtual('articleList', {
    ref: 'Article',
    localField: '_id',
    foreignField: 'tagIdList',
  })

  TagSchema.pre('save', async function(next) {
    const result = await models.Tag.findOne({ name: this.name })
    console.log(__filename, this, result)
    if (result) {
      const error = new Error('重复的标签名称')
      error.status = 400
      return next(error)
    }
    next()
  })

  TagSchema.post('save', (doc, next) => {
    doc
      .populate('articleCount')
      .populate({ path: 'articlePublishedCount', match: { isPublished: true } })
      .execPopulate(next)
  })

  TagSchema.pre('findOneAndRemove', async function(doc, next) {
    const result = await this.model
      .findById(this._conditions._id)
      .populate('articleCount')

    if (result.articleCount > 0) {
      const error = new Error('此标签下有文章')
      error.status = 403
      throw error
    }
    next()
  })

  return model('Tag', TagSchema)
}
