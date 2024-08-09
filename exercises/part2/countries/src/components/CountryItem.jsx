
import { useState } from "react"
import { Countrie } from "./Countrie"

function CountryItem({ country }) {
  const [show, setShow] = useState(false)

  const styles = {
    container: {
      margin: "10px 15px",
      display: "flex",
      flexDirection: "row",
      width: "600px",
      height: "35px",
      justifyContent: "space-between",
      alignItems: "center",
    },
    button: {
      width: "20%",
      height: "25px",
      borderRadius: "5px",
      borderColor: show ? "red" : "green",
      color: show ? "red" : "black",

    },
    element: {
      width: "60%",
      height: "25px",
      fontSize: "18px",
      fontWeight: "bold",
    }
  }

  return (
    <>
      <div style={styles.container} >
        <div style={styles.element}>{country.name.common}</div>
        <button style={styles.button} type="button" onClick={() => setShow(!show)}>{show ? "hidden" : "show"}</button>
      </div >
      <div>{show && <Countrie country={country} />}</div>
    </>
  )
}
export { CountryItem }