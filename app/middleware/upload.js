const multer = require('koa-multer') //加载koa-multer模块

//文件上传
//配置

module.exports = opt => {
   
  var storage = multer.diskStorage({
    //文件保存路径
    destination: 'public/uploads',

    //修改文件名称
    filename: function(req, file, cb) {
      var fileFormat = file.originalname.split('.')
      cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
    },
  })
  //加载配置
  const upload = multer({ storage })
  return upload.single('file')
}
