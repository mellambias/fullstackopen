function Persons({ persons, filter, deletePerson }) {
  return (
    <div>
      {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => (
        <p key={person.id}>
          {person.name} {person.number}
          <button type="button" onClick={() => deletePerson(person.id)}>delete</button>
        </p>
      ))}
    </div>
  )
}

export { Persons }