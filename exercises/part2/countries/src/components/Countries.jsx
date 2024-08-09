import { CountryItem } from "./CountryItem"
function Countries({ countries }) {
  return countries.map((country) => (
    <div key={country.name.common}>
      <CountryItem country={country} />
    </div>
  ))
}


export { Countries }