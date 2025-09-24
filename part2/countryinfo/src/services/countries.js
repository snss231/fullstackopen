import axios from 'axios'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api"

const getAllCountries = () => 
    axios
      .get(`${baseUrl}/all`)
      .then(response => response.data)

const getCountryByName = (name) =>
    axios
      .get(`${baseUrl}/name/${name}`)
      .then(response => response.data)

export default { getAllCountries, getCountryByName }