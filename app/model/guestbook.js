module.exports = app => {
  const { Schema, model } = app.mongoose
  const { ObjectId } = Schema.Types

  const DialogueSchema = new Schema(
    {
      responseTo: { type: ObjectId, ref: 'Dialogue' },

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
          ref: 'Dialogue',
        },
      ],
    },
    { timestamps: true }
  )

  DialogueSchema.post('findOneAndRemove', doc => {
    return doc.constructor.deleteMany({ _id: doc.dialogues })
  })

  DialogueSchema.pre('find', function() {
    // console.log(__filename, 'pre-find')
  })
   
  DialogueSchema.pre('findOneAndUpdate', function() {
    // console.log(__filename, 'pre-findOneAndUpdate')
  })

  return model('Dialogue', DialogueSchema)
}
