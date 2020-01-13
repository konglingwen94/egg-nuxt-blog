module.exports = app => {
  const { Schema, model, modelSchemas, models } = app.mongoose
  const { Comment: CommentModel } = models
  // console.log(__filename,models.Comment)
  const { ObjectId } = Schema.Types

  const ArticleSchema = new Schema(
    {
      categoryID: ObjectId,

      title: String,
      tagIdList: [ObjectId],
      content: {
        html: {
          type: String,
          default: '',
        },
        text: {
          type: String,
          default: '',
        },
      },
      starCount: {
        type: Number,
        default: 0,
      },
      cover: {
        path: {
          type: String,
          default: '',
        },
        name: {
          type: String,
          default: '',
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

  ArticleSchema.path('categoryID').validate(async function(id) {
    return models.Category.findById(id)
  })

  ArticleSchema.path('tagIdList').validate({
    async validator(tagIdList, props) {
      const results = await Promise.all(
        tagIdList.map(tagID => models.Tag.findById(tagID))
      )

      console.log(__filename, results)
      // props.value = []
      results.forEach((result, index) => {
        if (result) {
          props.value.splice(index, 1)
        }
      })
      return results.every(item => item)
    },
    propsParameter: true,
  })

  ArticleSchema.post('findOneAndRemove', function(model) {
    if (model && model.id) {
      return models.Comment.deleteMany({ article: model.id })
    }
  })

  ArticleSchema.virtual('comments', {
    ref: 'Comment', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'article', // is equal to `foreignField`
  })
  ArticleSchema.virtual('commentCount', {
    ref: 'Comment', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'article', // is equal to `foreignField`
    count: true,
  })

  ArticleSchema.virtual('category', {
    ref: 'Category',
    localField: 'categoryID',
    foreignField: '_id',
    justOne: true,
  })

  ArticleSchema.virtual('tagList', {
    ref: 'Tag',
    localField: 'tagIdList',
    foreignField: '_id',
  })
  return model('Article', ArticleSchema)
}
