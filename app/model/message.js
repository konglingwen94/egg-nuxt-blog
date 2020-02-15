const gravatar = require('gravatar')

module.exports = app => {
  const { Schema, model } = app.mongoose
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

  const MessageModel = model('Message', MessageSchema)

  return MessageModel
}
