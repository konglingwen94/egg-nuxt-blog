module.exports = app => {
  const { Schema, model } = app.mongoose
  const { ObjectId } = Schema.Types

  const GuestbookSchema = new Schema(
    {
      responseTo: { type: ObjectId, ref: 'Guestbook' },

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
      dialogues: [
        {
          type: ObjectId,
          ref: 'Guestbook',
        },
      ],
    },
    { timestamps: true }
  )

  GuestbookSchema.post('findOneAndRemove', doc => {
    return doc.constructor.deleteMany({ _id: doc.dialogues })
  })

  GuestbookSchema.pre('find', function() {
    // console.log(__filename, 'pre-find')
  })
   
  GuestbookSchema.pre('findOneAndUpdate', function() {
    // console.log(__filename, 'pre-findOneAndUpdate')
  })

  return model('Guestbook', GuestbookSchema)
}
