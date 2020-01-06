import Vue from 'vue'
import Vuex from 'vuex'
import aboutus from './aboutus'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    aboutus,
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
