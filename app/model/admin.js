const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      default: '你好',
    },
    role: {
      type: String,
      default: 'JUNIOR',
    },
    level: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
)

AdminSchema.pre('save', next => {
  if (!this.isNew) {
    this.updatedAt = Date.now()
  }
  next()
})

module.exports = mongoose.model('Admin', AdminSchema)
