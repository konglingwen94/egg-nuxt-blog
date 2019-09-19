<template>
  <div class>
    <el-popover :content="content" v-bind="attrs" v-on="$listeners">
      <div slot="reference" class="default-text">{{content}}</div>
    </el-popover>
  </div>
</template>
<script>
export default {
  name: 'CellPopover',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  computed: {
    attrs() {
      return {
        width: '400',
        placement: 'top-start',
        trigger: 'hover',
        ...this.$attrs
      }
    }
  }
}
</script>

<style lang="less" scoped>
.default-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
</style>

