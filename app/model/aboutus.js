module.exports = app => {
  const { Schema, models, model } = app.mongoose

  const AboutusSchema = new Schema(
    {
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
      carousel:  {
        maxNumber: { type: Number, default: 1 },
        number: { type: Number, default: 1 },
        sort: { type: String, default: 'pv' },
        interval: { type: Number, default: '3000' },
        loop: { type: Boolean, default: true },
        autoplay: { type: Boolean, default: true },
      },
    },
    { timestamps: true }
  )

   

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

  return model('Aboutus', AboutusSchema)
}
