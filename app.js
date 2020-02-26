class AppBootHook {
  constructor(app) {
    this.app = app
    app.config.coreMiddleware.unshift('history', 'docs', 'compress')
  }
  
  async didLoad() {


 


    const { mongoose, config } = this.app
    const { url } = this.app.config.mongoose

    mongoose.connection.once('close', async () => {
      console.log(`Database is closed on ${url}`)
    })
    mongoose.connection.on('error', error => console.error(error))
  }
  serverDidReady() {
    const { validator, mongoose } = this.app
    validator.addRule('objectId', (rule, value) => {
      try {
        mongoose.Types.ObjectId(value)
      } catch (err) {
        return err.message
      }
    })

    validator.addRule('objectIdList', (rule, value) => {
      try {
        var validationResult = validator.validate(
          {
            objectIdList: {
              type: 'array',
              itemType: 'objectId',
              min: rule.min || 1,
            },
          },
          { objectIdList: value }
        )
      } catch (error) {
        return error.message
      }

      if (validationResult) {
        return validationResult.map((item, index) => {
          item.field = `[${index}]`

          return item
        })
      }
    })

    console.log('Server did ready')
    global.app = this.app
  }
}

module.exports = AppBootHook
