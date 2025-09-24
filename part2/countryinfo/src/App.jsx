import { useEffect, useState } from 'react'
import countryService from './services/countries'
import weatherService from './services/openweather'
import CountryDetails from './components/CountryDetails'

function App() {
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [allCountries, setAllCountries] = useState(null)
  const [matchedCountry, setMatchedCountry] = useState(null)
  const [matchedCountryName, setMatchedCountryName] = useState(null)

  useEffect(() => {
    countryService
      .getAllCountries()
      .then(countries => {
        setAllCountries(countries.map(e => e.name.common))
      })
  }, [])

  useEffect(() => {
    if (!allCountries) {
      return
    }
    setFilteredCountries(allCountries.filter(country => country.toLowerCase().includes(filter.toLowerCase())))
  }, [allCountries])

  const handleFilter = e => {
    const currFilter = e.target.value;
    setFilter(currFilter)
    if (!allCountries) {
      return
    }

    var filtered = allCountries.filter(country => country.toLowerCase().includes(currFilter.toLowerCase()))
    setFilteredCountries(filtered)
    if (filtered.length === 1) {
      setMatchedCountryName(filtered[0])
      countryService
        .getCountryByName(filtered[0])
        .then(country =>
          weatherService
          .getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
          .then(weather =>
            setMatchedCountry({
              ...country,
              weather: weather
            })
          )
          .catch(err => {
            console.log(err)
            setMatchedCountry(country)
          })
        )
    } else {
      setMatchedCountryName(null)
      setMatchedCountry(null)
    }
  }

  const handleShow = country => {
    setMatchedCountryName(country)
    countryService
      .getCountryByName(country)
      .then(country =>
        weatherService
        .getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
        .then(weather =>
          setMatchedCountry({
            ...country,
            weather: weather
          })
        )
        .catch(err => {
          console.log(err)
          setMatchedCountry(country)
        })
      )
  };

  return (
    <>
      <div>
        find countries: <input onChange={handleFilter}></input>
        {
          matchedCountryName
            ? (!matchedCountry 
              ? <div>Loading details for {matchedCountryName}...</div>
              : <CountryDetails country={matchedCountry}></CountryDetails>)
            : !allCountries 
            ? <div>Loading...</div>
            : !filter.length
            ? <div></div>
            : filteredCountries.length > 10 
            ? <div>Too many matches, specify another filter</div>
            :  filteredCountries.map(country => <div key={country}>{country} <button onClick={() => handleShow(country)}>Show</button></div>)
        }
      </div>
    </>
  )
}

export default App
