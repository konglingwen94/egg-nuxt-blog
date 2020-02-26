<template>
  <div>
    <el-upload
      ref="upload"
      action="/api/upload"
      list-type="picture"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      :on-remove="handleRemove"
      :file-list="fileList"
      
    >
      <el-button type="primary" size="small">点击上传</el-button>
    </el-upload>
  </div>
</template>
<script>
import request from '@/api/request'
export default {
  name: 'Upload',
props:{
  fileList:{
    type:Array
  }
},
  data() {
    return {
      // fileList: [],
      lastFile: {}
    }
  },
  methods: {
    handleUploadSuccess(response, file, fileList) {
      if (fileList.length > 1) {
        const unlinkFile=fileList.shift()
      request.delete(`${unlinkFile.response.path}`)
      }
// console.log(file)
      this.$emit('success', response)
    },
    handleUploadError(err) {
      this.$message.error(err.message)
    },
    handleRemove(file){
      
      request.delete(`${file.response.path}`)
      this.$emit('remove',file && file.response)
    }
  }
}
</script>

