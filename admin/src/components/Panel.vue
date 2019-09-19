<template>
  <div class>
    <div class="header">
      <slot name="header"></slot>
    </div>

    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Panel'
}
</script>

<style lang="less" scoped>
.header {
  margin-bottom: 20px;
}
</style>
