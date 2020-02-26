// const _ = require('lodash')
const { Controller } = require('egg')
// const configurationRule = require('../types/request').configuration

class ConfigurationController extends Controller {
   
  async updateSiteConfig() {
    const { ctx } = this

    return ctx.model.Configuration.discriminators.Siteconfig.updateOne(
      { _id: ctx.params.id },
      { $set: ctx.state.body }
    )
  }
  async updateProjectIntro() {
    const { ctx } = this

    return ctx.model.Configuration.discriminators.Projectintro.updateOne(
      { _id: ctx.params.id },
      { $set: ctx.state.body }
    )
  }
  async updateProfile() {
    const { ctx } = this

    return ctx.model.Configuration.discriminators.Profile.updateOne(
      { _id: ctx.params.id },
      { $set: ctx.state.body }
    )
  }

  async queryConfigurations() {
    const { ctx } = this
    return ctx.model.Configuration.find()
  }
}

module.exports = ConfigurationController
