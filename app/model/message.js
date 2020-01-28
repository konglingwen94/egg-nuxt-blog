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

  const MessageModel = model('Message', MessageSchema)

  const GuestbookSchema = new Schema({
    dialogues: [{ type: ObjectId, ref: 'Response' }],
  })

  GuestbookSchema.post('findOneAndDelete', function(guestbookDoc) {
    console.log(__filename, 'post-findOneAndDelete', arguments, this)
    if (guestbookDoc && guestbookDoc.dialogues) {
      return ResponseModel.deleteMany({ _id: guestbookDoc.dialogues })
    }

    // return doc.constructor.deleteMany({ _id: doc.dialogues })
  })

  const GuestbookModel = MessageModel.discriminator(
    'Guestbook',
    GuestbookSchema
  )

  const ResponseModel = MessageModel.discriminator(
    'Response',
    new Schema({
      responseTo: {
        type: ObjectId,
        ref: 'Message',
      },
    })
  )

  return MessageModel
}
