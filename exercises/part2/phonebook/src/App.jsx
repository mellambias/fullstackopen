import { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setfilter] = useState('')

  useEffect(() => {
    personServices
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (newName === "") return
    const existPerson = persons.find((person) => person.name === newName)
    if (existPerson && newNumber !== "") {
      if (window.confirm(`${existPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personServices
          .update(existPerson.id, { ...existPerson, number: newNumber })
          .then(personUpdated => {
            setPersons(persons.map(person => person.id !== existPerson.id ? person : personUpdated))
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      };
      personServices.create(personObject)
        .then((personCreated) => {
          setPersons(persons.concat(personCreated));
        });
    }
    setNewName("");
    setNewNumber("");
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (person && window.confirm(`Delete ${person.name} ?`)) {
      personServices
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }


  const handleFilter = (event) => {
    setfilter(event.target.value)
  }


  const formFields = [
    {
      name: "name",
      value: newName,
      handleChange: event => setNewName(event.target.value),
    },
    {
      name: "number",
      value: newNumber,
      handleChange: event => setNewNumber(event.target.value)
    }
  ]

  return (
    <div>
      <div>debug:{newName} number: {newNumber} filter: {filter}</div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addName}
        formFields={formFields}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        deletePerson={deletePerson}
      />
    </div>
  )
}
export default App
