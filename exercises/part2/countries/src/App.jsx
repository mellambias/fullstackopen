import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { Countries } from './components/Countries'
import { Countrie } from './components/Countrie'
import { Filter } from './components/Filter'
import services from './services'


function App() {
  const [countries, setCountries] = useState(null)
  const [filterCountry, setFilterCountry] = useState("")

  useEffect(() => {
    services
      .getAllConuntries()
      .then(allCountries => {
        if (typeof allCountries === "string") {
          console.error(allCountries)
          return
        }
        setCountries(allCountries)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const handeChange = (event) => {
    setFilterCountry(event.target.value)
  }

  if (!countries) {
    return <div>Loading...</div>
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filterCountry.toLowerCase()))

  return (
    <>
      <Filter
        value={filterCountry}
        onChange={handeChange}
      />
      {
        (filterCountry.length === 0)
          ? null
          : (countriesToShow.length > 10)
            ? <div>({countriesToShow.length}) Too many matches, specify another filter</div>
            : (countriesToShow.length > 1)
              ? <Countries countries={countriesToShow} />
              : (countriesToShow.length === 1)
                ? <Countrie country={countriesToShow[0]} />
                : <div>There are no coincidences. Try name in English</div>
      }
    </>
  )
}

export default App
