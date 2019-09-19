const { Schema, model } = require('mongoose')

const { ObjectId } = Schema.Types

const TagSchema = new Schema(
  {
    name: {
      type: String,
      default: '',
      unique: true,
    },
    articleIdList: {
      type: [ObjectId],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)


 


module.exports = model('Tag', TagSchema)
