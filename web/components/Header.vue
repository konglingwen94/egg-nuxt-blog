<template>
  <div class="header">
    <div class="header-content">
      <!-- <div class="theme-mode-wrapper">
        <a href="javascript:;">theme-mode</a>
      </div>-->

      <el-menu router :default-active="$route.path" mode="horizontal">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/aboutus">关于</el-menu-item>
        <el-menu-item index="/archives">归档</el-menu-item>
        <el-menu-item index="/guestbooks">留言墙</el-menu-item>
      </el-menu>
    </div>
    <div class="weather-container">
      <vue-weather title :enableCredits="false" :forecast="[]" units="ca" :currentDay="currentDay"></vue-weather>
    </div>
  </div>
</template>
<script>
import request from '@/services/request'

export default {
  name: 'Header',
  async created() {
    if (process.server) {
      return
    }
    let coords

    const getCurrentPosition = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(result => {
        resolve(result.coords)
      })
    })

    getCurrentPosition.then(coords => {
      
      request.get('/location-city', {
        params: { lng: coords.longitude, lat: coords.latitude }
      })
    })

    const result = await request.get('/weather', {
      params: {
        city: '郑州'
      }
    })

    Object.assign(this.currentDay, result)
    return { result }
  },
  data() {
    return {
      currentDay: {
        icon: 'fog',
        temp: '0',
        currentSummary: '',
        hourlySummary: '',
        windSpeed: 0
      }
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  height: 160px;
  padding: 20px;
  padding-top: 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding-left: 200px;
}
.header-content {
  display: flex;
  .theme-mode-wrapper {
    width: 30%;
  }

  .el-menu-item {
    font-size: 18px;
  }
}
.weather-container {
  height: 200px;
  position: absolute;
  top: 20px;
  right: 100px;
  /deep/ #header {
    display: none;
  }
}
</style>

