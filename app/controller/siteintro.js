const { Controller } = require('egg')

class SiteintroController extends Controller {
  queryOne() {
    

    return this.ctx.model.Platform.discriminators.Siteintro.findOne()
  }
  updateOne() {
    
    return this.ctx.model.Platform.discriminators.Siteintro.updateOne({
      _id: this.ctx.params.id,
      $set: this.ctx.request.body ,
    })
  }
}

module.exports = SiteintroController
