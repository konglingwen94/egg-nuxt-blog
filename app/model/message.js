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
      diggCount: {
        type: Number,
        default: 0,
      },
    },
    { timestamps: true }
  )
  MessageSchema.virtual('avatar').get(function() {
    return gravatar.url(this.email)
  })

  MessageSchema.virtual('dialogues', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'parentID',
  }) 

  const MessageModel = model('Message', MessageSchema)

  const ResponseModel = MessageModel.discriminator(
    'Response',
    new Schema({
      parentID: { type: ObjectId, ref: 'Message' },
      responseTo: {
        type: ObjectId,
        ref: 'Response',
      },
    })
  )

  return MessageModel
}
