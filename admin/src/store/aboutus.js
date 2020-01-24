import _ from 'lodash'
import AboutusApi from '@/api/aboutus'
  
 

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
        .catch( )
    },
    updateAboutus({ commit, state }, payload) {
      const action = !state.id
        ? AboutusApi.createOne(payload)
        : AboutusApi.updateOne(state.id, payload)

      return action
        .then(result => {
          commit('setAboutus', result)
        })
        .catch(error => {
           
          return Promise.reject(error)
        })
    },
  },
}
