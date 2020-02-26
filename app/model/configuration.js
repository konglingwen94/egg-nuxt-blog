module.exports = app => {
  const { Schema, model } = app.mongoose
  const ConfigurationModel = model(
    'Configuration',
    new Schema({}, { timestamps: true,discriminatorKey:'kind' })
  )

  const SiteConfigModel = ConfigurationModel.discriminator(
    'Siteconfig',
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

  const ProjectIntro = ConfigurationModel.discriminator(
    'Projectintro',
    new Schema({
      platform: {
        webClient: { type: String, default: '' },
        serverUI: { type: String, default: '' },
        serverApi: { type: String, default: '' },
      },
    })
  )

  ConfigurationModel.discriminator(
    'Profile',
    new Schema({
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
    })
  )
  // const AboutusSchema = new Schema(
  //   {
  //     profile: {
  return ConfigurationModel
}
