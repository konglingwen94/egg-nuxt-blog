const { Controller } = require('egg')
module.exports = class UploadController extends Controller {
  async uploadFile() {
    const { ctx } = this
    const name = ctx.req.file.filename
    return {
      name,
      path: `/uploads/${name}`,
    }
  }
}
