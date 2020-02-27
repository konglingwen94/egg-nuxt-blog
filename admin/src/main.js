import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store/index.js'

import 'normalize.css'
import '@/assets/css/overwrite.css'

import registerGlobalComponents from '@/utils/global-registration'
import registerElementUI from '@/utils/element-ui.js'

registerElementUI()
registerGlobalComponents(Vue)

Vue.config.productionTip = false
Vue.config.devtools = true

 

 
export default new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
