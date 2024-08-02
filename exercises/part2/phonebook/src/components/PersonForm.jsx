import { FormTextInput } from "./FormTextInput"


function PersonForm({
  onSubmit,
  formFields,
}) {
  return (
    <div>
      <form onSubmit={onSubmit}>
        {formFields.map((field) => (
          <div key={field.name}>
            <FormTextInput
              name={field.name}
              value={field.value}
              handleChange={field.handleChange}
            />
          </div>
        ))}

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export {
  PersonForm
}