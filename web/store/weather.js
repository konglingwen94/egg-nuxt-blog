import request from '@/services/request'
import axios from 'axios'
export const state = () => ({
  currentDay: {
    icon: 'fog',
    temp: '0',
    currentSummary: '',
    hourlySummary: '',
    windSpeed: 0,
  },
})

export const mutations = {
  setCurrentDay(state, payload) {
    Object.assign(state.currentDay, payload)
    state.currentDay.currentSummary+=` ( ${payload.city} )`
  },
}

export const actions = {
  fetchWeatherData({ commit }) {
    // console.log('data')
    
    return axios.get('https://www.mxnzp.com/api/ip/self').then(({data}) => {
      
        return request.get('/weather', {
          params: { city: data.city || '郑州'},
        })
      })

      .then(result => {
        commit('setCurrentDay', result)
      }).catch(err=>{
        console.error(err)
      })
  },
}
