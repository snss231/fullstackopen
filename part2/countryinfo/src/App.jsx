import { useEffect, useState } from 'react'
import countryService from './services/countries'
import CountryDetails from './components/CountryDetails'

function App() {
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [allCountries, setAllCountries] = useState(null)
  const [matchedCountry, setMatchedCountry] = useState(null)

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
      countryService
        .getCountryByName(filtered[0])
        .then(country => setMatchedCountry(country));
    }
  }

  return (
    <>
      <div>
        find countries: <input onChange={handleFilter}></input>
        {
          !allCountries 
            ? <div>Loading...</div>
            : !filter.length
            ? <div></div>
            : filteredCountries.length > 10 
            ? <div>Too many matches, specify another filter</div>
            : filteredCountries.length != 1 
            ? filteredCountries.map(country => <div key={country}>{country}</div>)
            : !matchedCountry 
            ? <div>Loading details for {filteredCountries[0]}...</div>
            : <CountryDetails country={matchedCountry}></CountryDetails>
        }
      </div>
    </>
  )
}

export default App
