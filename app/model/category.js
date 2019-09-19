const { Schema, model } = require('mongoose')
const { ObjectId } = Schema.Types

const ArticleCategorySchema = new Schema(
  {
    name: {
      type: String,
      default: '',
    },
   
    articleIdList: [{ type: ObjectId, ref: 'Article' }],
  },
  {
    timestamps: true,
  }
)

module.exports = model('ArticleCategory', ArticleCategorySchema)
