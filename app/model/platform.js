module.exports = app => {
  const { Schema, models, model } = app.mongoose
  const baseSchema = new Schema()
  const BaseModel = model('Base', new Schema({}, { timestamps: true }))
  const PlatformModel = BaseModel.discriminator(
    'Platform',
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
  // const AboutusSchema = new Schema(
  //   {
  //     profile: {
  //       personal: {
  //         description: {
  //           type: String,
  //           default: '',
  //         },
  //         contact: [{}],
  //       },
  //       technology: {
  //         frontend: { type: String, default: '' },
  //         serverSide: { type: String, default: '' },
  //       },
  //     },
  //     platform: {
  //       webClient: { type: String, default: '' },
  //       serverUI: { type: String, default: '' },
  //       serverApi: { type: String, default: '' },
  //     },
  //     carousel: {
  //       number: { type: Number, default: 1 },
  //       sort: { type: String, default: 'pv' },
  //       interval: { type: Number, default: '3000' },
  //       loop: { type: Boolean, default: true },
  //       autoplay: { type: Boolean, default: true },
  //     },
  //   },
  //   { timestamps: true }
  // )

  // AboutusSchema.virtual('carousel.max', {
  //   // ref: 'Article',
  //   // localField: '_id',
  //   count: true,
  // })
  // AboutusSchema.virtual('carousel.maxNumber').get(async function() {
  //   const isPublishedArticleCount = await models.Article.countDocuments({
  //     isPublished: true,
  //   })

  //   console.log(__filename, arguments, this, isPublishedArticleCount)

  //   return Math.min(this.carousel.number, isPublishedArticleCount)
  // })

  return PlatformModel
}
