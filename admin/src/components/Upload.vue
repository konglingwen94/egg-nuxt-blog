<template>
  <div>
    <el-upload
      ref="upload"
      action="/api/upload"
      list-type="picture"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      :on-remove="()=>$emit('remove')"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <el-button type="primary" size="small">点击上传</el-button>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: 'Upload',

  data() {
    return {
      // fileList: [],
      lastFile: {}
    }
  },
  methods: {
    handleUploadSuccess(response, file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }

      this.$emit('success', response)
    },
    handleUploadError(err) {
      this.$message.error(err.message)
    }
  }
}
</script>

