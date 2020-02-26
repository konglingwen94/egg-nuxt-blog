const path=require('path')
const fs=require('fs')
const { Controller } = require('egg')
module.exports = class UploadController extends Controller {

  async deleteFile(){
    const {ctx}=this
    const {baseDir,upload}=this.app.config

    console.log(path.resolve(baseDir,upload.dir))
    console.log(this.app.config)
    require('fs').unlinkSync(path.resolve(baseDir,upload.dir,ctx.params.filename))
    return path.resolve(baseDir,upload.dir)
  }
  async uploadFile() {
    const { ctx } = this
    const name = ctx.req.file.filename
    return {
      name,
      path: `/uploads/${name}`,
    }
  }
}
