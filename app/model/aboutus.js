module.exports = app => {
  const { Schema, model } = app.mongoose

  const AboutusSchema = new Schema(
    {
      profile: {
        personal: { type: String, default: '' },
        technology: {
          frontend: { type: String, default: '' },
          serverSide: { type: String, default: '' },
        },
      },
      platform: {
        webClient: { type: String, default: '' },
        serverUI: { type: String, default: '' },
        serverApi: { type: String, default: '' },
      },
      carousel: {
        number: { type: Number, default: 1 },
        sort: { type: String, default: 'pv' },
        interval: { type: Number, default: '3000' },
        loop: { type: Boolean, default: true },
        autoplay: { type: Boolean, default: true },
      },
    },
    { timestamps: true }
  )

  return model('Aboutus', AboutusSchema)
}
