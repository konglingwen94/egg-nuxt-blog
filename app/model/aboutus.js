module.exports = app => {
  const { Schema, model } = app.mongoose

  const AboutusSchema = new Schema(
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
      carousel: {
        type: Object,
        default: {
          number: 0,
          sort: 'pv',
          interval: 3000,
          loop: false,
          autoplay: true,
        },
      },
    },
    { timestamps: true }
  )

  return model('Aboutus', AboutusSchema)
}
