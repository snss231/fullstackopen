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
    </>
)
    

export default CountryDetails;