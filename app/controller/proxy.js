const { Controller } = require('egg')
const axios = require('axios')
const _ = require('lodash')
// clear-day, clear-night, cloudy, fog, partly-cloudy-day, partly-cloudy-night, rain, sleet, snow, wind
const weatherInfo = {
  'clear-day': ['晴'],

  'partly-cloudy-day': ['阴'],
  fog: ['雾', '霾'],
  wind: ['沙尘暴', '浮尘', '扬沙', '强沙尘暴'],
  cloudy: ['多云'],
  rain: [
    '阵雨',
    '雷阵雨',
    '雷阵雨伴有冰雹',
    '小雨',
    '中雨',
    '大雨',
    '暴雨',
    '大暴雨',
    '特大暴雨',
    '冻雨',
    '小到中雨',
    '中到大雨',
    '大到暴雨',
    '暴雨到大暴雨',
    '大暴雨到特大暴雨',
  ],
  sleet: ['雨夹雪'],
  snow: [
    '阵雪',
    '小雪',
    '中雪',
    '大雪',
    '暴雪',
    '小到中雪',
    '中到大雪',
    '大到暴雪',
  ],
}

class ProxyController extends Controller {
  async fetchWeatherData() {
    const { ctx } = this
    const { data } = await axios.get(
      'http://apis.juhe.cn/simpleWeather/query',
      {
        params: { key: 'c424c5fda282298e52edd39b764cc768', ...ctx.query },
      }
    )

    const { error_code, result } = data

    if (error_code !== 0) {
      return { message: data.reason }
    }

    const icon = _.findKey(weatherInfo, value => {
      return value.includes(result.realtime.info)
    })
    const { temperature, aqi, power, info } = result.realtime
    const response = {
      temp: temperature,
      windSpeed: power,
      currentSummary: `${info} (实时)`,
      city: result.city,
      hourlySummary: aqi ? `空气质量指数: ${aqi}` : '',
      icon,
    }

     
    return response
  }
  async fetchLocationCity() {
    const { ctx } = this
    const { data } = await axios.get('http://apis.juhe.cn/geo', {
      params: {
        ...ctx.query,
        key: '22ad0021e0166b97299de3a575d399e6',
      },
    })
    const { error_code, result } = data

    if (error_code !== 0) {
      return { message: '查询失败' }
    }

    return result
  }
}

module.exports = ProxyController
