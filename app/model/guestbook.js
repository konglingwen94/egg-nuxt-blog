const { Schema, model } = require('mongoose')
const { ObjectId } = Schema.Types

const DialogueSchema = new Schema(
  {
    responseTo: { type: ObjectId, ref: 'Dialogue'   },
    // kind: String,
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

DialogueSchema.post('findOneAndRemove', doc =>
  DialogModel.deleteMany({ _id: doc.dialogues })
)

const DialogModel = model('Dialogue', DialogueSchema)

module.exports = DialogModel
