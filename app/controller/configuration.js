const _ = require('lodash')
const { Controller } = require('egg')

class ConfigurationController extends Controller {
  queryOneSiteConfig() {
    const { ctx } = this
    console.log(__filename,ctx)
    return ctx.model.Configuration.discriminators.SiteConfig.findOne()
  }
  updateOneSiteConfig() {
    const { ctx } = this
    return ctx.state.targetModel.updateOne(
      { _id: ctx.params.id },
      { $set: ctx.state.body }
    )
  }

  queryOneProjectIntro() {
    const { ctx } = this
    return ctx.model.Configuration.discriminators.ProjectIntro.findOne()
  }

  updateOneProjectIntro() {
    
    return this.ctx.model.Configuration.discriminators.ProjectIntro.updateOne(
      { _id: this.ctx.params.id },
      { $set:this. ctx.state.body }
    )
  }

  
}

module.exports = ConfigurationController
