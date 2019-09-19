const { Schema, model } = require('mongoose')
const { ObjectId } = Schema.Types

const DialogueSchema = new Schema(
  {
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
    responseTo: ObjectId,
  },
  { timestamps: true }
)

const GuestbookSchema = new Schema(
  {
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
