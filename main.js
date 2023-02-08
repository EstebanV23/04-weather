import './style.css'

import { fetchWeatherForZone } from './getWeatherFetch'
import { generateWeather, generateWeatherFutures } from './zoneDetails'
import { elementById, render } from './helpers'

const weatherMain = elementById('weatherMain')
const weathersFutures = elementById('weathersFutures')
const searchForm = elementById('searchForm')
const search = elementById('search')

const constructData = ({ timelines, location }, located) => {
  const time = timelines.minutely[0].time
  const daily = timelines.daily
  const { temperatureApparentMin, temperatureApparentMax } = daily[0].values
  const { temperature, humidity, windGust } = timelines.minutely[0].values
  const locationName = located ?? location.name.split(',')[0]
  const timeFormat = new Date(time)
  const hours = timeFormat.getHours()
  const minutes = timeFormat.getMinutes()

  return { hours, minutes, temperature, locationName, daily, temperatureApparentMin, temperatureApparentMax, humidity, windGust }
}

const getEnvironment = ({ cloudBaseAvg, rainIntensityAvg, snowIntensityAvg, windSpeedAvg }) => {
  if (rainIntensityAvg > 0.3) return 'rain'
  if (snowIntensityAvg > 0.2) return 'winter'
  if (cloudBaseAvg > 1) return 'clouds'
  if (windSpeedAvg > 1.4) return 'wind'
  return 'summer'
}

const constructDataFuture = (daily) => {
  const daysWeatherFutures = daily.map(item => {
    const { time, values } = item
    const environmentDay = getEnvironment(values)
    const timeFormat = new Date(time)
    const dateArr = timeFormat.toDateString().split(' ')
    const day = dateArr.splice(0, 1)
    const date = dateArr.join(' ')
    const temperatureExpected = values.temperatureApparentAvg
    return { date, temperatureExpected, day, environmentDay }
  })

  return daysWeatherFutures
}

const buildApp = async (zone) => {
  const weather = await fetchWeatherForZone(zone)
  const { hours, minutes, locationName, temperature, daily, temperatureApparentMin, temperatureApparentMax, humidity, windGust } = constructData(weather)
  const weatherRender = generateWeather(Math.round(temperature), hours, minutes, locationName, temperatureApparentMin, temperatureApparentMax, humidity, windGust)

  render(weatherMain, weatherRender)

  const daysWeatherFutures = constructDataFuture(daily)
  const daysRender = daysWeatherFutures.map(item => {
    const { temperatureExpected, date, day, environmentDay } = item
    return generateWeatherFutures(Math.round(temperatureExpected), date, day, environmentDay)
  }).join('')

  render(weathersFutures, daysRender)
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const zoneSelected = search.value
  buildApp(zoneSelected)
})

buildApp()
