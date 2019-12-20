const { Controller } = require('egg')

class UploadController extends Controller {
  async uploadFile() {
    const { ctx } = this
    const name = ctx.req.file.filename
    return {
      name,
      path: `/uploads/${name}`,
    }
  }
}

module.exports = UploadController
