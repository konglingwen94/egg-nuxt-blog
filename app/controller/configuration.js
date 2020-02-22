const _ = require('lodash')
const { Controller } = require('egg')

class ConfigurationController extends Controller {
  async queryOneConfiguration() {
    const { ctx } = this
    return ctx.model.Configuration.discriminators[ctx.state.configurationModelName].findOne()
  }
  async updateOneConfiguration() {
    const { ctx } = this
    return ctx.model.Configuration.discriminators[ctx.state.configurationModelName].updateOne(
      { _id: ctx.params.id },
      { $set: ctx.state.body }
    )
  }

  // async queryOneProjectIntro() {
  //   const { ctx } = this
  //   return ctx.model.Configuration.discriminators.Projectintro.findOne()
  // }

  // updateOneProjectIntro() {
    
  //   return this.ctx.model.Configuration.discriminators.Projectintro.updateOne(
  //     { _id: this.ctx.params.id },
  //     { $set:this. ctx.state.body }
  //   )
  // }

  
}

module.exports = ConfigurationController
