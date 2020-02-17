const gravatar = require('gravatar')

module.exports = app => {
  const { Schema, model ,models} = app.mongoose
  const { ObjectId } = Schema.Types

  const MessageSchema = new Schema(
    {
      email: {
        type: String,
        default: '',
      },
      nickname: {
        type: String,
        default: '',
      },
      content: {
        type: String,
        default: '',
      },
      thumbupCount: {
        type: Number,
        default: 0,
      },
      parentID: ObjectId,
    },
    { timestamps: true }
  )
  MessageSchema.virtual('avatar').get(function() {
    return gravatar.url(this.email)
  })

  MessageSchema.post('findOneAndDelete', async function(payload) {
 

    if (!payload || !payload.id) {
      return
    }

    const children =await models.Message.find({ parentID: payload.id })

    return Promise.all(
      children.map(item => {
        return models.Message.findByIdAndDelete(item.id)
      })
    )
  })

  const MessageModel = model('Message', MessageSchema)

  return MessageModel
}
