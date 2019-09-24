<template>
  <div class="about">{{state}}</div>
</template>
<script>
import AboutService from '@/services/abouts'
export default {
  name: 'About',
  layout: 'Public',
  async asyncData() {
    try {
      var state = await AboutService.fetchData()
    } catch (error) {
      return { state: {} }
    }
    return { state }
  },
  data() {
    return {}
  }
}
</script>
