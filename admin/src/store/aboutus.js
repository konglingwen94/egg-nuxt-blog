import _ from 'lodash'
import AboutusApi from '@/api/aboutus'
// import Message from 'element-ui'
import vm from '@/main'

export default {
  state: {
    profile: {},
    platform: {},

    carousel: {},
  },
  mutations: {
    setAboutus(state, payload) {
      _.assign(state, payload)
    },
  },
  actions: {
    getAboutus({ commit }) {
      return AboutusApi.fetchOne()
        .then(result => {
          commit('setAboutus', result)
        })
        .catch(err => vm.$message.error(err.message))
    },
    updateAboutus({ commit, state }, payload, type) {
      const action = !state.id
        ? AboutusApi.createOne(payload)
        : AboutusApi.updateOne(state.id, payload)

      return action
        .then(result => {
          commit('setAboutus', result)
        })
        .catch(error => {
          vm.$message.error(error.message)
        })
    },
  },
}
