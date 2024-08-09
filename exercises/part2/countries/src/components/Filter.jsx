function Filter({ filterCountry, onChange }) {

  const styles = {
    form: {
      marginBottom: '30px',
    },
    label: {
      marginRight: '10px',
      fontWeight: 'bold',
    },
    input: {
      padding: '5px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    }
  }
  return (
    <form styles={styles.form}>
      <label style={styles.label} htmlFor="country">Find countries</label>
      <input
        style={styles.input}
        id="country"
        type="text"
        value={filterCountry}
        onChange={onChange}
      />
    </form>
  )
}

export { Filter }