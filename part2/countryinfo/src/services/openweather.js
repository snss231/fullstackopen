import axios from 'axios'

const baseUrl = "https://api.openweathermap.org/data/2.5/weather"

const getWeather = (lat, lon) => 
    axios
      .get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
      .then(response => {
        console.log(response.data)
        return response.data
      })


export default { getWeather }