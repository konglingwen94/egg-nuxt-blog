const _ = require('lodash')
module.exports = app => {
  const { Schema, model, modelSchemas, models, Types } = app.mongoose
  const { Comment: CommentModel } = models
  // console.log(__filename,models.Comment)
  const { ObjectId } = Schema.Types

  const ArticleSchema = new Schema(
    {
      categoryID: ObjectId,

      title: String,
      tagIdList: [{ type: ObjectId  }],
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
      const duplicateArr = []

      tagIdList
        .slice()
        .sort()
        .sort((a, b) => {
          if (a.equals(b) && !duplicateArr.includes(b)) {
            duplicateArr.push(b)
          }
        })

      if (duplicateArr.length) {
        props.message = 'Duplicate item value'
        props.value = duplicateArr

        return false
      }

      const storageTagIdList = (await models.Tag.find()).map(item => item.id)

      props.value = _.difference(
        tagIdList.map(item => item.toString()),
        storageTagIdList
      )
      // console.log(tagIdList, mongooseArrayTagIdList)
      // tagIdList.forEach((tagObjectId, index) => {
      //   if (!mongooseArrayTagIdList.includes(tagObjectId)) {
      //     props.value.push(tagObjectId)
      //   }
      // })

      return !props.value.length
    },
    propsParameter: true,
  })

  ArticleSchema.post('findOneAndRemove', function(model) {
    if (model && model.id) {
      return models.Comment.deleteMany({ article: model.id })
    }
  })

  ArticleSchema.virtual('commentList', {
    ref: 'Comment', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'articleID', // is equal to `foreignField`
  })
  ArticleSchema.virtual('commentCount', {
    ref: 'Comment', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'articleID', // is equal to `foreignField`
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
