import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
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
