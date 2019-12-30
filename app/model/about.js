module.exports = app => {
  const { Schema, model } = app.mongoose

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

  return model('About', AboutSchema)
}
