import { useState, useEffect } from "react"
import { Weather } from "./Weather"
import services from "../services"

function Countrie({ country }) {

  const [capitalWeather, setCapitalWeather] = useState(null)

  useEffect(() => {
    services
      .getGeoCoding(country.capital[0])
      .then(geo => {
        services
          .getWeather(geo.lat, geo.lon)
          .then(weather => {
            setCapitalWeather(weather)
          })
      })
      .catch(error => {
        console.error(error)
      })
  }, [country.capital[0]])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p><strong>Capital:</strong> {country.capital[0]}</p>
      <p><strong>Area:</strong> {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <figure style={{ width: "40%" }}>
        <img src={country.flags.png} alt={country.flags.alt} />
        <figcaption>{country.flags.alt}</figcaption>
      </figure>
      <div>
        <Weather data={capitalWeather} capital={country.capital[0]} />
      </div>
    </div >
  )
}

export { Countrie }

