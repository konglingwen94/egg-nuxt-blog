const path=require('path')
const fs=require('fs')
const { Controller } = require('egg')
module.exports = class UploadController extends Controller {

  async deleteFile(){
    const {ctx}=this
    const {baseDir,upload}=this.app.config
try {
  const result=fs.unlinkSync(path.resolve(baseDir,upload.dir,ctx.params.filename))
  
} catch (error) {
  throw error
}
    
    // console.log(result)
    return {ok:1,n:1}
  }
  async uploadFile() {
    const { ctx } = this
    if(!ctx.req.file){
      return {
        message:'Not file'
      }
    }
    const name = ctx.req.file.filename
    return {
      name,
      path: `/uploads/${name}`,
    }
  }
}
