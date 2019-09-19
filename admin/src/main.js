import Vue from 'vue'
import Element from 'element-ui'
import App from './App.vue'
import router from './router'

import 'normalize.css'
import '@/assets/css/overwrite.css'
import 'element-ui/lib/theme-chalk/index.css'
import registerGlobalComponents from '@/utils/global-registration'
import store from './store/index.js'

window.Vue = Vue

Vue.use(Element)
registerGlobalComponents(Vue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
