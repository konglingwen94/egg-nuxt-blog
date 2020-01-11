import request from '@/services/request'

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
  },
}

export const actions = {
  fetchWeatherData({ commit }) {
    if (process.server) {
      return
    }
    let coords

    // const getCurrentPosition = new Promise((resolve, reject) => {
    //   navigator.geolocation.getCurrentPosition(result => {
    //     resolve(result.coords)
    //   })
    // })

    // getCurrentPosition.then(coords => {
    //   request.get('/location-city', {
    //     params: { lng: coords.longitude, lat: coords.latitude },
    //   })
    // })

    return request
      .get('/weather', {
        params: {
          city: '郑州',
        },
      })
      .then(result => {
        commit('setCurrentDay', result)
      })
  },
}
