module.exports = app => {
  const { Schema,  model } = app.mongoose
  const ConfigurationModel = model('Configuration', new Schema({}, { timestamps: true }))

  const SiteConfigModel = ConfigurationModel.discriminator(
    'SiteConfig',
    new Schema({
      carousel: {
        number: { type: Number, default: 1 },
        sort: { type: String, default: 'pv' },
        interval: { type: Number, default: '3000' },
        loop: { type: Boolean, default: true },
        autoplay: { type: Boolean, default: true },
      },
      message: {
        renderLayer: {
          type: Number,
          default: 2,
        },
        expandLayer: {
          type: Number,
          default: 2,
        },
      },
    })
  )



  const ProjectIntro=ConfigurationModel.discriminator('ProjectIntro',new Schema({
      profile: {
        personal: {
          description: {
            type: String,
            default: '',
          },
          contact: [{}],
        },
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
    
  }))
  // const AboutusSchema = new Schema(
  //   {
  //     profile: {
  return ConfigurationModel
}
