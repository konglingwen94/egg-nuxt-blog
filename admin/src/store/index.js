import Vue from 'vue'
import Vuex from 'vuex'
import configuration from './configuration'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    configuration,
  },
  state: {
    tabs: [],
  },
  getters: {
    activeTab(state) {
      return 'list'
    },
  },
  mutations: {
    setTabs(state, tabs) {
      state.tabs = tabs
    },
  },
})

export default store
