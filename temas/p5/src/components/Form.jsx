import { FormInput } from "./FormInput";
function Form({ onSubmit, inputs, buttonName }) {
  return (<form onSubmit={onSubmit}>
    {inputs.map((input) => (
      <div key={input.name}>
        {input.name}
        <FormInput data={input} />
      </div>
    ))}
    <button type="submit">{buttonName}</button>
  </form>)
}

export { Form };