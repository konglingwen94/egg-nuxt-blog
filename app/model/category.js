module.exports = app => {
  const { Schema, model, models } = app.mongoose
  const { ObjectId } = Schema.Types

  const CategorySchema = new Schema(
    {
      name: {
        type: String,
        unique: true,

        default: '',
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

  CategorySchema.pre('save', async function(next) {
    const result = await models.Category.findOne({ name: this.name })

    if (result) {
      const error = new Error('重复的分类名称')
      error.status = 400
      // throw error
      return next(error)
    }
    next()
  })

  CategorySchema.post('save', function(doc, next) {
    doc
      .populate('articleCount')
      .populate({
        path: 'articlePublishedCount',
        match: {
          isPublished: true,
        },
      })
      .execPopulate(next)
  })

  CategorySchema.pre('findOneAndRemove', async function(doc, next) {
    const result = await this.model
      .findById(this._conditions._id)
      .populate('articleCount')

    if (result.articleCount > 0) {
      const error = new Error('此分类下有文章')
      error.status = 403
      throw error
    }
    next()
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

  CategorySchema.virtual('articleList', {
    ref: 'Article',
    localField: '_id',
    foreignField: 'categoryID',
  })

  return model('Category', CategorySchema)
}
