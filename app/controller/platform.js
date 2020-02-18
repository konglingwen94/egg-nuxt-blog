const { Controller } = require('egg')

class PlatformController extends Controller {
  async updateOne() {
    const { ctx } = this
    const payload = ctx.state.body
    return ctx.model.Platform.findByIdAndUpdate(ctx.params.id, { $set: payload })
  }
  async queryOne(){
    return this.ctx.model.Platform.findById(ctx.params.id)
  }
}

module.exports=PlatformController
