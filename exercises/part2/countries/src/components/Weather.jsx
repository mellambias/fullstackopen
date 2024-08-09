
function Weather({ data, capital }) {
  if (!data) return null
  const { name, main, weather, wind } = data
  const { description, icon } = weather[0]
  return (
    <div>
      <h2>El Tiempo en {capital} {(name === capital) ? '' : `( ${name} )`}</h2>
      <p><strong>Temperatura:</strong> {main.temp} Celsius</p>
      <figure>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} />
        <figcaption>{description}</figcaption>
      </figure>
      <p><strong>Viento:</strong> {wind.speed} m/s</p>
    </div>
  )
}

export { Weather }