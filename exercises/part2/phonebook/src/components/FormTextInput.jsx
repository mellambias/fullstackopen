function FormTextInput({ name, value, handleChange }) {
  return (
    <>
      <label>{name}</label>
      <input
        type='text'
        value={value}
        onChange={handleChange} />
    </>
  )
}
export { FormTextInput }