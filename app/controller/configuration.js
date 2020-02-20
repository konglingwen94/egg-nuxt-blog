const _ = require('lodash')
const { Controller } = require('egg')

class ConfigurationController extends Controller {
  queryOneSiteConfig() {
    const { ctx } = this

    return ctx.state.targetModel.findOne()
  }
  updateOneSiteConfig() {
    const { ctx } = this
    return ctx.state.targetModel.updateOne(
      { _id: ctx.params.id },
      { $set: ctx.state.body }
    )
  }

  queryOneProjectIntro(){

  }

  updateOneProjectIntro(){}
}

module.exports = ConfigurationController
