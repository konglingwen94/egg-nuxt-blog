const { Schema, model } = require('mongoose')
const { ObjectId } = Schema.Types

const DialogueSchema = new Schema(
  {
    kind: String,
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
    responseTo: {
      type: ObjectId,
      refPath: 'Dialogues.kind',
    },
  },
  { timestamps: true }
)

model('Dialogues', DialogueSchema)

const GuestbookSchema = new Schema(
  {
    kind: { type: String, default: 'guestbook' },
    content: {
      type: String,
      default: '',
    },
    diggCount: {
      type: Number,
      default: 0,
    },
    nickname: {
      type: String,
      default: '',
    },
    dialogues: {
      type: [DialogueSchema],
      default: [],
    },
  },
  { timestamps: true }
)

module.exports = model('Guestbook', GuestbookSchema)
