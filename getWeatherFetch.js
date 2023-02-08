const DEFAULT_ZONE = 'bucaramanga'
const API_KEY = 'zWtp6tnljgVxiimFXp7kB0TVV3VnbulN'
const BASE_URL_API = 'https://api.tomorrow.io/v4/weather/forecast'

// ?location=42.3478%2C%20-71.0466&fields=temperature&units=metric&timesteps=1d&startTime=now&endTime=nowPlus120h&timezone=America%2FBogota&apikey=zWtp6tnljgVxiimFXp7kB0TVV3VnbulN

// export async function fetchWeatherForZone (zone = DEFAULT_ZONE) {
//   return (
//     fetch('./forecast.json')
//       .then(response => response.json())
//       .then(data => data)
//   )
// }
export async function fetchWeatherForZone (zone = DEFAULT_ZONE) {
  return (
    fetch(`${BASE_URL_API}?location=${zone}&apikey=${API_KEY}`)
      .then(response => response.json())
      .then(data => data)
  )
}
