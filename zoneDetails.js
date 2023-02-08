import { elementById } from './helpers'

const body = elementById('body')
const classPerduring = body.className

const getEnviromentDay = (hours) => {
  const NIGHT = {
    start: 18,
    end: 6
  }
  const MORNING = {
    start: 6,
    end: 14
  }
  // RETURN 'afternoon' FOR AFTERNOON, 'night'FOR NIGHT AND 'morning' FOR MORNING
  if (hours >= NIGHT.start || hours < NIGHT.end) return 'night'
  if (hours >= MORNING.start && hours < MORNING.end) return 'morning'
  return 'afternoon'
}

export function generateWeather (temperature, hours, minutes, location, minTemperature,
  maxTemperature, humidity, windGust) {
  const enviroment = getEnviromentDay(hours)
  generateBackground(hours)
  return (`
  <div class="weather-card">
      <div class="weather-values">
        <p><span class="material-symbols-outlined">air</span> ${windGust}</p>
        <p><span class="material-symbols-outlined">humidity_low</span> ${humidity}</p>
      </div>
      <p class="weather-time">${hours} : ${minutes}</p>
      <p class="absolute-text">${minTemperature}° - ${maxTemperature}°</p>
      <h2 class="weather-temperature">${temperature}°</h2>
      <p class="weather-location">${location}</p>
      <img class="weather-svg" src="./img/${enviroment}.svg">
    </div>
  `)
}

export function generateWeatherFutures (temperature, date, day, enviromentDay = 'summer') {
  return (`
    <div class="weathers-futures">
     <img src="./img/${enviromentDay}.svg" class="futures-svg">
      <p class="futures-day">${day}</p>
      <p class="futures-date">${date}</p>
      <p class="futures-temperature">${temperature}°</p>
    </div>
  `)
}

function generateBackground (hours) {
  const enviroment = getEnviromentDay(hours)
  body.setAttribute('class', `${classPerduring} ${enviroment}-background`)
}
