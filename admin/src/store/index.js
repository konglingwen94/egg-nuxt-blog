import Vue from 'vue'
import Vuex from 'vuex'
import configuration from './configuration'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    configuration,
  },
  state: {
    menuCollapsed: false,
  },
  getters: {
    
  },
  mutations: {
    reverseMenuCollapsed(state) {
      state.menuCollapsed = !state.menuCollapsed
    },
  },
})

export default store
