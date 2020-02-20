import _ from 'lodash'
import SiteintroApi from '@/api/siteintro'
  
 

export default {
  state: {
    profile: {},
    platform: {},

  },
  mutations: {
    setData(state, payload) {
      _.assign(state, payload)
    },
  },
  actions: {
    getOne({ commit }) {
      return SiteintroApi.fetchOne()
        .then(result => {
          commit('setData', result)
        })
        .catch( )
    },
    updateOne({ commit, state }, payload) {

      return SiteintroApi.updateOne(state.id, payload)
        .then(result => {
          commit('setData', result)
        })
        .catch(error => {
           
          return Promise.reject(error)
        })
    },
  },
}
