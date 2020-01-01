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
      responseTo: {
        type: ObjectId,
        ref: 'Dialogue',
      },
    },
    { timestamps: true }
  )

  DialogueSchema.post('findOneAndRemove', doc => {
     

    return doc.constructor.deleteMany({ _id: doc.dialogues })
  })

  return model('Dialogue', DialogueSchema)
}
