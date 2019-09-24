const { Schema, model } = require('mongoose')

const AboutSchema = new Schema(
  {
    contact: {
      type: Object,
      default: {
        qq: '',
        wechat: '',
        github: '',
      },
    },
    profile: {
      type: Object,
      default: {
        description: '',
      },
    },
    platform: {
      type: Object,
      default: {
        description: '',
      },
    },
  },
  { timestamps: true }
)

module.exports = model('About', AboutSchema)
