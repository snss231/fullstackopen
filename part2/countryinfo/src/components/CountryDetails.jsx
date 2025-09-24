const CountryDetails = ({country}) => (
    <>
    <h1>{country.name.common}</h1>
    <div>Capital {country.capital}</div>
    <div>Area {country.area}</div>
    <h2>Languages</h2>
    <ul>
        {Object.entries(country.languages).map(([k, v]) => <li key={k}>{v}</li>)}
    </ul>
    <img src={country.flags.png}></img>
    <h2>Weather in {country.capital}</h2>
    <div>Temperature {Math.round((country.weather.main.temp - 273.15) * 100) / 100} Celsius</div>
    <img src={`https://openweathermap.org/img/wn/${country.weather.weather[0].icon}@2x.png`} alt="" />
    <div>Wind {country.weather.wind.speed} m/s</div>
    </>
)
    

export default CountryDetails;