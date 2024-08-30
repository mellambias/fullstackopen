function FormInput({ data }) {
  const { name, value, onChange, placeholder } = data;
  return <input
    type="text"
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder} />
}
export { FormInput };