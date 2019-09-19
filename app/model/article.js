const { Schema, model } = require('mongoose')
const ArticleCategoryModel = require('./articleCategory')
const TagModel = require('./tag')

const { ObjectId } = Schema.Types

const ArticleSchema = new Schema(
  {
    categoryID: { type: ObjectId, ref: 'ArticleCategory' },
    commentIdList: [{ type: ObjectId, ref: 'Comment' }],
    title: String,
    tagIdList: {
      type: [ObjectId],
      default: [],
    },
    content: {
      type: Object,
      html: String,
      text: String,
      default: {
        html: '',
        text: '',
      },
    },
    starCount: {
      type: Number,
      default: 0,
    },
    cover: {
      type: Object,
      default: {
        name: '',
        path: '',
      },
    },
    comment: {
      type: String,
      default: '',
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

ArticleSchema.post('save', async function() {
  const p1 = ArticleCategoryModel.findByIdAndUpdate(this.categoryID, {
    $addToSet: { articleIdList: this.id },
  })

  const p2 = TagModel.updateMany(
    { _id: { $in: this.tagIdList } },
    {
      $addToSet: { articleIdList: this.id },
    }
  )
  await Promise.all([p1, p2])
})

ArticleSchema.post('findOneAndRemove', async function(doc) {
  const categoryUpdate = ArticleCategoryModel.updateOne(
    { articleIdList: doc.id },
    { $pull: { articleIdList: doc.id } }
  )

  const tagUpdate = TagModel.updateMany(
    { _id: { $in: doc.tagIdList } },
    {
      $pull: { articleIdList: doc.id },
    }
  )

  await Promise.all([categoryUpdate, tagUpdate])
})

ArticleSchema.post('findOneAndUpdate', async function(doc) {
  const { categoryID, id, tagIdList } = await this.findOne()
  const categoryUpdatePull = ArticleCategoryModel.findByIdAndUpdate(
    doc.categoryID,
    {
      $pull: { articleIdList: id },
    }
  )
  const categoryUpdateAdd = ArticleCategoryModel.findByIdAndUpdate(categoryID, {
    $addToSet: { articleIdList: id },
  })

  const tagUpdatePull = TagModel.updateMany(
    { _id: { $in: doc.tagIdList } },
    { $pull: { articleIdList: id } }
  )
  const tagUpdateAdd = TagModel.updateMany(
    { _id: { $in: tagIdList } },
    { $addToSet: { articleIdList: id } }
  )


  await Promise.all([
    categoryUpdatePull,
    categoryUpdateAdd,
    tagUpdatePull,
    tagUpdateAdd,
  ])
})

module.exports = model('Article', ArticleSchema)
