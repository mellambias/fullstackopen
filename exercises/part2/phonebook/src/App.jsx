import { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import axios from 'axios'

const mockPhonebook = [
  { name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-44-5323523' },
  { name: 'Dan Abramov', number: '12-43-234345' },
  { name: 'Mary Poppendieck', number: '39-23-6423122' }
]

const SERVER = {
  HOST: 'localhost',
  PORT: 3002
}

const ENDPOINTS = {
  persons: `http://${SERVER.HOST}:${SERVER.PORT}/persons`
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setfilter] = useState('')

  useEffect(() => {
    axios
      .get(ENDPOINTS.persons)
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (newName === "") return
    const existPerson = persons.find((person) => person.name === newName)
    if (existPerson) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
      <Persons persons={persons} filter={filter} />
    </div>
  )
}
export default App
